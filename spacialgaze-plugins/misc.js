/**
 * Miscellaneous commands
 *
 * Fixed/Improved upon by: The Run, HoeenHero, and Mystifi.
 *
 * Some of this code was borrowed from panpawn/jd/other contributors; as
 * such, credits go to them as well.
 */
'use strict';

let fs = require('fs');
let moment = require('moment');
let request = require('request');
let regdateCache = {};

//let badges = fs.createWriteStream('badges.txt', {'flags': 'a'});

function loadRegdateCache() {
	try {
		regdateCache = JSON.parse(fs.readFileSync('config/regdate.json', 'utf8'));
	} catch (e) {}
}
loadRegdateCache();

function saveRegdateCache() {
	fs.writeFileSync('config/regdate.json', JSON.stringify(regdateCache));
}

function clearRoom(room) {
	let len = (room.log && room.log.length) || 0;
	let users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		Users(u).leaveRoom(room, Users(u).connections[0]);
	}
	len = users.length;
	setTimeout(() => {
		while (len--) {
			Users(users[len]).joinRoom(room, Users(users[len]).connections[0]);
		}
	}, 1000);
}

exports.commands = {
	globalauth: 'gal',
	stafflist: 'gal',
	authlist: 'gal',
	auth: 'gal',
	gal: function (target, room, user, connection) {
		if (target) {
			let targetRoom = Rooms.search(target);
			let unavailableRoom = targetRoom && targetRoom.checkModjoin(user);
			if (targetRoom && !unavailableRoom) return this.parse('/roomauth1 ' + target);
			return this.parse('/userauth ' + target);
		}
		let rankLists = {};
		let ranks = Object.keys(Config.groups);
		for (let u in Users.usergroups) {
			let rank = Users.usergroups[u].charAt(0);
			if (rank === ' ') continue;
			// In case the usergroups.csv file is not proper, we check for the server ranks.
			if (ranks.includes(rank)) {
				let name = Users.usergroups[u].substr(1);
				if (!rankLists[rank]) rankLists[rank] = [];
				if (name) rankLists[rank].push(SG.nameColor(name, (Users(name) && Users(name).connected)));
			}
		}

		let buffer = Object.keys(rankLists).sort((a, b) =>
			(Config.groups[b] || {rank: 0}).rank - (Config.groups[a] || {rank: 0}).rank
		).map(r =>
			(Config.groups[r] ? "<b>" + Config.groups[r].name + "s</b> (" + r + ")" : r) + ":\n" + rankLists[r].sort((a, b) => toId(a).localeCompare(toId(b))).join(", ")
		);

		if (!buffer.length) return connection.popup("This server has no global authority.");
		connection.send("|popup||html|" + buffer.join("\n\n"));
	},

	roomauthority: 'roomauthlist',
	roomstaff: 'roomauthlist',
	roomauth: 'roomauthlist',
	roomauthlist: function (target, room, user, connection, cmd) {
		let userLookup = '';
		if (cmd === 'roomauth1') userLookup = '\n\nTo look up auth for a user, use /userauth ' + target;
		let targetRoom = room;
		if (target) targetRoom = Rooms.search(target);
		if (!targetRoom || targetRoom.id === 'global' || !targetRoom.checkModjoin(user)) return this.errorReply(`The room "${target}" does not exist.`);
		if (!targetRoom.auth) return this.sendReply("/roomauth - The room '" + (targetRoom.title || target) + "' isn't designed for per-room moderation and therefore has no auth list." + userLookup);

		let rankLists = {};
		for (let u in targetRoom.auth) {
			if (!rankLists[targetRoom.auth[u]]) rankLists[targetRoom.auth[u]] = [];
			rankLists[targetRoom.auth[u]].push(u);
		}

		let buffer = Object.keys(rankLists).sort((a, b) =>
			(Config.groups[b] || {rank:0}).rank - (Config.groups[a] || {rank:0}).rank
		).map(r => {
			let roomRankList = rankLists[r].sort();
			roomRankList = roomRankList.map(s => ((Users(s) && Users(s).connected) ? SG.nameColor(s, true) : SG.nameColor(s)));
			return (Config.groups[r] ? Chat.escapeHTML(Config.groups[r].name) + "s (" + Chat.escapeHTML(r) + ")" : r) + ":\n" + roomRankList.join(", ");
		});

		if (!buffer.length) {
			connection.popup("The room '" + targetRoom.title + "' has no auth." + userLookup);
			return;
		}
		if (targetRoom.founder) {
			buffer.unshift((targetRoom.founder ? "Room Founder:\n" + ((Users(targetRoom.founder) && Users(targetRoom.founder).connected) ? SG.nameColor(targetRoom.founder, true) : SG.nameColor(targetRoom.founder)) : ''));
		}
		if (room.autorank) buffer.unshift("Autorank is currently set to " + Config.groups[room.autorank].name + " (" + room.autorank + ")");
		if (targetRoom !== room) buffer.unshift("" + targetRoom.title + " room auth:");
		connection.send("|popup||html|" + buffer.join("\n\n") + userLookup);
	},

	autovoice: 'autorank',
	autodriver: 'autorank',
	autobot: 'autorank',
	automod: 'autorank',
	autoowner: 'autorank',
	autopromote: 'autorank',
	autorank: function (target, room, user, connection, cmd) {
		switch (cmd) {
		case 'autovoice':
			target = '+';
			break;
		case 'autobot':
			target = '*';
			break;
		case 'autodriver':
			target = '%';
			break;
		case 'automod':
			target = '@';
			break;
		case 'autoleader':
			target = '&';
			break;
		case 'autoowner':
			target = '#';
			break;
		}

		if (!target) return this.sendReply("Usage: /autorank [rank] - Automatically promotes user to the specified rank when they join the room.");
		if (!this.can('roommod', null, room)) return false;
		target = target.trim();

		if (target === 'off' && room.autorank) {
			delete room.autorank;
			delete room.chatRoomData.autorank;
			Rooms.global.writeChatRoomData();
			for (let u in room.users) Users(u).updateIdentity();
			return this.privateModCommand("(" + user.name + " has disabled autorank in this room.)");
		}
		if (room.autorank && room.autorank === target) return this.sendReply("Autorank is already set to \"" + target + "\".");

		if (Config.groups[target] && !Config.groups[target].globalonly) {
			if (target === '#' && user.userid !== room.founder) return this.sendReply("You can't set autorank to # unless you're the room founder.");
			room.autorank = target;
			room.chatRoomData.autorank = target;
			Rooms.global.writeChatRoomData();
			for (let u in room.users) Users(u).updateIdentity();
			return this.privateModCommand("(" + user.name + " has set autorank to \"" + target + "\" in this room.)");
		}
		return this.sendReply("Group \"" + target + "\" not found.");
	},

	'!roomauth': true,
	roomstaff: 'roomauth',
	roomauth1: 'roomauth',
	roomauth: function (target, room, user, connection, cmd) {
		let userLookup = '';
		if (cmd === 'roomauth1') userLookup = '\n\nTo look up auth for a user, use /userauth ' + target;
		let targetRoom = room;
		if (target) targetRoom = Rooms.search(target);
		if (!targetRoom || targetRoom.id === 'global' || !targetRoom.checkModjoin(user)) return this.errorReply(`The room "${target}" does not exist.`);
		if (!targetRoom.auth) return this.sendReply("/roomauth - The room '" + (targetRoom.title || target) + "' isn't designed for per-room moderation and therefore has no auth list." + userLookup);

		let rankLists = {};
		for (let u in targetRoom.auth) {
			if (!rankLists[targetRoom.auth[u]]) rankLists[targetRoom.auth[u]] = [];
			rankLists[targetRoom.auth[u]].push(u);
		}

		let buffer = Object.keys(rankLists).sort((a, b) =>
			(Config.groups[b] || {rank:0}).rank - (Config.groups[a] || {rank:0}).rank
		).map(r => {
			let roomRankList = rankLists[r].sort();
			roomRankList = roomRankList.map(s => s in targetRoom.users ? "**" + s + "**" : s);
			return (Config.groups[r] ? Config.groups[r].name + "s (" + r + ")" : r) + ":\n" + roomRankList.join(", ");
		});

		if (targetRoom.founder) buffer = ['Room Founder (#): \n' + targetRoom.founder].concat(buffer);

		if (!buffer.length) {
			connection.popup("The room '" + targetRoom.title + "' has no auth." + userLookup);
			return;
		}
		if (targetRoom !== room) buffer.unshift("" + targetRoom.title + " room auth:");
		connection.popup(buffer.join("\n\n") + userLookup);
	},

	roomfounder: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomfounder - This room isn't designed for per-room moderation to be added");
		}
		if (!target) return this.parse('/help roomfounder');
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);

		if (!Users.isUsernameKnown(userid)) {
			return this.errorReply(`User '${this.targetUsername}' is offline and unrecognized, and so can't be promoted.`);
		}

		if (!this.can('makeroom')) return false;

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		room.auth[userid] = '#';
		room.founder = userid;
		this.addModCommand(`${name} was appointed Room Founder by ${user.name}.`);
		if (targetUser) {
			targetUser.popup(`You were appointed Room Founder by ${user.name} in ${room.id}.`);
			room.onUpdateIdentity(targetUser);
		}
		Rooms.global.writeChatRoomData();
	},
	roomfounderhelp: ["/roomfounder [username] - Appoints [username] as a room founder. Requires: & ~"],

	roomdefounder: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomdefounder - This room isn't designed for per-room moderation.");
		}
		if (!target) return this.parse('/help roomdefounder');
		if (!this.can('makeroom')) return false;
		let targetUser = toId(target);
		if (room.founder !== targetUser) return this.errorReply(targetUser + ' is not the room founder of ' + room.name + '.');
		room.founder = false;
		return this.parse('/roomdeauth ' + target);
	},
	roomdefounderhelp: ["/roomdefounder [username] - Revoke [username]'s room founder position. Requires: &, ~"],

	roomowner: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		}
		if (!target) return this.parse('/help roomowner');
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);

		if (!Users.isUsernameKnown(userid)) {
			return this.errorReply(`User '${this.targetUsername}' is offline and unrecognized, and so can't be promoted.`);
		}

		if (!user.can('makeroom')) {
			if (user.userid !== room.founder) return false;
		}

		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		room.auth[userid] = '#';
		this.addModCommand(`${name} was appointed Room Owner by ${user.name}.`);
		if (targetUser) {
			targetUser.popup(`You were appointed Room Owner by ${user.name} in ${room.id}.`);
			room.onUpdateIdentity(targetUser);
		}
		Rooms.global.writeChatRoomData();
	},
	roomownerhelp: ["/roomowner [username] - Appoints [username] as a room owner. Requires: & ~"],

	'!roompromote': true,
	roomdemote: 'roompromote',
	roompromote: function (target, room, user, connection, cmd) {
		if (!room) {
			// this command isn't marked as room-only because it's usable in PMs through /invite
			return this.errorReply("This command is only available in rooms");
		}
		if (!room.auth) {
			this.sendReply("/roompromote - This room isn't designed for per-room moderation");
			return this.sendReply("Before setting room staff, you need to set a room owner with /roomowner");
		}
		if (!this.canTalk()) return;
		if (!target) return this.parse('/help roompromote');

		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let userid = toId(this.targetUsername);
		let name = targetUser ? targetUser.name : this.targetUsername;

		if (!userid) return this.parse('/help roompromote');
		if (!targetUser && !Users.isUsernameKnown(userid)) {
			return this.errorReply(`User '${name}' is offline and unrecognized, and so can't be promoted.`);
		}
		if (targetUser && !targetUser.registered) {
			return this.errorReply(`User '${name}' is unregistered, and so can't be promoted.`);
		}

		let currentGroup = room.getAuth({userid, group: (Users.usergroups[userid] || ' ').charAt(0)});
		let nextGroup = target;
		if (target === 'deauth') nextGroup = Config.groupsranking[0];
		if (!nextGroup) {
			return this.errorReply("Please specify a group such as /roomvoice or /roomdeauth");
		}
		if (!Config.groups[nextGroup]) {
			return this.errorReply(`Group '${nextGroup}' does not exist.`);
		}

		if (Config.groups[nextGroup].globalonly || (Config.groups[nextGroup].battleonly && !room.battle)) {
			return this.errorReply(`Group 'room${Config.groups[nextGroup].id}' does not exist as a room rank.`);
		}

		let groupName = Config.groups[nextGroup].name || "regular user";
		if ((room.auth[userid] || Config.groupsranking[0]) === nextGroup) {
			return this.errorReply(`User '${name}' is already a ${groupName} in this room.`);
		}
		if (!user.can('makeroom')) {
			if (currentGroup !== ' ' && !user.can('room' + (Config.groups[currentGroup] ? Config.groups[currentGroup].id : 'voice'), null, room)) {
				if (user.userid !== room.founder) return this.errorReply(`/${cmd} - Access denied for promoting/demoting from ${(Config.groups[currentGroup] ? Config.groups[currentGroup].name : "an undefined group")}.`);
			}
			if (nextGroup !== ' ' && !user.can('room' + Config.groups[nextGroup].id, null, room)) {
				return this.errorReply(`/${cmd} - Access denied for promoting/demoting to ${Config.groups[nextGroup].name}.`);
			}
		}
		let nextGroupIndex = Config.groupsranking.indexOf(nextGroup) || 1; // assume voice if not defined (although it should be by now)
		if (targetUser && targetUser.locked && !room.isPrivate && !room.battle && !room.isPersonal && nextGroupIndex >= 2) {
			return this.errorReply("Locked users can't be promoted.");
		}

		if (nextGroup === Config.groupsranking[0]) {
			delete room.auth[userid];
		} else {
			room.auth[userid] = nextGroup;
		}
		if (room.founder === userid && nextGroup !== '#') room.founder = false; //Must be a demotion as

		// Only show popup if: user is online and in the room, the room is public, and not a groupchat or a battle.
		let needsPopup = targetUser && room.users[targetUser.userid] && !room.isPrivate && !room.isPersonal && !room.battle;

		if (this.pmTarget && targetUser) {
			const text = `${targetUser.name} was invited (and promoted to Room ${groupName}) by ${user.name}`;
			room.add(`|c|${user.getIdentity(room)}|/log ${text}`).update();
			room.modlog(text);
		} else if (nextGroup in Config.groups && currentGroup in Config.groups && Config.groups[nextGroup].rank < Config.groups[currentGroup].rank) {
			if (targetUser && room.users[targetUser.userid] && !Config.groups[nextGroup].modlog) {
				// if the user can't see the demotion message (i.e. rank < %), it is shown in the chat
				targetUser.send(">" + room.id + "\n(You were demoted to Room " + groupName + " by " + user.name + ".)");
			}
			this.privateModCommand(`(${name} was demoted to Room ${groupName} by ${user.name}.)`);
			if (needsPopup) targetUser.popup(`You were demoted to Room ${groupName} by ${user.name} in ${room.id}.`);
		} else if (nextGroup === '#') {
			this.addModCommand(`${'' + name} was promoted to ${groupName} by ${user.name}.`);
			if (needsPopup) targetUser.popup(`You were promoted to ${groupName} by ${user.name} in ${room.id}.`);
		} else {
			this.addModCommand(`${'' + name} was promoted to Room ${groupName} by ${user.name}.`);
			if (needsPopup) targetUser.popup(`You were promoted to Room ${groupName} by ${user.name} in ${room.id}.`);
		}

		if (targetUser) targetUser.updateIdentity(room.id);
		if (room.chatRoomData) Rooms.global.writeChatRoomData();
	},
	roompromotehelp: [
		"/roompromote OR /roomdemote [username], [group symbol] - Promotes/demotes the user to the specified room rank. Requires: @ * # & ~",
		"/room[group] [username] - Promotes/demotes the user to the specified room rank. Requires: @ * # & ~",
		"/roomdeauth [username] - Removes all room rank from the user. Requires: @ * # & ~",
	],

	clearall: function (target, room, user) {
		if (!this.can('declare')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);

		this.privateModCommand(`(${user.name} used /clearall.)`);
	},

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('gdeclare')) return false;

		Rooms.rooms.forEach(room => clearRoom(room));
		Users.users.forEach(user => user.popup('All rooms have been cleared.'));
		this.privateModCommand(`(${user.name} used /globalclearall.)`);
	},

	contact: 'whotocontact',
	wtc: 'whotocontact',
	whotocontact: function (target, room, user) {
		return this.sendReplyBox(
			'<b><u><font color="#008ae6"><h2>Who to Contact</u></b></font></h2>' +
			'<h3>For those who don\'t exactly know who to contact about a certain situation, this guide will help you contact the right person!</h3>' +
			'<hr>' +
			'<b>Global Drivers (%):</b> - Its best to contact a Global Driver if there are any forms of trolling, spamming, or severely negative behavior. If you ever witness this, please contact them as soon as possible. <br />' +
			'<hr>' +
			'<b>Global Moderators (@)</b> - Normally if there are multiple spammers, Global Mods can be contacted to resolve the issue.  <br />' +
			'<hr>' +
			'<b>Global Leaders (&)</b> - Its best to contact a Leader if there are any issues with Global Auth or Room Owners. It is up to the Leaders to make the final decision of any situation reported. At the same time, they also handle requests on appointing Room Owners and creating/deregistering a room. <br />' +
			'<hr>' +
			'<b>Administrators (~)</b> - Administrators are to be contacted if there is a serious issue. This may include sexual harrassment and/or abuse of power from Room Owners as well as Global Staff. Its also important to contact Administrators if there are any bugs within the server system that need to be looked at.  <br />'
		);
	},

	roomlist: function (target, room, user) {
		let header = ['<b><font color="#1aff1a" size="2">Total users connected: ' + Rooms.global.userCount + '</font></b><br />'],
			official = ['<b><font color="#ff9900" size="2"><u>Official Rooms:</u></font></b><br />'],
			nonOfficial = ['<hr><b><u><font color="#005ce6" size="2">Public Rooms:</font></u></b><br />'],
			privateRoom = ['<hr><b><u><font color="#ff0066" size="2">Private Rooms:</font></u></b><br />'],
			groupChats = ['<hr><b><u><font color="#00b386" size="2">Group Chats:</font></u></b><br />'],
			battleRooms = ['<hr><b><u><font color="#cc0000" size="2">Battle Rooms:</font></u></b><br />'];

		let rooms = [];

		Rooms.rooms.forEach(curRoom => {
			if (curRoom.id !== 'global') rooms.push(curRoom.id);
		});

		rooms.sort();

		for (let u in rooms) {
			let curRoom = Rooms(rooms[u]);
			if (curRoom.type === 'battle') {
				battleRooms.push('<a href="/' + curRoom.id + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
			}
			if (curRoom.type === 'chat') {
				if (curRoom.isPersonal) {
					groupChats.push('<a href="/' + curRoom.id + '" class="ilink">' + curRoom.id + '</a> (' + curRoom.userCount + ')');
					continue;
				}
				if (curRoom.isOfficial) {
					official.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
					continue;
				}
				if (curRoom.isPrivate) {
					privateRoom.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
					continue;
				}
			}
			if (curRoom.type !== 'battle') nonOfficial.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + curRoom.title + '</a> (' + curRoom.userCount + ')');
		}

		if (!user.can('roomowner')) return this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' '));
		this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' ') + (groupChats.length > 1 ? groupChats.join(' ') : '') + (battleRooms.length > 1 ? battleRooms.join(' ') : ''));
	},

	hide: 'hideauth',
	hideauth: function (target, room, user) {
		if (!user.can('lock')) return this.sendReply("/hideauth - Access Denied.");
		let tar = ' ';
		if (target) {
			target = target.trim();
			if (Config.groupsranking.indexOf(target) > -1 && target !== '#') {
				if (Config.groupsranking.indexOf(target) <= Config.groupsranking.indexOf(user.group)) {
					tar = target;
				} else {
					this.sendReply('The group symbol you have tried to use is of a higher authority than you have access to. Defaulting to \' \' instead.');
				}
			} else {
				this.sendReply('You have tried to use an invalid character as your auth symbol. Defaulting to \' \' instead.');
			}
		}
		user.customSymbol = tar;
		user.updateIdentity();
		this.sendReply('You are now hiding your auth symbol as \'' + tar + '\'.');
	},
	hidehelp: ["/hide - Hides user's global rank. Requires: & ~"],

	show: 'showauth',
	showauth: function (target, room, user) {
		if (!user.can('lock')) return this.sendReply("/showauth - Access Denied.");
		user.customSymbol = false;
		user.updateIdentity();
		this.sendReply("You have now revealed your auth symbol.");
		this.sendReply("Your symbol has been reset.");
	},
	showhelp: ["/show - Displays user's global rank. Requires: & ~"],

	credits: function (target, room, user) {
		function name(name, bold) {
			if (bold) {
				return "<b><font color=" + hashColorWithCustoms(name) + ">" + Chat.escapeHTML(name) + "</font></b>";
			} else {
				return "<font color=" + hashColorWithCustoms(name) + ">" + Chat.escapeHTML(name) + "</font>";
			}
		}
		let popup = "|html|" + "<font size=5 color=#0066ff><u><b>SpacialGaze Credits</b></u></font><br />" +
			"<br />" +
			"<u><b>Server Maintainers:</u></b><br />" +
			"- " + (name)('Mystifi', true) + " (Owner, Sysadmin, Development)<br />" +
			"- " + (name)('HoeenHero', true) + " (Owner, Sysadmin, Development)<br />" +
			"- " + (name)('Desokoro', true) + " (Server Host)<br />" +
			"<br />" +
			"<u><b>Major Contributors:</b></u><br />" +
			"- " + (name)('Opple', true) + " (Social Media Lead)<br />" +
			"- " + (name)('Kraken Mare', true) + " (Development, Server Events Leader)<br />" +
			"- " + (name)('Celestial Tater', true) + " (Server Events Leader)<br />" +
			"<br />" +
			"<u><b>Retired Staff:</b></u><br />" +
			"- " + (name)('The Run', true) + " (Former Server Owner)<br />" +
			"- " + (name)('Vulcaron', true) + " (Former Policy Leader)<br />" +
			"<br />" +
			"<u><b>Special Thanks:</b></u><br />" +
			"- Staff Members<br />" +
			"- Our Regular Users<br />";
		user.popup(popup);
	},

	/* Friendcode command in profile.js
	friendcodehelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<b>Friend Code Help:</b> <br><br />' +
			'/friendcode (/fc) [friendcode] - Sets your Friend Code.<br />' +
			'/getcode (gc) - Sends you a popup of all of the registered user\'s friend codes.<br />' +
			'/deletecode [user] - Deletes this user\'s friend code from the server (Requires %, @, &, ~)<br>' +
			'<i>--Any questions, PM The Run, HoeenHero, or Mystifi!</i>');
	},
	friendcode: 'fc',
	fc: function (target, room, user, connection) {
		if (!target) {
			return this.sendReply("Enter in your friend code. Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		}
		let fc = target;
		fc = fc.replace(/-/g, '');
		fc = fc.replace(/ /g, '');
		if (isNaN(fc)) return this.sendReply("The friend code you submitted contains non-numerical characters. Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		if (fc.length < 12) return this.sendReply("The friend code you have entered is not long enough! Make sure it's in the format: xxxx-xxxx-xxxx or xxxx xxxx xxxx or xxxxxxxxxxxx.");
		fc = fc.slice(0, 4) + '-' + fc.slice(4, 8) + '-' + fc.slice(8, 12);
		let codes = fs.readFileSync('config/friendcodes.txt', 'utf8');
		if (codes.toLowerCase().indexOf(user.name) > -1) {
			return this.sendReply("Your friend code is already here.");
		}
		fs.writeFileSync('config/friendcodes.txt', codes + '\n' + user.name + ': ' + fc);
		return this.sendReply("Your friend code: " + fc + " has been set.");
	},
	viewcode: 'gc',
	getcodes: 'gc',
	viewcodes: 'gc',
	vc: 'gc',
	getcode: 'gc',
	gc: function (target, room, user, connection) {
		let codes = fs.readFileSync('config/friendcodes.txt', 'utf8');
		return user.send('|popup|' + codes);
	},
	deletecode: function (target, room, user) {
		if (!target) {
			return this.sendReply('/deletecode [user] - Deletes the Friend Code of the User.');
		}
		if (!this.can('lock')) return false;
		fs.readFile('config/friendcodes.txt', 'utf8', (err, data) => {
			if (err) console.log(err);
			let row = ('' + data).split('\n');
			let match = false;
			let line = '';
			for (let i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				let line = row[i].split(':');
				if (target === line[0]) {
					match = true;
					line = row[i];
				}
				break;
			}
			if (match === true) {
				let re = new RegExp(line, 'g');
				let result = data.replace(re, '');
				fs.writeFile('config/friendcodes.txt', result, 'utf8', err => {
					if (err) return this.sendReply(err);
					this.sendReply('The Friendcode ' + line + ' has been deleted.');
				});
			} else {
				this.sendReply('There is no match.');
			}
		});
	},
	*/
	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk() && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!this.can('mute', targetUser, room)) return false;

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ".");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = ' Server Info [Do Not Respond!]';
		Users.users.forEach(curUser => {
			let message = '|pm|' + pmName + '|' + curUser.getIdentity() + '|' + target;
			curUser.send(message);
		});
	},
	pmallhelp: ["/pmall [message]."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = ' InFo.Staff';

		Users.users.forEach(curUser => {
			if (!curUser.isStaff) return;
			let message = '|pm|' + pmName + '|' + curUser.getIdentity() + '|' + target;
			curUser.send(message);
		});
	},
	pmallstaffhelp: ["/pmallstaff [message]"],

	hc: function (room, user, cmd) {
		return this.parse('/hotpatch chat');
	},

	hf: function (room, user, cmd) {
		return this.parse('/hotpatch formats');
	},

	hb: function (room, user, cmd) {
		return this.parse('/hotpatch battles');
	},

	hv: function (room, user, cmd) {
		return this.parse('/hotpatch validator');
	},

	regdate: function (target, room, user, connection) {
		if (!target) target = user.name;
		let targetUser = toId(target);
		if (targetUser.length < 1 || targetUser.length > 19) {
			return this.sendReply("Usernames can not be less than one character or longer than 19 characters. (Current length: " + targetUser.length + ".)");
		}
		if (!this.runBroadcast()) return;
		if (regdateCache[targetUser]) {
			this.sendReplyBox(regdateReply(regdateCache[targetUser]));
		} else {
			request('http://pokemonshowdown.com/users/' + targetUser + '.json', (error, response, body) => {
				let data = JSON.parse(body);
				let date = data['registertime'];
				if (date !== 0 && date.toString().length < 13) {
					while (date.toString().length < 13) {
						date = Number(date.toString() + '0');
					}
				}
				this.sendReplyBox(regdateReply(date));
				if (date !== 0) {
					regdateCache[targetUser] = date;
					saveRegdateCache();
				}
			});
		}

		function regdateReply(date) {
			if (date === 0) {
				return "<b><font color=\"" + hashColorWithCustoms(targetUser) + "\">" + Chat.escapeHTML(target) + "</font> is not registered.";
			} else {
				return "<b><font color=\"" + hashColorWithCustoms(targetUser) + "\">" + Chat.escapeHTML(target) + "</font></b> was registered on " + moment(date).format("dddd, MMMM DD, YYYY HH:mm A") + ".";
			}
			//room.update();
		}
	},
	regdatehelp: ["/regdate - Gets the regdate (register date) of a username."],

	uor: 'usersofrank',
	usersofrank: function (target, room, user) {
		if (!target || !Config.groups[target]) return false;
		if (!this.runBroadcast()) return;
		let names = [];
		Users.users.forEach(user => {
			if (user.group === target) {
				names.push(user.name);
			}
		});
		names = names.sort();
		if (names.length < 1) return this.sendReplyBox('There are no users of the rank <font color="#24678d"><b>' + Chat.escapeHTML(Config.groups[target].name) + '</b></font> currently online.');
		return this.sendReplyBox('There ' + (names.length === 1 ? 'is' : 'are') + ' <font color="#24678d"><b>' + names.length + '</b></font> ' + (names.length === 1 ? 'user' : 'users') + ' with the rank <font color="#24678d"><b>' + Config.groups[target].name + '</b></font> currently online.<br />' + names.join(', '));
	},

	sg: 'spacialgazerepo',
	sgr: 'spacialgazerepo',
	repo: 'spacialgazerepo',
	spacialgazerepo: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|<a href='https://github.com/HoeenCoder/SpacialGaze'>SpacialGaze\'s repo</a>");
	},
	spacialgazerepohelp: ["/spacialgazerepo - Links to the SpacialGaze repository on Github."],

	seen: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(targetUser.name + " is <b><font color=#00cc00>currently online</b></font>.");
		target = Chat.escapeHTML(target);
		let seen = Db('seen').get(toId(target));
		if (!seen) return this.sendReplyBox(target + " has <font color=#e60000>never been online</font> on this server.");
		this.sendReplyBox(target + " <font color=#ff9900>was last seen</font><b> " + moment(seen).fromNow() + "</b>.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

	tell: function (target, room, user, connection) {
		if (!target) return this.parse('/help tell');
		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help tell');
		}

		if (targetUser && targetUser.connected) {
			return this.parse('/pm ' + this.targetUsername + ', ' + target);
		}

		if (user.locked) return this.popupReply("You may not send offline messages when locked.");
		if (target.length > 255) return this.popupReply("Your message is too long to be sent as an offline message (>255 characters).");

		if (Config.tellrank === 'autoconfirmed' && !user.autoconfirmed) {
			return this.popupReply("You must be autoconfirmed to send an offline message.");
		} else if (!Config.tellrank || Config.groupsranking.indexOf(user.group) < Config.groupsranking.indexOf(Config.tellrank)) {
			return this.popupReply("You cannot send an offline message because offline messaging is " +
				(!Config.tellrank ? "disabled" : "only available to users of rank " + Config.tellrank + " and above") + ".");
		}

		let userid = toId(this.targetUsername);
		if (userid.length > 18) return this.popupReply("\"" + this.targetUsername + "\" is not a legal username.");

		let sendSuccess = Tells.addTell(user, userid, target);
		if (!sendSuccess) {
			if (sendSuccess === false) {
				return this.popupReply("User " + this.targetUsername + " has too many offline messages queued.");
			} else {
				return this.popupReply("You have too many outgoing offline messages queued. Please wait until some have been received or have expired.");
			}
		}
		return connection.send('|pm|' + user.getIdentity() + '|' +
			(targetUser ? targetUser.getIdentity() : ' ' + this.targetUsername) +
			"|/text This user is currently offline. Your message will be delivered when they are next online.");
	},
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."],

	reddeclare: 'declare',
	greendeclare: 'declare',
	declare: function (target, room, user, connection, cmd, message) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk()) return;

		let color = 'blue';
		switch (cmd) {
		case 'reddeclare':
			color = 'red';
			break;
		case 'greendeclare':
			color = 'green';
			break;
		}
		this.add('|raw|<div class="broadcast-' + color + '"><b>' + Chat.escapeHTML(target) + '</b></div>');
		this.logModCommand(user.name + " declared " + target);
	},
	declarehelp: ["/declare [message] - Anonymously announces a message. Requires: # * & ~"],

	redhtmldeclare: 'htmldeclare',
	greenhtmldeclare: 'htmldeclare',
	htmldeclare: function (target, room, user, connection, cmd, message) {
		if (!target) return this.parse('/help htmldeclare');
		if (!this.can('gdeclare', null, room)) return false;
		if (!this.canTalk()) return;
		target = this.canHTML(target);
		if (!target) return;

		let color = 'blue';
		switch (cmd) {
		case 'redhtmldeclare':
			color = 'red';
			break;
		case 'greenhtmldeclare':
			color = 'green';
			break;
		}
		this.add('|raw|<div class="broadcast-' + color + '">' + target + '</div>');
		this.logModCommand(user.name + " declared " + target);
	},
	htmldeclarehelp: ["/htmldeclare [message] - Anonymously announces a message using safe HTML. Requires: ~"],

	redglobaldeclare: 'globaldeclare',
	greenglobaldeclare: 'globaldeclare',
	redgdeclare: 'globaldeclare',
	greengdeclare: 'globaldeclare',
	gdeclare: 'globaldeclare',
	globaldeclare: function (target, room, user, connection, cmd, message) {
		if (!target) return this.parse('/help globaldeclare');
		if (!this.can('gdeclare')) return false;
		target = this.canHTML(target);
		if (!target) return;

		let color = 'blue';
		switch (cmd) {
		case 'redglobaldeclare':
		case 'redgdeclare':
			color = 'red';
			break;
		case 'greenglobaldeclare':
		case 'greengdeclare':
			color = 'green';
			break;
		}
		Rooms.rooms.forEach((curRoom, id) => {
			if (id !== 'global') curRoom.addRaw('<div class="broadcast-' + color + '">' + target + '</div>').update();
		});
		this.logModCommand(user.name + " globally declared " + target);
	},
	globaldeclarehelp: ["/globaldeclare [message] - Anonymously announces a message to every room on the server. Requires: ~"],

	redchatdeclare: 'chatdeclare',
	greenchatdeclare: 'chatdeclare',
	redcdeclare: 'chatdeclare',
	greencdeclare: 'chatdeclare',
	cdeclare: 'chatdeclare',
	chatdeclare: function (target, room, user, connection, cmd, message) {
		if (!target) return this.parse('/help chatdeclare');
		if (!this.can('gdeclare')) return false;
		target = this.canHTML(target);
		if (!target) return;

		let color = 'blue';
		switch (cmd) {
		case 'reddeclare':
			color = 'red';
			break;
		case 'greendeclare':
			color = 'green';
			break;
		}
		Rooms.rooms.forEach((curRoom, id) => {
			if (id !== 'global' && curRoom.type !== 'battle') curRoom.addRaw('<div class="broadcast-' + color + '">' + target + '</div>').update();
		});
		this.logModCommand(user.name + " globally declared (chat level) " + target);
	},
	chatdeclarehelp: ["/cdeclare [message] - Anonymously announces a message to all chatrooms on the server. Requires: ~"],
};
