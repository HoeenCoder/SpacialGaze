/**
 * Scavengers Plugin
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This is a game plugin to host scavenger games specifically in the Scavengers room,
 * where the players will race answer several hints.
 *
 * @license MIT license
 */

'use strict';

const fs = require('fs');

const DEFAULT_POINTS = [20, 15, 10, 5, 1];
const DEFAULT_BLITZ_POINTS = 10;

const path = require('path');
const DATA_FILE = path.resolve(__dirname, '../config/chat-plugins/scavdata.json');
const HOST_DATA_FILE = path.resolve(__dirname, '../config/chat-plugins/scavhostdata.json');
const PLAYER_DATA_FILE = path.resolve(__dirname, '../config/chat-plugins/scavplayerdata.json');

const SCAVENGE_REGEX = /^(?:\s)?(?:\/{2,}|\W)?(?:\s)?(?:s\W?cavenge|s\W?cav(?:engers)? guess|d\W?t|d\W?ata|d\W?etails|g\W?(?:uess)?|v)\b/i; // a regex of some of all the possible slips for leaks.
const FILTER_LENIENCY = 7;

const HISTORY_PERIOD = 6; // months

class Ladder {
	constructor(file) {
		this.file = file;
		this.data = {};

		this.load();
	}

	load() {
		fs.readFile(this.file, 'utf8', (err, content) => {
			if (err && err.code === 'ENOENT') return false; // file doesn't exist (yet)
			if (err) return console.log(`ERROR: Unable to load scavenger leaderboard: ${err}`);

			this.data = JSON.parse(content);
		});
	}

	addPoints(name, aspect, points, noUpdate) {
		let userid = toId(name);

		if (!userid || userid === 'constructor' || !points) return this;
		if (!this.data[userid]) this.data[userid] = {name: name};

		if (!this.data[userid][aspect]) this.data[userid][aspect] = 0;
		this.data[userid][aspect] += points;

		if (!noUpdate) this.data[userid].name = name; // always keep the last used name

		return this; // allow chaining
	}

	reset() {
		this.data = {};
		return this; // allow chaining
	}

	write() {
		fs.writeFile(this.file, JSON.stringify(this.data), err => {
			if (err) console.log(`ERROR: Failed to write scavengers ladder - ${err}`);
		});
	}

	visualize(sortBy, userid) {
		// return a promise for async sorting - make this less exploitable
		return new Promise((resolve, reject) => {
			let lowestScore = Infinity;
			let lastPlacement = 1;

			let ladder = Object.keys(this.data)
				.filter(k => sortBy in this.data[k])
				.sort((a, b) => this.data[b][sortBy] - this.data[a][sortBy])
				.map((u, i) => {
					u = this.data[u];
					if (u[sortBy] !== lowestScore) {
						lowestScore = u[sortBy];
						lastPlacement = i + 1;
					}
					return Object.assign(
						{rank: lastPlacement},
						u
					);
				}); // identify ties
			if (userid) {
				let rank = ladder.find(entry => toId(entry.name) === userid);
				resolve(rank);
			} else {
				resolve(ladder);
			}
		});
	}
}

class PlayerLadder extends Ladder {
	constructor(file) {
		super(file);
	}

	addPoints(name, aspect, points, noUpdate) {
		if (aspect.indexOf('cumulative-') !== 0) {
			this.addPoints(name, `cumulative-${aspect}`, points, noUpdate);
		}
		let userid = toId(name);

		if (!userid || userid === 'constructor' || !points) return this;
		if (!this.data[userid]) this.data[userid] = {name: name};

		if (!this.data[userid][aspect]) this.data[userid][aspect] = 0;
		this.data[userid][aspect] += points;

		if (!noUpdate) this.data[userid].name = name; // always keep the last used name

		return this; // allow chaining
	}

	// add the different keys to the history - async for larger leaderboards
	softReset() {
		return new Promise((resolve, reject) => {
			for (let u in this.data) {
				let userData = this.data[u];
				for (let a in userData) {
					if (/^(?:cumulative|history)\-/i.test(a) || a === 'name') continue; // cumulative does not need to be soft reset
					let historyKey = 'history-' + a;

					if (!userData[historyKey]) userData[historyKey] = [];

					userData[historyKey].unshift(userData[a]);
					userData[historyKey] = userData[historyKey].slice(0, HISTORY_PERIOD);

					userData[a] = 0; // set it back to 0
					// clean up if history is all 0's
					if (!userData[historyKey].some(p => p)) {
						delete userData[a];
						delete userData[historyKey];
					}
				}
			}
			resolve();
		});
	}

	hardReset() {
		this.data = {};
		return this; // allow chaining
	}
}

let Leaderboard = new Ladder(DATA_FILE);
let HostLeaderboard = new Ladder(HOST_DATA_FILE);
let PlayerLeaderboard = new PlayerLadder(PLAYER_DATA_FILE);

function formatQueue(queue, viewer) {
	let buf = queue.map((item, index) => `<tr${(viewer.userid !== item.hostId && viewer.userid !== item.staffHostId ? ` style="background-color: lightgray"` : "")}><td><button name="send" value="/scav dequeue ${index}" style="color: red; background-color: transparent; border: none; padding: 1px;">[x]</button>${Chat.escapeHTML(item.hostName)}${item.hostId !== item.staffHostId ? ` / ${item.staffHostId}` : ''}</td><td>${(item.hostId === viewer.userid || viewer.userid === item.staffHostId ? item.questions.map((q, i) => i % 2 ? `<span style="color: green"><em>[${Chat.escapeHTML(q)}]</em></span><br />` : Chat.escapeHTML(q)).join(" ") : `[${item.questions.length / 2} hidden questions]`)}</td></tr>`).join("");
	return `<div class="ladder"><table style="width: 100%"><tr><th>By</th><th>Questions</th></tr>${buf}</table></div>`;
}

