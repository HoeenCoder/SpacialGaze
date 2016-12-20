/*
	Credits to Creature Phil
	Code from Showdown-Boilerplate
	See: https://github.com/CreaturePhil/Showdown-Boilerplate/blob/master/chat-plugins/customavatar.js
*/
'use strict';
/*eslint no-restricted-modules: [0]*/

const fs = require('fs');
const path = require('path');
const request = require('request');

const AVATAR_PATH = path.join(__dirname, '../config/avatars/');

function download_image(image_url, name, extension) {
	request
		.get(image_url)
		.on('error', function (err) {
			console.error(err);
		})
		.on('response', function (response) {
			if (response.statusCode !== 200) return;
			const type = response.headers['content-type'].split('/');
			if (type[0] !== 'image') return;

			response.pipe(fs.createWriteStream(AVATAR_PATH + name + extension));
		});
}

function load_custom_avatars() {
	fs.readdir(AVATAR_PATH, function (err, files) {
		if (!files) files = [];
		files
			.filter(function (file) {
				return ['.jpg', '.png', '.gif'].indexOf(path.extname(file)) >= 0;
			})
			.forEach(function (file) {
				const name = path.basename(file, path.extname(file));
				Config.customavatars[name] = file;
			});
	});
}

load_custom_avatars();

exports.commands = {
	customavatar: {
		set: function (target, room, user) {
			if (!this.can('customavatar')) return false;

			const parts = target.split(',');

			if (parts.length < 2) return this.parse('/help customavatar');

			const name = toId(parts[0]);
			let AVATAR_URL = parts[1];
			if (AVATAR_URL.match(/^https?:\/\//i)) AVATAR_URL = 'http://' + AVATAR_URL;
			const ext = path.extname(AVATAR_URL);

			if (!name || !AVATAR_URL) return this.parse('/help customavatar');
			if (['.jpg', '.png', '.gif'].indexOf(ext) < 0) {
				return this.errorReply("Image url must have .jpg, .png, or .gif extension.");
			}

			Config.customavatars[name] = name + ext;

			download_image(AVATAR_URL, name, ext);
			this.sendReply("|raw|" + name + "'s avatar has been set to: <img src='" + AVATAR_URL + "' width='80' height='80'> Successfully. ");
			Users.get(name).popup("|html|" + SG.nameColor(user.name, true) + " set your custom avatar.<br /><center><img src='" + AVATAR_URL + "' width='80' height='80'></center><br /> Refresh your page if you don\'t see it.");
		},

		remove: 'delete',
		delete: function (target, room, user) {
			if (!this.can('customavatar')) return false;

			const userid = toId(target);
			const image = Config.customavatars[userid];

			if (!image) {
				return this.errorReply(userid + " does not have a custom avatar");
			}

			delete Config.customavatars[userid];

			fs.unlink(AVATAR_PATH + image, function (err) {
				if (err && err.code === 'ENOENT') {
					this.errorReply(userid + "'s avatar does not exist.");
				} else if (err) {
					console.error(err);
				}
				Users.get(userid).popup("|html|" + SG.nameColor(user.name, true) + " has deleted your Custom Avatar.");
				this.sendReply(userid + "'s avatar has been successfully removed.");
			}.bind(this));
		},

		'': 'help',
		help: function (target, room, user) {
			this.parse('/help customavatar');
		},
	},
	customavatarhelp: ["Commands for /customavatar are:",
		"/customavatar set [username], [image link] - Set a user's avatar.",
		"/customavatar delete [username] - Delete a user's avatar."],
};
