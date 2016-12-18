/*
* economy.js by CreaturePhil
* Dice Game Credits - SilverTactic (Silveee) refactored by Lord Haji
*/
'use strict';

let fs = require('fs');
let path = require('path');
let writeJSON = true;
let Shop = {};
const INACTIVE_END_TIME = 1 * 60 * 1000; // 1 minute

/**
 * Gets an amount and returns the amount with the name of the currency.
 *
 * @examples
 * currencyName(0); // 0 bucks
 * currencyName(1); // 1 buck
 * currencyName(5); // 5 bucks
 *
 * @param {Number} amount
 * @returns {String}
 */
function currencyName(amount) {
	let name = " Stardust";
	return name;
}
SG.currencyName = currencyName;

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

/**
 * Log money to logs/money.txt file.
 *
 * @param {String} message
 */
function logMoney(message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/money.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
}
SG.logMoney = logMoney;

/*
* Dice start
*/

function diceImg(num) {
	switch (num) {
	case 0:
		return "http://i.imgur.com/nUbpLTD.png";
	case 1:
		return "http://i.imgur.com/BSt9nfV.png";
	case 2:
		return "http://i.imgur.com/eTQMVhY.png";
	case 3:
		return "http://i.imgur.com/3Y2hCAJ.png";
	case 4:
		return "http://i.imgur.com/KP3Za7O.png";
	case 5:
		return "http://i.imgur.com/lvi2ZZe.png";
	}
}

class Dice {
	constructor(room, amount, starter) {
		this.room = room;
		if (!this.room.diceCount) this.room.diceCount = 0;
		this.bet = amount;
		this.players = [];
		this.timer = setTimeout(() => {
			this.room.add('|uhtmlchange|' + this.room.diceCount + '|<div class = "infobox">(This game of dice has been ended due to inactivity.)</div>').update();
			delete this.room.dice;
		}, INACTIVE_END_TIME);

		this.startMessage = '<div class="infobox"><b style="font-size: 14pt; color: #24678d"><center> ' + SG.nameColor(starter, true) + ' has started a game of dice for <span style = "color: red">' + amount + '</span> ' + SG.currencyName(amount) + '!</center></b><br>' +
			'<center><img style="margin-right: 30px;" src = "http://i.imgur.com/eywnpqX.png" width="80" height="80">' +
			'<img style="transform:rotateY(180deg); margin-left: 30px;" src="http://i.imgur.com/eywnpqX.png" width="80" height="80"><br>' +
			'<button name="send" value="/joindice">Click to join!</button></center>';
		this.room.add('|uhtml|' + (++this.room.diceCount) + '|' + this.startMessage + '</div>').update();
	}