function formatOrder(place) {
	// anything between 10 and 20 should always end with -th
	let remainder = place % 100;
	if (remainder >= 10 && remainder <= 20) return place + 'th';

	// follow standard rules with -st, -nd, -rd, and -th
	remainder = place % 10;
	if (remainder === 1) return place + 'st';
	if (remainder === 2) return place + 'nd';
	if (remainder === 3) return place + 'rd';
	return place + 'th';
}

class ScavengerHunt extends Rooms.RoomGame {
	constructor(room, staffHost, host, gameType, questions, parentGame) {
		super(room);

		this.allowRenames = true;
		this.gameType = gameType;
		this.playerCap = Infinity;

		this.hostId = host.userid;
		this.hostName = host.name;
		this.staffHostId = staffHost.userid;
		this.staffHostName = staffHost.name;

		this.gameid = 'scavengers';
		this.title = 'Scavengers';
		this.scavGame = true;

		this.state = 'signups';
		this.joinedIps = [];

		this.startTime = Date.now();
		this.questions = [];
		this.completed = [];

		this.parentGame = parentGame || null;

		this.onLoad(questions);
		if (gameType !== 'practice') HostLeaderboard.addPoints(host.name, 'points', 1).write();
	}

	// alert new users that are joining the room about the current hunt.
	onConnect(user, connection) {
		// send the fact that a hunt is currently going on.
		connection.sendTo(this.room, `|raw|<div class="broadcast-blue"><strong>${(this.gameType === 'official' ? "An official" : this.gameType === 'practice' ? "A practice" : "A")} Scavenger Hunt by <em>${Chat.escapeHTML(this.hostName)}</em> has been started${(this.hostId === this.staffHostId ? '' : ` by <em>${Chat.escapeHTML(this.staffHostName)}</em>`)}.<br />The first hint is: ${Chat.parseText(this.questions[0].hint)}</strong></div>`);
	}

	joinGame(user) {
		if (user.userid === this.hostId || user.userid === this.staffHostId) return user.sendTo(this.room, "You cannot join your own hunt! If you wish to view the check your questions, use /viewhunt instead!");
		if (Object.keys(user.ips).some(ip => this.joinedIps.includes(ip))) return user.sendTo(this.room, "You already have one alt in the hunt.");
		if (this.addPlayer(user)) {
			// limit to 1 IP in every game.
			for (let ip in user.ips) {
				this.joinedIps.push(ip);
			}

			user.sendTo("You joined the scavenger hunt! Use the command /scavenge to answer.");
			this.onSendQuestion(user);
			return true;
		}
		user.sendTo(this.room, "You have already joined the hunt.");
		return false;
	}

	leaveGame(user) {
		let player = this.players[user.userid];

		if (!player) return user.sendTo(this.room, "You have not joined the scavenger hunt.");
		if (player.completed) return user.sendTo(this.room, "You have already completed this scavenger hunt.");

		this.joinedIps = this.joinedIps.filter(ip => !player.joinIps.includes(ip));
		this.removePlayer(user);
		user.sendTo(this.room, "You have left the scavenger hunt.");
	}

	// overwrite the default makePlayer so it makes a ScavengerHuntPlayer instead.
	makePlayer(user) {
		return new ScavengerHuntPlayer(user, this);
	}

	onLoad(q) {
		for (let i = 0; i < q.length; i += 2) {
			let hint = q[i];
			let answer = q[i + 1];

			this.questions.push({hint: hint, answer: answer});
		}

		if (this.gameType === 'official') {
			this.setTimer(60);
		}

		this.announce(`A new ${(this.gameType === 'official' ? "official" : this.gameType === 'practice' ? "practice" : '')} Scavenger Hunt by <em>${Chat.escapeHTML(this.hostName)}</em> has been started${(this.hostId === this.staffHostId ? '' : ` by <em>${Chat.escapeHTML(this.staffHostName)}</em>`)}.<br />The first hint is: ${Chat.parseText(this.questions[0].hint)}`);
	}

	onEditQuestion(number, question_answer, ...value) {
		if (!['hint', 'answer'].includes(question_answer)) return false;

		value = question_answer === 'answer' ? toId(value.join(", ")) : value.join(", ");
		number = parseInt(number);

		if (!number || number < 1 || number > this.questions.length || !value) return false;

		number--; // indexOf starts at 0

		this.questions[number][question_answer] = value;
		this.announce(`The ${question_answer} for question ${number + 1} has been edited.`);
		if (question_answer === 'hint') {
			for (let p in this.players) {
				this.players[p].onNotifyChange(number);
			}
		}
		return true;
	}

	setTimer(minutes) {
		minutes = parseInt(minutes);

		if (this.timer) {
			clearTimeout(this.timer);
			delete this.timer;
		}

		if (minutes && minutes >= 1) {
			this.timer = setTimeout(() => this.onEnd(), minutes * 60000);
		}

		return minutes || 'off';
	}

