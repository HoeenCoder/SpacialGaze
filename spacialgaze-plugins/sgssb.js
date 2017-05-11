'use strict';
let fs = require('fs');
let monData;
try {
	monData = fs.readFileSync("data/sgssb-data.txt").toString().split("\n\n");
} catch (e) {
	console.error(e);
}

function getMonData(target) {
	let returnData = null;
	monData.forEach(function (data) {
		if (toId(data.split("\n")[0].split(" - ")[0] || " ") === target) {
			returnData = data.split("\n").map(function (line) {
				return Chat.escapeHTML(line);
			}).join("<br />");
		}
	});
	return returnData;
}

exports.commands = {
	sgssb: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		if (!target || target === 'help') return this.parse('/help sgssb');
		if (target === 'credits') return this.parse('/sgssbcredits');
		let targetData = getMonData(toId(target));
		if (!targetData) return this.errorReply("The staffmon '" + toId(target) + "' could not be found.");
		return this.sendReplyBox(targetData);
	},

	sgssbhelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("/sgssb [staff member\'s name] - displays data for a staffmon\'s movepool, custom move, and custom ability.");
	},

	sgssbcredits: function (target, room, user) {
		let popup = "|html|" + "<font size=5 color=#000080><u><b>SGSSB Credits</b></u></font><br />" +
			"<br />" +
			"<u><b>Programmers:</u></b><br />" +
			"- " + SG.nameColor('HoeenHero', true) + " (Coded the meta).)<br />" +
			"- " + SG.nameColor('Insist', true) + " (Custom Abilties/Items Programmer + Entries)<br />" +
			"- " + SG.nameColor('VXN', true) + " (Developments)<br />" +
			"<u><b>Special Thanks:</b></u><br />" +
			"- Our Staff Members for their cooperation in making this.<br />";
		user.popup(popup);
	},
};