	join(user, self) {
		if (this.players.length === 2) return self.errorReply("Two users have already joined this game of dice.");
		if (Db('money').get(user.userid, 0) < this.bet) return self.errorReply('You don\'t have enough money for this game of dice.');
		if (this.players.includes(user)) return self.sendReply('You have already joined this game of dice.');
		//if (this.players.length && this.players[0].latestIp === user.latestIp) return self.errorReply("You have already joined this game of dice under the alt '" + this.players[0].name + "'.");

		this.players.push(user);
		this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '<center>' + SG.nameColor(user.name, true) + ' has joined the game!</center></div>').update();
		if (this.players.length === 2) this.play();
	}

	leave(user, self) {
		if (!this.players.includes(user)) return self.sendReply('You haven\'t joined the game of dice yet.');
		this.players.remove(user);
		this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '</div>');
	}

	play() {
		let p1 = this.players[0], p2 = this.players[1];
		let money1 = Db('money').get(p1.userid, 0);
		let money2 = Db('money').get(p2.userid, 0);

		if (money1 < this.bet || money2 < this.bet) {
			let user = (money1 < this.bet ? p1 : p2);
			let other = (user === p1 ? p2 : p1);
			user.sendTo(this.room, 'You have been removed from this game of dice, as you do not have enough money.');
			other.sendTo(this.room, user.name + ' has been removed from this game of dice, as they do not have enough money. Wait for another user to join.');
			this.players.remove(user);
			this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '<center>' + this.players.map(user => SG.nameColor(user.name, true)) + ' has joined the game!</center>').update();
			return;
		}
		let players = this.players.map(user => SG.nameColor(user.name, true)).join(' and ');
		this.room.add('|uhtmlchange|' + this.room.diceCount + '|' + this.startMessage + '<center>' + players + ' have joined the game!</center></div>').update();
		let roll1, roll2;
		do {
			roll1 = Math.floor(Math.random() * 6);
			roll2 = Math.floor(Math.random() * 6);
		} while (roll1 === roll2);
		if (roll2 > roll1) this.players.reverse();
		let winner = this.players[0], loser = this.players[1];

		setTimeout(() => {
			this.room.add('|uhtmlchange|' + this.room.diceCount + '|<div class="infobox"><center>' + players + ' have joined the game!<br /><br />' +
				'The game has been started! Rolling the dice...<br />' +
				'<img src = "' + diceImg(roll1) + '" align = "left" title = "' + Chat.escapeHTML(p1.name) + '\'s roll"><img src = "' + diceImg(roll2) + '" align = "right" title = "' + p2.name + '\'s roll"><br />' +
				SG.nameColor(p1.name, true) + ' rolled ' + (roll1 + 1) + '!<br />' +
				SG.nameColor(p2.name, true) + ' rolled ' + (roll2 + 1) + '!<br />' +
				SG.nameColor(winner.name, true) + ' has won <b style="color:red">' + (this.bet) + '</b> ' + SG.currencyName(this.bet) + '!<br />' +
				'Better luck next time, ' + SG.nameColor(loser.name, true) + '</font></b>!'
			).update();
			Db('money').set(winner.userid, Db('money').get(winner.userid) + this.bet);
			Db('money').set(loser.userid, Db('money').get(loser.userid) - this.bet);
			this.end();
		}, 800);
	}

	end(user) {
		if (user) this.room.add('|uhtmlchange|' + this.room.diceCount + '|<div class = "infobox">(This game of dice has been forcibly ended by ' + Chat.escapeHTML(user.name) + '.)</div>').update();
		clearTimeout(this.timer);
		delete this.room.dice;
	}
}

/*
* Dice end
*/