	onSubmit(user, value) {
		if (!(user.userid in this.players)) {
			if (!this.parentGame && !this.joinGame(user)) return false;
			if (this.parentGame && !this.parentGame.joinGame(user)) return false;
		}
		value = toId(value);

		let player = this.players[user.userid];
		if (player.completed) return false;

		if (player.userid === this.hostId || player.userid === this.staffHostId) {
			// someone joining on an alt then going back to their original userid
			player.sendRoom("You have been automatically disqualified for doing your own hunt.");

			PlayerLeaderboard.addPoints(user.name, 'infraction', 1);

			// destroy them and get rid of their progress.
			this.eliminate(player.userid);
			return false;
		}

		let uniqueConnections = this.getUniqueConnections(user);
		if (uniqueConnections > 1) {
			// multiple users on one alt
			player.sendRoom("You have been automatically disqualified for attempting a hunt with multiple connections on your account.  Staff have been notified.");

			// notify staff
			let staffMsg = `(${user.name} has been caught attempting a hunt with ${uniqueConnections} connections on the account, and was automatically disqualified. The user has also been given 1 infraction point on the player leaderboard.)`;
			this.room.sendModCommand(staffMsg);
			this.room.logEntry(staffMsg);
			this.room.modlog(staffMsg);

			PlayerLeaderboard.addPoints(user.name, 'infraction', 1);

			// destroy them and get rid of their progress.
			this.eliminate(player.userid);
			return false;
		}

		if (player.verifyAnswer(value)) {
			player.sendRoom("Congratulations! You have gotten the correct answer.");
			player.currentQuestion++;
			if (player.currentQuestion === this.questions.length) {
				this.onComplete(player);
			} else {
				this.onSendQuestion(user);
			}
		} else {
			player.sendRoom("That is not the answer - try again!");
		}
	}

	onSendQuestion(user) {
		if (!(user.userid in this.players) || user.userid === this.hostId) return false;

		let player = this.players[user.userid];
		if (player.completed) return false;

		let current = player.getCurrentQuestion();

		player.sendRoom(`|raw|You are on ${(current.number === this.questions.length ? "final " : "")}hint #${current.number}: ${Chat.parseText(current.question.hint)}`);
		return true;
	}

	onComplete(player) {
		if (player.completed) return false;

		let now = Date.now();
		let time = Chat.toDurationString(now - this.startTime, {hhmmss: true});

		let blitz = this.gameType === 'official' && now - this.startTime <= 60000;

		player.completed = true;
		this.completed.push({name: player.name, time: time, blitz: blitz});
		let place = formatOrder(this.completed.length);

		this.announce(`<em>${Chat.escapeHTML(player.name)}</em> has finished the hunt in ${place} place! (${time}${(blitz ? " - BLITZ" : "")})`);
		if (this.parentGame) this.parentGame.onCompleteEvent(player);
		player.destroy(); // remove from user.games;
	}

	onEnd(reset, endedBy) {
		if (!endedBy && this.completed.length === 0) {
			reset = true;
		}
		if (!reset) {
			// give points for winning and blitzes in official games

			let winPoints = this.room.winPoints || DEFAULT_POINTS;
			let blitzPoints = this.room.blitzPoints || DEFAULT_BLITZ_POINTS;

			if (this.gameType === 'official') {
				for (let i = 0; i < this.completed.length; i++) {
					if (!this.completed[i].blitz && i >= winPoints.length) break; // there won't be any more need to keep going
					let name = this.completed[i].name;
					if (winPoints[i]) Leaderboard.addPoints(name, 'points', winPoints[i]);
					if (this.completed[i].blitz) Leaderboard.addPoints(name, 'points', blitzPoints);
				}
				Leaderboard.write();
			}

			let sliceIndex = this.gameType === 'official' ? 5 : 3;

			this.announce(
				`The ${this.gameType ? `${this.gameType} ` : ""}scavenger hunt was ended ${(endedBy ? "by " + Chat.escapeHTML(endedBy.name) : "automatically")}.<br />` +
				`${this.completed.slice(0, sliceIndex).map((p, i) => `${formatOrder(i + 1)} place: <em>${Chat.escapeHTML(p.name)}</em>.<br />`).join("")}${this.completed.length > sliceIndex ? `Consolation Prize: ${this.completed.slice(sliceIndex).map(e => Chat.escapeHTML(e.name)).join(', ')}<br />` : ''}<br />` +
				`<details style="cursor: pointer;"><summary>Solution: </summary><br />${this.questions.map((q, i) => `${i + 1}) ${Chat.escapeHTML(q.hint)} <span style="color: lightgreen">[<em>${Chat.escapeHTML(q.answer)}</em>]</span>`).join("<br />")}</details>`
			);

			if (this.parentGame) this.parentGame.onEndEvent();

			this.onTallyLeaderboard();

			this.tryRunQueue(this.room.id);
		} else if (endedBy) {
			this.announce(`The scavenger hunt has been reset by ${endedBy.name}.`);
		} else {
			this.announce("The hunt has been reset automatically, due to the lack of finishers.");
			this.tryRunQueue(this.room.id);
		}

