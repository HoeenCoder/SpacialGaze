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
			
			break;
		case 'accept':
			
			break;
		case 'reject':
			
			break;
		case 'delete':
			
			break;
		case 'blacklist':
			
			break;
		case 'unblacklist':
			
			break;
		default:
			return this.parse('/help roomrequest');
		}
	},
	roomrequestshelp: ["/roomrequests [view|accept|reject|delete|blacklist|unblacklist], [request] - Display and manage the list of current room requests. Requires: &, ~"],
};
