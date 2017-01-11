/*
* News System for SpacialGaze
* Credits: Lord Haji
*/

'use strict';

let moment = require('moment');

function generateNews() {
	let newsData, newsDisplay = [];
	Object.keys(Db('news').object()).forEach(announcement => {
		newsData = Db('news').get(announcement);
		newsDisplay.push(`<h4>${announcement}</h4>${newsData[1]}<br /><br />—${SG.nameColor(newsData[0], true)} <small>on ${newsData[2]}</small>`);
	});
	return newsDisplay;
}

function hasSubscribed(user) {
	if (typeof user === 'object') user = user.userid;
	if (Db('NewsUnsubscribers').get(toId(user)) === 1) return false;
	return true;
}

SG.showNews = function (user) {
	if (!Users(user)) return false;
	let newsDisplay = generateNews();
	if (newsDisplay.length === 0) return false;
	if (!hasSubscribed(user)) return false;
	if (newsDisplay.length > 0) {
		newsDisplay = newsDisplay.join('<hr>');
		return Users(user).send(`|pm| SpacialGaze News|${Users(user).getIdentity()}|/raw ${newsDisplay}`);
	}
};

exports.commands = {
	news: 'serverannouncements',
	announcements: 'serverannouncements',
	serverannouncements: {
		'': 'view',
		display: 'view',
		view: function (target, room, user) {
			return user.send('|popup||wide||html|' +
				"<center><strong>Current server announcements:</strong></center>" +
					generateNews().join('<hr>')
			);
		},
		remove: 'delete',
		delete: function (target, room, user) {
			if (!this.can('ban')) return false;
			if (!target) return this.parse('/help serverannouncements');
			if (!Db('news').has(target)) return this.errorReply("News doesn't exitst");
			Db('news').delete(target);
			this.privateModCommand(`(${user.name} deleted server announcement titled: ${target}.)`);
		},
		add: function (target, room, user) {
			if (!this.can('ban')) return false;
			if (!target) return this.parse('/help serverannouncements');
			let parts = target.split(',');
			if (parts.length !== 2) return this.errorReply("Usage: /news add [title], [desc]");
			let title = parts[0], desc = parts[1], postedBy = user.name;
			let postTime = moment(Date.now()).format("MMM D, YYYY");
			Db('news').set(title, [postedBy, desc, postTime]);
			this.privateModCommand(`(${user.name} added server announcement: ${parts[0]})`);
		},
		subscribe: function (target, room, user) {
			if (!this.can('talk')) return false;
			if (hasSubscribed(user.userid)) return this.errorReply("You are alreading subscribing SpacialGaze News.");
			Db('NewsUnsubscribers').delete(user.userid);
			this.sendReply("You have subscribed SpacialGaze News.");
			this.sendReply("You will receive SpacialGaze News automatically once you connect to the SpacialGaze next time.");
		},
		unsubscribe: function (target, room, user) {
			if (!this.can('talk')) return false;
			if (!hasSubscribed(user.userid)) return this.errorReply("You have not subscribed to SpacialGaze News.");
			Db('NewsUnsubscribers').set(user.userid, 1);
			this.sendReply("You have unsubscribed SpacialGaze News.");
			this.sendReply("You will no longer automatically receive SpacialGaze News.");
		},
	},
	serverannouncementshelp: ["/news view - Views current SpacialGaze news.",
		"/news delete [news title] - Deletes announcement with the [title]. Requires @, &, ~",
		"/news add [news title], [news desc] - Adds news [news]. Requires @, &, ~",
		"/news subscribe - Subscribes to SpacialGaze News.",
		"/news unsubscribe - Unsubscribes to SpacialGaze News.",
	],
};