		this.destroy();
	}

	onTallyLeaderboard() {
		// update player leaderboard with the statistics
		for (let p in this.players) {
			let player = this.players[p];
			PlayerLeaderboard.addPoints(player.name, 'join', 1);
		}
		for (let i = 0; i < this.completed.length; i++) {
			PlayerLeaderboard.addPoints(this.completed[i].name, 'finish', 1);
		}

		PlayerLeaderboard.write();
	}

	tryRunQueue(roomid) {
		if (this.parentGame) return; // don't run the queue for child games.
		// prepare the next queue'd game
		if (this.room.scavQueue && this.room.scavQueue.length) {
			setTimeout(() => {
				let room = Rooms(roomid);
				if (!room || room.game || !room.scavQueue.length) return;

				let next = room.scavQueue.shift();
				room.game = new ScavengerHunt(room, {userid: next.staffHostId, name: next.staffHostName}, {name: next.hostName, userid: next.hostId}, false, next.questions);
				room.game.setTimer(120); // auto timer of 2 hours for queue'd games.

				room.add(`|c|~|[ScavengerManager] A scavenger hunt by ${next.hostName} has been automatically started. It will automatically end in 2 hours.`).update(); // highlight the users with "hunt by"

				// update the saved queue.
				if (room.chatRoomData) {
					room.chatRoomData.scavQueue = room.scavQueue;
					Rooms.global.writeChatRoomData();
				}
			}, 1.5 * 60000); // 1.5 minute cooldown
		}
	}

	// modify destroy to get rid of any timers in the current roomgame.
	destroy() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
		for (let i in this.players) {
			this.players[i].destroy();
		}
		// destroy this game
		if (this.parentGame) {
			this.parentGame.onDestroyEvent();
		} else {
			delete this.room.game;
			this.room = null;
		}
	}

	announce(msg) {
		this.room.add(`|raw|<div class="broadcast-blue"><strong>${msg}</strong></div>`).update();
	}

	eliminate(userid) {
		if (!(userid in this.players)) return false;
		let player = this.players[userid];

		player.destroy();
		delete this.players[userid];
	}

	onUpdateConnection() {}

	onChatMessage(msg) {
		let msgId = toId(msg);

		let commandMatch = msg.match(SCAVENGE_REGEX);
		if (commandMatch) msgId = msgId.slice(toId(commandMatch[0]).length);

		let filtered = this.questions.map(q => toId(q.answer)).some(a => {
			let md = Math.ceil((a.length - 3) / FILTER_LENIENCY);
			if (Dex.levenshtein(msgId, a, md) <= md) return true;
			return false;
		});

		if (filtered) return "Please do not leak the answer. Use /scavenge [guess] to submit your guess instead.";
	}

	hasFinished(user) {
		return this.players[user.userid] && this.players[user.userid].completed;
	}

	getUniqueConnections(user) {
		let ips = user.connections.map(c => c.ip);
		return ips.filter((ip, index) => ips.indexOf(ip) === index).length;
	}

	static parseQuestions(questionArray) {
		if (questionArray.length % 2 === 1) return {err: "Your final question is missing an answer"};
		if (questionArray.length < 6) return {err: "You must have at least 3 hints and answers"};
		for (let i = 0; i < questionArray.length; i++) {
			if (i % 2) {
				questionArray[i] = questionArray[i].trim();
				if (!toId(questionArray[i])) return {err: "Empty answer - only alphanumeric characters will count in answers."};
			} else {
				questionArray[i] = questionArray[i].trim();
				if (!questionArray[i]) return {err: "Empty question."};
			}
		}

		return {result: questionArray};
	}
}

class ScavengerHuntPlayer extends Rooms.RoomGamePlayer {
	constructor(user, game) {
		super(user, game);

		this.joinIps = Object.keys(user.ips);

		this.currentQuestion = 0;
		this.completed = false;
	}

	getCurrentQuestion() {
		return {
			question: this.game.questions[this.currentQuestion],
			number: this.currentQuestion + 1,
		};
	}

	verifyAnswer(value) {
		let answer = this.getCurrentQuestion().question.answer;
		return toId(value) === toId(answer);
	}

	onNotifyChange(num) {
		if (num === this.currentQuestion) {
			this.sendRoom(`|raw|<strong>The hint has been changed to:</strong> ${Chat.parseText(this.game.questions[num].hint)}`);
		}
	}

	destroy() {
		let user = Users.getExact(this.userid);
		if (user && !this.game.parentGame) {
			user.games.delete(this.game.id);
			user.updateSearch();
		}
	}
}

