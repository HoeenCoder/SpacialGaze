/**
 * Custom avatars plugin.
 *
 * Credits to CreaturePhil and other contributors.
 * See: https://github.com/CreaturePhil/Showdown-Boilerplate/blob/master/chat-plugins/customavatar.js
*/

'use strict';

/* eslint no-restricted-modules: [0] */

const fs = require('fs');
const path = require('path');
const url = require('url');
// The path where custom avatars are stored.
const AVATAR_PATH = path.join(__dirname, '../config/avatars/');

// The valid file extensions allowed.
const VALID_EXTENSIONS = ['.jpg', '.png', '.gif'];

function downloadImage(image_url, name, room, connection) {
	// compose the wget command
	let wget = 'wget -P ' + AVATAR_PATH + ' ' + image_url;
	let exec = require('child_process').exec;
	exec(wget, (error, stdout, stderr) => {
		connection.sendTo(room, ("" + stdout + stderr));
	});
	let file_name = url.parse(image_url).pathname.split('/').pop();
	let ext = path.extname(image_url);
	fs.renameSync((AVATAR_PATH + file_name), (AVATAR_PATH + name + ext), function (err) {
		if (err) console.log('ERROR: ' + err);
	});
}

SG.downloadImage = downloadImage;

function loadCustomAvatars() {
	fs.readdir(AVATAR_PATH, (err, files) => {
		if (err) console.log("Error loading custom avatars: " + err);
		if (!files) files = [];
		files
			.filter(file => VALID_EXTENSIONS.includes(path.extname(file)))
			.forEach(file => {
				let name = path.basename(file, path.extname(file));
				Config.customavatars[name] = file;
			});
	});
}

loadCustomAvatars();

exports.commands = {
	customavatar: {
		set: function (target, room, user, connection) {
			if (!this.can('roomowner')) return false;
			let parts = target.split(',').map(param => param.trim());
			if (parts.length < 2) return this.parse('/help customavatar');

			let name = toId(parts[0]);
			let avatarUrl = parts[1];
			if (!/^https?:\/\//i.test(avatarUrl)) avatarUrl = 'http://' + avatarUrl;
			let ext = path.extname(avatarUrl);

			if (!VALID_EXTENSIONS.includes(ext)) {
				return this.errorReply("Image url must have .jpg, .png, or .gif extension.");
			}

			Config.customavatars[name] = name + ext;

			downloadImage(avatarUrl, name, room, connection);
			this.sendReply("|raw|" + name + "'s avatar was successfully set. Avatar:<br /><img src='" + avatarUrl + "' width='80' height='80'>");
			if (Users(name)) Users(name).popup("|html|" + SG.nameColor(user.name, true) + " set your custom avatar.<br /><center><img src='" + avatarUrl + "' width='80' height='80'></center><br /> Refresh your page if you don\'t see it.");
		},

		remove: 'delete',
		delete: function (target, room, user) {
			if (!this.can('roomowner')) return false;

			let userid = toId(target);
			let image = Config.customavatars[userid];

			if (!image) return this.errorReply(target + " does not have a custom avatar.");

			delete Config.customavatars[userid];
			fs.unlink(AVATAR_PATH + image, err => {
				if (err && err.code === 'ENOENT') {
					this.errorReply(target + "'s avatar does not exist.");
				} else if (err) {
					console.error(err);
				}

				if (Users(userid)) Users(userid).popup("|html|" + SG.nameColor(user.name, true) + " has deleted your custom avatar.");
				this.sendReply(target + "'s avatar has been successfully removed.");
			});
		},

		'': 'help',
		help: function (target, room, user) {
			this.parse('/help customavatar');
		},
	},

	customavatarhelp: [
		"Commands for /customavatar are:",
		"/customavatar set [username], [image link] - Set a user's avatar.",
		"/customavatar delete [username] - Delete a user's avatar."],
};