exports.commands = {
	'!wallet': true,
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;
		const amount = Db('money').get(toId(target), 0);
		this.sendReplyBox(SG.nameColor(target, true) + " has " + amount + SG.currencyName(amount) + ".");
	},
	wallethelp: ["/wallet or /atm or /purse [user] - Shows the amount of money a user has."],

	givecurrency: 'givemoney',
	gc: 'givemoney',
	givestardast: 'givemoney',
	givemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);
		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) + amount).get(toId(username));
		amount = amount + SG.currencyName(amount);
		total = total + SG.currencyName(total);
		this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup("|html|" + SG.nameColor(user.name, true) + " has given you " + amount + ". You now have " + total + ".");
		SG.logMoney(username + " was given " + amount + " by " + user.name + ". " + username + " now has " + total);
	},
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."],

	takebuck: 'takemoney',
	takebucks: 'takemoney',
	takemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) - amount).get(toId(username));
		amount = amount + SG.currencyName(amount);
		total = total + SG.currencyName(total);
		this.sendReply(username + " losted " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup("|html|" + SG.nameColor(user.name, true) + " has taken " + amount + " from you. You now have " + total + ".");
		SG.logMoney(username + " had " + amount + " taken away by " + user.name + ". " + username + " now has " + total);
	},
	takemoneyhelp: ["/takemoney [user], [amount] - Take a certain amount of money from a user."],

	resetbuck: 'resetmoney',
	resetbucks: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		Db('money').set(toId(target), 0);
		this.sendReply(target + " now has 0 bucks.");
		SG.logMoney(user.name + " reset the money of " + target + ".");
	},
	resetmoneyhelp: ["/resetmoney [user] - Reset user's money to zero."],

	transfer: 'transfermoney',
	transferbuck: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.errorReply("You cannot transfer to yourself.");
		if (username.length > 19) return this.errorReply("Username cannot be longer than 19 characters.");
		if (typeof amount === 'string') return this.errorReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");

		Db('money')
			.set(user.userid, Db('money').get(user.userid) - amount)
			.set(uid, Db('money').get(uid, 0) + amount);

		let userTotal = Db('money').get(user.userid) + SG.currencyName(Db('money').get(user.userid));
		let targetTotal = Db('money').get(uid) + SG.currencyName(Db('money').get(uid));
		amount = amount + SG.currencyName(amount);

		this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
		if (Users.get(username)) Users(username).popup("|html|" + SG.nameColor(user.name, true) + " has transferred " + amount + ". You now have " + targetTotal + ".");
		SG.logMoney(user.name + " transferred " + amount + " to " + username + ". " + user.name + " now has " + userTotal + " and " + username + " now has " + targetTotal + ".");
	},
	transfermoneyhelp: ["/transfer [user], [amount] - Transfer a certain amount of money to a user."],

	moneylog: function (target, room, user, connection) {
		if (!this.can('modlog')) return;
		target = toId(target);
		let numLines = 15;
		let matching = true;
		if (target.match(/\d/g) && !isNaN(target)) {
			numLines = Number(target);
			matching = false;
		}
		let topMsg = "Displaying the last " + numLines + " lines of transactions:\n";
		let file = path.join(__dirname, '../logs/money.txt');
		fs.exists(file, function (exists) {
			if (!exists) return connection.popup("No transactions.");
			fs.readFile(file, 'utf8', function (err, data) {
				data = data.split('\n');
				if (target && matching) {
					data = data.filter(function (line) {
						return line.toLowerCase().indexOf(target.toLowerCase()) >= 0;
					});
				}
				connection.popup('|wide|' + topMsg + data.slice(-(numLines + 1)).join('\n'));
			});
		});
	},

	moneyladder: 'richestuser',
	richladder: 'richestuser',
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let display = '<center><u><b>Richest Users</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Money</th></tr>';
		let keys = Object.keys(Db('money').object()).map(function (name) {
			return {name: name, money: Db('money').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys.sort(function (a, b) {
			return b.money - a.money;
		});
		keys.slice(0, 10).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + SG.nameColor(user.name, true) + "</td><td>" + user.money + "</td></tr>";
		});
		display += "</tbody></table>";
		this.sendReply("|raw|" + display);
	},
	
	startdice: 'dicegame',
	dicegame: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if (!user.can('broadcast', null, room) && room.id !== 'casino' && room.id !== 'coldfrontcasino') return this.errorReply("You must be ranked + or higher in this room to start a game of dice outside the Casino.");
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.errorReply("You cannot use this command while unable to talk.");
		if (room.dice) return this.errorReply("There is already a game of dice going on in this room.");

		let amount = Number(target) || 1;
		if (isNaN(target)) return this.errorReply('"' + target + '" isn\'t a valid number.');
		if (target.includes('.') || amount < 1 || amount > 5000) return this.sendReply('The number of bucks must be between 1 and 5,000 and cannot contain a decimal.');
		if (Db('money').get(user.userid, 0) < amount) return this.sendReply("You don't have " + amount + " " + SG.currencyName(amount) + ".");
		room.dice = new Dice(room, amount, user.name);
		this.parse("/joindice");
	},
	startdicehelp: ["/startdice or /dicegame [bet] - Start a dice game to gamble for money."],

	dicejoin: 'joindice',
	joindice: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.sendReply("You cannot use this command while unable to talk.");
		if (!room.dice) return this.errorReply('There is no game of dice going on in this room.');

		room.dice.join(user, this);
	},
	joindicehelp: ["/joindice or /dicejoin - Joins ongoing dice game in the room."],

	diceleave: 'leavedice',
	leavedice: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if (!room.dice) return this.errorReply('There is no game of dice going on in this room.');

		room.dice.leave(user, this);
	},
	leavedicehelp: ["/leavedice or /diceleave - Leaves currently joined dice game in the room."],

	diceend: 'enddice',
	enddice: function (target, room, user) {
		if (room.id === 'lobby') return this.errorReply("This command cannot be used in the Lobby.");
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.sendReply("You cannot use this command while unable to talk.");
		if (!room.dice) return this.errorReply('There is no game of dice going on in this room.');
		if (!user.can('broadcast', null, room) && !room.dice.players.includes(user)) return this.errorReply("You must be ranked + or higher in this room to end a game of dice.");

		room.dice.end(user);
	},
	enddicehelp: ["/enddice or /diceend - Ends ongoing dice game in the room."],

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length) || '0';
		let output = "There " + (total > 1 ? "are " : "is ") + total + SG.currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + SG.currencyName(average) + ".";
		this.sendReplyBox(output);
	},

};