let commands = {
	/**
	 * Player commands
	 */
	"": function () {
		this.parse("/join scavengers");
	},

	guess: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply("There is no scavenger game currently running.");
		if (!this.canTalk()) return this.errorReply("You cannot participate in the scavenger hunt when you are unable to talk.");

		room.game.onSubmit(user, target);
	},

	join: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply("There is no scavenger game currently running.");
		if (!this.canTalk()) return this.errorReply("You cannot join the scavenger hunt when you are unable to talk.");

		room.game.joinGame(user);
	},

	leave: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply("There is no scavenger game currently running.");
		room.game.leaveGame(user);
	},

	/**
	 * Scavenger Games
	 */

	games: {
		/**
		 * Individual game commands for each Scavenger Game
		 */
		knockoutgames: 'kogames',
		kogames: {
			'': 'new',
			'create': 'new',
			new: function (target, room, user) {
				if (room.id !== 'scavengers') return this.errorReply("Scavenger hunts can only be created in the scavengers room.");
				if (!this.can('mute', null, room)) return false;
				if (room.game) return this.errorReply(`There is already a game in this room - ${room.game.title}.`);

				const KOGame = require("./scavenger-games").KOGame;
				room.game = new KOGame(room);
				room.game.announce("A new Knockout Games has been started!");
			},
		},

		/**
		 * General
		 */
		end: function (target, room, user) {
			if (!this.can('mute', null, room)) return false;
			if (!room.game || !room.game.scavParentGame) return this.errorReply(`There is no scavenger game currently running.`);

			this.privateModCommand(`The ${room.game.title} has been forcibly ended by ${user.name}.`);
			room.game.announce(`The ${room.game.title} has been forcibly ended.`);
			room.game.destroy();
		},

		kick: function (target, room, user) {
			if (!this.can('mute', null, room)) return false;
			if (!room.game || !room.game.scavParentGame) return this.errorReply(`There is no scavenger game currently running.`);

			let targetId = toId(target);
			if (targetId === 'constructor') return false;

			let success = room.game.eliminate(targetId);
			if (success) {
				this.addModCommand(`User '${targetId}' has been kicked from the ${room.game.title}.`);
			} else {
				this.errorReply(`Unable to kick user '${targetId}'.`);
			}
		},
	},

	/**
	 * Creation / Moderation commands
	 */
	createpractice: 'create',
	createofficial: 'create',
	create: function (target, room, user, connection, cmd) {
		if (room.id !== 'scavengers') return this.errorReply("Scavenger hunts can only be created in the scavengers room.");
		if (!this.can('mute', null, room)) return false;
		if (room.game && !room.game.scavParentGame) return this.errorReply(`There is already a game in this room - ${room.game.title}.`);

		let [hostId, ...params] = target.split(target.includes('|') ? '|' : ',');

		let host = Users.getExact(hostId);
		if (!host || !host.connected || !(host.userid in room.users)) return this.errorReply("The user you specified as the host is not online, or is not in the room.");

		params = ScavengerHunt.parseQuestions(params);
		if (params.err) return this.errorReply(params.err);

		let gameType = cmd.includes('official') ? 'official' : cmd.includes('practice') ? 'practice' : null;

		if (room.game && room.game.scavParentGame) {
			let success = room.game.createHunt(room, user, host, gameType, params.result);
			if (!success) return;
		} else {
			room.game = new ScavengerHunt(room, user, host, gameType, params.result);
		}
		this.privateModCommand(`(A new scavenger hunt was created by ${user.name}.)`);
	},

	status: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);
		let elapsed = Date.now() - room.game.startTime;

		this.sendReplyBox(`The current ${room.game.gameType ? `<em>${room.game.gameType}</em> ` : ""}scavenger hunt has been up for: ${Chat.toDurationString(elapsed, {hhmmss: true})}<br />Completed (${room.game.completed.length}): ${room.game.completed.map(u => Chat.escapeHTML(u.name)).join(', ')}`);
	},

	hint: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);
		if (!room.game.onSendQuestion(user)) this.errorReply("You are not currently participating in the hunt.");
	},

	timer: function (target, room, user) {
		if (!this.can('mute', null, room)) return false;
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);

		let result = room.game.setTimer(target);
		let message = `The scavenger timer has been ${(result === 'off' ? "turned off" : `set to ${result} minutes`)}`;

		room.add(message + '.');
		this.privateModCommand(`(${message} by ${user.name}.)`);
	},

	reset: function (target, room, user) {
		if (!this.can('mute', null, room)) return false;
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);

		if (room.game.gameType !== 'practice') HostLeaderboard.addPoints(room.game.hostName, -1); // only deduct for non practice games.
		room.game.onEnd(true, user);
		this.privateModCommand(`(${user.name} has reset the scavenger hunt.)`);
	},

	end: function (target, room, user) {
		if (!this.can('mute', null, room)) return false;
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);
		room.game.onEnd(null, user);
		this.privateModCommand(`(${user.name} has ended the scavenger hunt.)`);
	},

	viewhunt: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);
		if (room.game.hostId !== user.userid && room.game.staffHostId !== user.userid && !room.game.hasFinished(user)) return this.errorReply("You cannot view the hints and answers if you are not the host, or if you have not finished the hunt yet.");

		this.sendReply(`|raw|<div class="ladder"><table style="width: 100%"><tr><th>Hint</th><th>Answer</th></tr>${room.game.questions.map(q => `<tr><td>${Chat.parseText(q.hint)}</td><td>${Chat.escapeHTML(q.answer)}</td></tr>`).join("")}</table><div>`);
	},

	edithunt: function (target, room, user) {
		if (!room.game || !room.game.scavGame) return this.errorReply(`There is no scavenger game currently running.`);
		if ((room.game.hostId !== user.userid || !user.can('broadcast', null, room)) && room.game.staffHostId !== user.userid) return this.errorReply("You cannot edit the hints and answers if you are not the host.");

		if (!room.game.onEditQuestion(...target.split(',').map(p => p.trim()))) return this.sendReply("/scavengers edithunt [question number], [hint | answer], [value] - edits the current scavenger hunt.");
	},
	/**
	 * Hunt queuing
	 */
	queue: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!target) return this.parse("/scavengers viewqueue");

		if (!this.can('mute', null, room)) return false;

		let [hostId, ...params] = target.split(target.includes('|') ? '|' : ',');

		let host = Users.getExact(hostId);

		if (!host || !host.connected || !(host.userid in room.users)) return this.errorReply("The user you specified as the host is not online, or is not in the room.");

		params = ScavengerHunt.parseQuestions(params);
		if (params.err) return this.errorReply(params.err);

		if (!room.scavQueue) room.scavQueue = [];

		room.scavQueue.push({hostName: host.name, hostId: host.userid, questions: params.result, staffHostId: user.userid, staffHostName: user.name});
		this.privateModCommand(`(${user.name} has added a scavenger hunt to the queue.)`);

		if (room.chatRoomData) {
			room.chatRoomData.scavQueue = room.scavQueue;
			Rooms.global.writeChatRoomData();
		}
	},

	dequeue: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;
		let id = parseInt(target);

		if (!room.scavQueue || isNaN(id) || id < 0 || id >= room.scavQueue.length) return false; // this command should be using the display to manage anyways.

		let removed = room.scavQueue.splice(id, 1)[0];
		this.privateModCommand(`(${user.name} has removed a scavenger hunt by ${removed.hostName} from the queue.)`);
		this.sendReply(`|uhtmlchange|scav-queue|${formatQueue(room.scavQueue, user)}`);

		if (room.chatRoomData) {
			room.chatRoomData.scavQueue = room.scavQueue;
			Rooms.global.writeChatRoomData();
		}
	},

	viewqueue: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;

		if (!room.scavQueue || !room.scavQueue.length) return this.sendReplyBox("The scavenger hunt queue is currently empty.");

		this.sendReply(`|uhtml|scav-queue|${formatQueue(room.scavQueue, user)}`);
	},

	/**
	 * Leaderboard Commands
	 */
	addpoints: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;

		let [targetId, points] = target.split(',');
		targetId = toId(targetId);
		points = parseInt(points);

		if (!targetId || targetId === 'constructor' || targetId.length > 18) return this.errorReply("Invalid username.");
		if (!points || points < 0) return this.errorReply("Points must be an integer greater than 0.");

		Leaderboard.addPoints(targetId, 'points', points, true).write();

		this.privateModCommand(`(${targetId} was given ${points} points on the monthly scavengers ladder by ${user.name}.)`);
	},

	removepoints: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;

		let [targetId, points] = target.split(',');
		targetId = toId(targetId);
		points = parseInt(points);

		if (!targetId || targetId === 'constructor' || targetId.length > 18) return this.errorReply("Invalid username.");
		if (!points || points < 0) return this.errorReply("Points must be an integer greater than 0.");

		Leaderboard.addPoints(targetId, 'points', -points, true).write();

		this.privateModCommand(`(${user.name} has taken ${points} points from ${targetId} on the monthly scavengers ladder.)`);
	},

	resetladder: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('declare', null, room)) return false;

		Leaderboard.reset().write();

		this.privateModCommand(`(${user.name} has reset the monthly scavengers ladder.)`);
	},

	ladder: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.runBroadcast()) return false;

		Leaderboard.visualize('points').then(ladder => {
			this.sendReply(`|raw|<div class="ladder" style="overflow-y: scroll; max-height: 300px;"><table style="width: 100%"><tr><th>Rank</th><th>Name</th><th>Points</th></tr>${ladder.map(entry => {
				let isStaff = room.auth && room.auth[toId(entry.name)];

				return `<tr><td>${entry.rank}</td><td>${(isStaff ? `<em>${Chat.escapeHTML(entry.name)}</em>` : (entry.rank <= 5 ? `<strong>${Chat.escapeHTML(entry.name)}</strong>` : Chat.escapeHTML(entry.name)))}</td><td>${entry.points}</td></tr>`;
			}).join('')}</table></div>`);
			if (this.broadcasting) setImmediate(() => room.update()); // make sure the room updates for broadcasting since this is async.
		});
	},

	rank: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.runBroadcast()) return false;

		let targetId = toId(target) || user.userid;

		Leaderboard.visualize('points', targetId).then(rank => {
			if (!rank) return this.sendReplyBox(`User '${targetId}' does not have any points on the scavengers leaderboard.`);

			this.sendReplyBox(`User '${Chat.escapeHTML(rank.name)}' is #${rank.rank} on the scavengers leaderboard with ${rank.points} points.`);
			if (this.broadcasting) setImmediate(() => room.update()); // make sure the room updates for broadcasting since this is async.
		});
	},

	/**
	 * Leaderboard Point Distribution Editing
	 */
	setblitz: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false; // perms for viewing only
		if (!target) return this.sendReply(`The points rewarded for winning official hunts is: ${(room.blitzPoints || DEFAULT_BLITZ_POINTS)}`);

		if (!this.can('declare', null, room)) return false; // perms for editing

		let blitzPoints = parseInt(target);
		if (isNaN(blitzPoints) || blitzPoints < 0) return this.errorReply("The points value awarded for blitz must be an integer greater than or equal to zero.");

		room.blitzPoints = blitzPoints;

		if (room.chatRoomData) {
			room.chatRoomData.blitzPoints = room.blitzPoints;
			Rooms.global.writeChatRoomData();
		}
		this.privateModCommand(`(${user.name} has set the points awarded for blitz to ${blitzPoints}.)`);
	},

	setpoints: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false; // perms for viewing only
		if (!target) return this.sendReply(`The points rewarded for winning official hunts is: ${(room.winPoints || DEFAULT_POINTS).map((p, i) => `(${(i + 1)}) ${p}`).join(', ')}`);

		if (!this.can('declare', null, room)) return false; // perms for editting

		let winPoints = target.split(',').map(p => parseInt(p));

		if (winPoints.some(p => isNaN(p) || p < 0) || !winPoints.length) return this.errorReply("The points value awarded for winning a scavenger hunt must be an integer greater than or equal to zero.");

		room.winPoints = winPoints;

		if (room.chatRoomData) {
			room.chatRoomData.winPoints = room.winPoints;
			Rooms.global.writeChatRoomData();
		}
		this.privateModCommand(`(${user.name} has set the points awarded for winning an official scavenger hunt to - ${winPoints.map((p, i) => `(${(i + 1)}) ${p}`).join(', ')})`);
	},

	/**
	 * Scavenger statistic tracking
	 */
	huntcount: 'huntlogs',
	huntlogs: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;

		if (target === 'RESET') {
			if (!this.can('declare', null, room)) return false;
			HostLeaderboard.reset().write();
			this.privateModCommand(`(${user.name} has reset the host log leaderbaord.)`);

			return;
		}

		HostLeaderboard.visualize('points').then(ladder => {
			this.sendReply(`|raw|<div class="ladder" style="overflow-y: scroll; max-height: 300px;"><table style="width: 100%"><tr><th>Rank</th><th>Name</th><th>Points</th></tr>${ladder.map(entry => {
				let userid = toId(entry.name);

				let auth = room.auth && room.auth[userid] ? room.auth[userid] : Users.usergroups[userid] ? Users.usergroups[userid].charAt(0) : '&nbsp;';
				let color = room.auth && userid in room.auth ? 'inherit' : 'gray';

				return `<tr><td>${entry.rank}</td><td><span style="color: ${color}">${auth}</span>${Chat.escapeHTML(entry.name)}</td><td>${entry.points}</td></tr>`;
			}).join('')}</table></div>`);
		});
	},

	playlogs: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;

		if (target === 'RESET') {
			if (!this.can('declare', null, room)) return false;
			PlayerLeaderboard.softReset().then(() => {
				PlayerLeaderboard.write();
				this.privateModCommand(`(${user.name} has reset the player log leaderbaord into the next month.)`);
			});
			return;
		} else if (target === 'HARD RESET') {
			if (!this.can('declare', null, room)) return false;
			PlayerLeaderboard.hardReset().write();
			this.privateModCommand(`(${user.name} has hard reset the player log leaderboard.)`);
			return;
		}

		let [sortMethod, isUhtmlChange] = target.split(',');

		const sortingFields = ['join', 'cumulative-join', 'finish', 'cumulative-finish', 'infraction', 'cumulative-infraction'];

		if (!sortingFields.includes(sortMethod)) sortMethod = 'finish'; // default sort method

		PlayerLeaderboard.visualize(sortMethod).then(raw => {
			new Promise((resolve, reject) => {
				// apply ratio
				raw = raw.map(d => {
					d.ratio = (((d.finish || 0) / (d.join || 1)) * 100).toFixed(2); // always have at least one for join to get a value of 0 if both are 0 or non-existent
					d['cumulative-ratio'] = (((d['cumulative-finish'] || 0) / (d['cumulative-join'] || 1)) * 100).toFixed(2);
					return d;
				});
				resolve(raw);
			}).then(data => {
				this.sendReply(`|${isUhtmlChange ? 'uhtmlchange' : 'uhtml'}|scav-playlogs|<div class="ladder" style="overflow-y: scroll; max-height: 300px;"><table style="width: 100%"><tr><th>Rank</th><th>Name</th><th>Finished Hunts</th><th>Joined Hunts</th><th>Ratio</th><th>Infractions</th></tr>${
					data.map(entry => {
						let userid = toId(entry.name);

						let auth = room.auth && room.auth[userid] ? room.auth[userid] : Users.usergroups[userid] ? Users.usergroups[userid].charAt(0) : '&nbsp;';
						let color = room.auth && userid in room.auth ? 'inherit' : 'gray';

						return `<tr><td>${entry.rank}</td><td><span style="color: ${color}">${auth}</span>${Chat.escapeHTML(entry.name)}</td>` +
							`<td style="text-align: right;">${(entry.finish || 0)} <span style="color: blue">(${(entry['cumulative-finish'] || 0)})</span>${(entry['history-finish'] ? `<br /><span style="color: gray">(History: ${entry['history-finish'].join(', ')})</span>` : '')}</td>` +
							`<td style="text-align: right;">${(entry.join || 0)} <span style="color: blue">(${(entry['cumulative-join'] || 0)})</span>${(entry['history-join'] ? `<br /><span style="color: gray">(History: ${entry['history-join'].join(', ')})</span>` : '')}</td>` +
							`<td style="text-align: right;">${entry.ratio}%<br /><span style="color: blue">(${(entry['cumulative-ratio'] || "0.00")}%)</span></td>` +
							`<td style="text-align: right;">${(entry.infraction || 0)} <span style="color: blue">(${(entry['cumulative-infraction'] || 0)})</span>${(entry['history-infraction'] ? `<br /><span style="color: gray">(History: ${entry['history-infraction'].join(', ')})</span>` : '')}</td>` +
							`</tr>`;
					}).join('')
				}</table></div><div style="text-align: center">${sortingFields.map(f => `<button class="button${f === sortMethod ? ' disabled' : ''}" name="send" value="/scav playlogs ${f}, 1">${f}</button>`).join(' ')}</div>`);
			});
		});
	},

	uninfract: "infract",
	infract: function (target, room, user) {
		if (room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.can('mute', null, room)) return false;

		let targetId = toId(target);
		let change = this.cmd === 'infract' ? 1 : -1;

		PlayerLeaderboard.addPoints(targetId, 'infraction', change, true).write();

		this.privateModCommand(`(${user.name} has ${(change > 0 ? 'given' : 'taken')} one infraction point ${(change > 0 ? 'to' : 'from')} '${targetId}'.)`);
	},
};

