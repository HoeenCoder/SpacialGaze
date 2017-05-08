"use strict";

exports.commands = {
	requestroom: function (target, room, user) {
		if (!user.named) return this.errorReply(`Please choose a name before requesting a room`);
		if (!user.autoconfirmed) return this.errorReply(`You must be autoconfirmed to request a room.`);
		let curRequest = Db.rooms.get(user.userid, null);
		if (curRequest) {
			if (curRequest.blacklist) return this.errorReply(`You are banned from requesting rooms.`);
			// TODO vote on cooldown time (defaulting to 2 weeks)
			if (curRequest.cooldown && Date.now() - curRequest.cooldown < 1209600000) {
				return this.errorReply(`You cannot request another room for TBA.`);
			} else if (curRequest.cooldown) {
				curRequest = null;
			}
			if (curRequest) return this.parse('/checkroomrequest');
		}
		target = target.split(',');
		if (target.length < 3) return this.parse('/help requestroom');
		if (['public', 'private'].indexOf(toId(target[1])) === -1) return this.errorReply(`Valid room types are public and private.`);
		let desc = '';
		for (let i = 2; i < target.length; i++) {
			desc += target[i] + (i === target.length - 1 ? "" : ",");
		}
		curRequest = {
			name: Chat.escapeHTML(target[0].trim()),
			type: toId(target[1]),
			desc: Chat.escapeHTML(desc),
			trusted: user.trusted,
			staff: user.isStaff,
			status: "pending",
		};
		Db.rooms.set(user.userid, curRequest);
		SG.messageSeniorStaff(`/html ${user.name} has requested a room. <button class="button" name="send" value="/checkroomrequest ${user.userid}">Check request</button>`);
		return this.sendReply('Your room request has been sent to Upper Staff.');
	},
	requestroomhelp: ["/requestroom [name], [public|private], [why this room should be created] - Sends a room creation request to the Upper Staff. You can only request 1 room every (TBD) days/weeks. Upper staff will most likely contact you for further information before the room is created. We reserve the right to reject any requests."],
	checkroomrequest: function (target, room, user) {
		target = toId(target);
		if (!target) target = user.userid;
		if (!user.can('roomowner') && user.userid !== target) return this.errorReply(`/checkroomrequest -  Access Denied for viewing requests for other users.`);
		let curRequest = Db.rooms.get(target);
		if (!curRequest) return this.errorReply(`${(target === user.userid ? "You don't " : target + " does not ")} have a pending room request.`);
		let output = `<center><h1>Spacialgaze Room Request</h1></center><b>Requester</b>: ${target} <br/><b>Room Name</b>: ${curRequest.name}<br/><b>Room Type</b>: ${curRequest.type}<br/><b>Description</b>: ${curRequest.desc}<br/>`;
		if (user.can('roomowner')) output += `${(curRequest.isStaff ? `The requester is a Spacial Gaze global staff member` : (curRequest.trusted ? `The requester is a trusted user.` : ``))}`;
		this.sendReplyBox(output);
	},
	checkroomrequesthelp: ["/checkroomrequest (username) - Check a users current room request. leave username blank to default to your request. Requires: &, ~ if username is not your username."],
	roomrequests: function (target, room, user) {
		if (!this.can('roomowner')) return;
		target = target.split(',');
		switch (toId(target[0])) {
		case '':
		case 'view':
			let requests = Db.rooms.keys();
			let output = `<div class="infobox infobox-limited"><table><tr><th style="border: 1px solid" colspan="6"><b>Spacial Gaze Room Requests</b></th></tr><tr><th style="border: 1px solid">Requester</th><th style="border: 1px solid">Room Name</th><th style="border: 1px solid">Room Type</th><th style="border: 1px solid">Description</th><th style="border: 1px solid">Status</th><th style="border: 1px solid">Options</th></tr>`;
			for (let key in requests) {
				let cur = Db.rooms.get(key);
				output += `<tr><td style="border: 1px solid">${key}</td><td style="border: 1px solid">${cur.name}</td><td style="border: 1px solid">${cur.type}</td><td style="border: 1px solid">${cur.desc}</td><td style="border: 1px solid">${cur.status}</td>`;
				if (cur.status === 'pending') {
					output += `<td style="border: 1px solid"><button class="button" name="send" value="/roomrequests accept, ${key}">Accept</button><button class="button" name="send" value="/roomrequests reject, ${key}">Reject</button></td></tr>`;
				} else {
					output += `<td style="border: 1px solid">${cur.status} by ${cur.by}</td></tr>`;
				}
			}
			output += `</table></div>`;
			return user.sendTo(room, `|html|${output}`);
			//break;
		case 'accept':
			if (!target[1]) return this.parse('/help roomrequest');
			let req = Db.rooms.get(toId(target[1]));
			if (!req) return this.errorReply(`${target[1]} does not have a room request.`);
			if (req.blacklisted) return this.errorReply(`${target[1]} is banned from owning rooms.`);
			if (req.status !== 'pending') return this.errorReply(`${target[1]}'s current request has already been ${req.status}.`);
			req.status = 'accepted';
			req.by = user.userid;
			req.cooldown = Date.now();
			Db.rooms.set(toId(target[1]), req);
			this.parse(`/${(req.type === 'public' ? `makechatroom` : `makeprivatechatroom`)} ${req.name}`);
			user.popup(`|html|<center>You accepted the room request from ${target[1]}.<br/>The Room "${req.name}" was created, make sure to appoint ${target[1]} room founder!</center>`);
			return this.parse(`/join ${req.name}`);
			//break;
		case 'reject':
			if (!target[1]) return this.parse('/help roomrequest');
			let req = Db.rooms.get(toId(target[1]));
			if (!req) return this.errorReply(`${target[1]} does not have a room request.`);
			if (req.blacklisted) return this.errorReply(`${target[1]} is banned from owning rooms.`);
			if (req.status !== 'pending') return this.errorReply(`${target[1]}'s current request has already been ${req.status}.`);
			req.status = 'rejected';
			req.by = user.userid;
			req.cooldown = Date.now();
			Db.rooms.set(toId(target[1]), req);
			return this.sendReply(`You rejected the room request from ${target[1]}`);
			//break;
		case 'delete':
			if (!target[1]) return this.parse('/help roomrequest');
			let req = Db.rooms.get(toId(target[1]));
			if (!req) return this.errorReply(`${target[1]} does not have a room request.`);
			if (req.blacklisted) return this.errorReply(`${target[1]} is banned from owning rooms. If you want to undo the blacklist do /roomrequests unblacklist, ${target[1]}`);
			Db.rooms.set(toId(target[1]), undefined);
			return this.sendReply(`You deleted the room request from ${target[1]}`);
			//break;
		case 'blacklist':
			if (!target[1]) return this.parse('/help roomrequest');
			target[1] = toId(target[1]);
			let targetUser = Users(target[1]);
			let req = Db.rooms.get(target[1]);
			if (req && req.blacklisted) return this.errorReply(`${target[1]} is already banned from owning rooms.`);
			Db.rooms.set(target[1], {blacklisted: true, by: user.userid, reason: (target[2] || undefined)});
			let demoted = [];
			Rooms.rooms.forEach((curRoom, id) => {
				if (!curRoom.auth || !curRoom.auth[target[1]]) return;
				if (curRoom.founder === target[1]) {
					curRoom.founder = false;
					curRoom.chatRoomData.founder = false;
				}
				if (curRoom.auth[target[1]] === '#') {
					curRoom.auth[target[1]] = '@';
					demoted.push(curRoom.id);
					if (targetUser) room.onUpdateIdentity(targetUser);
				}
			});
			if (demoted.length) Rooms.global.writeChatRoomData();
			if (targetUser) targetUser.popup(`|html|<center>${user.name} has banned you from owning rooms. (${target[2]})<br/>You have been automatcally demoted from room owner in all rooms you had it in (if any).<br/>To appeal your room ownership blacklist, PM a & or ~.</center>`);
			if (Rooms('upperstaff')) Monitor.adminlog(`${target[1]} was banned from owning rooms by ${user.name} ${(demoted.length ? `and demoted from # in ${demoted.join(', ')}` : ``)}. ${(target[2] ? `(${target[2]})` : ``)}`);
			this.globalModlog("ROOMOWNERBAN", targetUser, " by " + user.name + (target[2] ? ": " + target[2] : ""));
			return this.sendReply(`${target[1]} was banned from owning rooms.`);
			//break;
		case 'unblacklist':
			if (!target[1]) return this.parse('/help roomrequest');
			target[1] = toId(target[1]);
			let req = Db.rooms.get(target[1]);
			if (!req || !req.blacklisted) return this.errorReply(`${target[1]} is not banned from owning rooms.`);
			Db.rooms.set(target[1], undefined);
			if (Rooms('upperstaff')) Monitor.adminlog(`${target[1]} was unbanned from owning rooms by ${user.name}.`);
			this.globalModlog("UNROOMOWNERBAN", target[1], " by " + user.name);
			return this.sendReply(`${target[1]} is no longer banned from owning rooms.`);
			//break;
		case 'viewblacklist':
			if (target[1]) {
				target[1] = toId(target[1]);
				let req = Db.rooms.get(target[1]);
				if (!req || !req.blacklisted) return this.errorReply(`${target[1]} is not banned from owning rooms.`);
				return this.sendReply(`ROOMOWNERBAN by ${req.by} ${(req.reason ? `(${req.reason})` : ``)}.`);
			}
			let list = [];
			let keys = Db.rooms.keys();
			for (let key in keys) {
				if (key.blacklisted) list.push(key);
			}
			if (!list.length) return this.sendReply('No users are banned from owning rooms.');
			return this.sendReply(`The following ${list.length} users are banned from owning rooms: ${list.join(', ')}.`);
			//break;
		default:
			return this.parse('/help roomrequest');
		}
	},
	roomrequestshelp: ["/roomrequests [view|accept|reject|delete|blacklist|unblacklist|viewblacklist], [request|username], (reason if blacklist) - Display and manage the list of current room requests. Requires: &, ~"],
};