exports.commands = {
	// general
	scav: 'scavengers',
	scavengers: commands,

	// old game aliases
	scavenge: commands.guess,
	startpracticehunt: 'starthunt',
	startofficialhunt: 'starthunt',
	starthunt: commands.create,
	joinhunt: commands.join,
	leavehunt: commands.leave,
	resethunt: commands.reset,
	endhunt: commands.end,
	edithunt: commands.edithunt,
	viewhunt: commands.viewhunt,
	scavengerstatus: commands.status,
	scavengerhint: commands.hint,

	// point aliases
	scavaddpoints: 'scavengeraddpoints',
	scavengersaddpoints: commands.addpoints,

	scavrmpoints: 'scavengersremovepoints',
	scavengersrmpoints: 'scavengersremovepoints',
	scavremovepoints: 'scavengersremovepoints',
	scavengersremovepoints: commands.addpoints,

	scavresetlb: 'scavengersresetlb',
	scavengersresetlb: commands.resetladder,

	scavrank: commands.rank,
	scavladder: 'scavtop',
	scavtop: commands.ladder,
	scavengerhelp: 'scavengershelp',
	scavengershelp: function (target, room, user) {
		if (!room || room.id !== 'scavengers') return this.errorReply("This command can only be used in the scavengers room.");
		if (!this.runBroadcast()) return false;

		let userCommands = [
			"<strong>Player commands:</strong>",
			"- /scavengers - joins the scavengers room.",
			"- /joinhunt - joins the current scavenger hunt.",
			"- /leavehunt - leaves the current scavenger hunt.",
			"- /scavenge <em>[guess]</em> - submits your answer to the current hint.",
			"- /scavengerstatus - checks your status in the current game.",
			"- /scavengerhint - views your latest hint in the current game.",
			"- /scavladder - views the monthly scavenger leaderboard.",
			"- /scavrank <em>[user]</em> - views the rank of the user on the monthly scavenger leaderboard.  Defaults to the user if no name is provided.",
		].join("<br />");
		let staffCommands = [
			"<strong>Staff commands:</strong>",
			"- /starthunt <em>[host] | [hint] | [answer] | [hint] | [answer] | [hint] | [answer] | ...</em> - creates a new scavenger hunt. (Requires: % @ * # & ~)",
			"- /startofficialhunt <em>[host] | [hint] | [answer] | [hint] | [answer] | [hint] | [answer] | ...</em> - creates a new official scavenger hunt with a 60 second blitz period.  Blitz and wins from official hunts will count towards the leaderboard. (Requires: % @ * # & ~)",
			"- /edithunt <em>[question number], [hint | answer], [value]</em> - edits the current scavenger hunt. Only the host(s) can edit the hunt.",
			"- /resethunt - resets the current scavenger hunt without revealing the hints and answers. (Requires: % @ * # & ~)",
			"- /endhunt - ends the current scavenger hunt and announces the winners and the answers. (Requires: % @ * # & ~)",
			"- /viewhunt - views the current scavenger hunt.  Only the user who started the hunt can use this command. Only the host(s) can view the hunt.",
			"- /scav timer <em>[minutes | off]</em> - sets a timer to automatically end the current hunt. (Requires: % @ * # & ~)",
			"- /scav addpoints <em>[user], [amount]</em> - gives the user the amount of scavenger points towards the monthly ladder. (Requires: % @ * # & ~)",
			"- /scav removepoints <em>[user], [amount]</em> - takes the amount of scavenger points from the user towards the monthly ladder. (Requires: % @ * # & ~)",
			"- /scav resetladder - resets the monthly scavenger leaderboard. (Requires: # & ~)",
			"- /scav setpoints [1st place], [2nd place], [3rd place], [4th place], [5th place], ... - sets the point values for the wins. Use `/scav setpoints` to view what the current point values are. (Requires: # & ~)",
			"- /scav setblitz [value] ... - sets the blitz award to `value`. Use `/scav setblitz` to view what the current blitz value is. (Requires: # & ~)",
			"- /scav queue <em>[host] | [hint] | [answer] | [hint] | [answer] | [hint] | [answer] | ...</em> - queues a scavenger hunt to be started after the current hunt is finished. (Requires: % @ * # & ~)",
			"- /scav viewqueue - shows the list of queued scavenger hunts to be automatically started, as well as the option to remove hunts from the queue. (Requires: % @ * # & ~)",
			"- /scav games kogames - starts a new scripted Knockout Game. (Requires: % @ * # & ~)",
			"- /scav games end - ends the current scavenger game. (Requires: % @ * # & ~)",
			"- /scav games kick [user] - kicks the user from the current scavenger game. (Requires: % @ * # & ~)",
		].join("<br />");

		target = toId(target);
		let display = target === 'all' ? `${userCommands}<br /><br />${staffCommands}` : target === 'staff' ? staffCommands : userCommands;

		this.sendReplyBox(display);
	},
};

exports.game = ScavengerHunt;
