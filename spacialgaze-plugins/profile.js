/**
 * profile.js
 * Displays to users a profile of a given user.
 * For order's sake:
 * - vip, dev, customtitle, friendcode, and profie were placed in here.
 * Updated and restyled by Mystifi; main profile restyle goes out to panpawn/jd/other contributors.
 **/
'use strict';
//TODO reimplement geoip-ultralight

//let fs = require('fs');
let moment = require('moment');
//let geoip = require('geoip-ultralight');

// fill in '' with the server IP
let serverIp = Config.serverIp;
//geoip.startWatchingDataUpdate();


function isVIP(userid) {
	if (!userid) return;
	// We shouldn't be passing user objects in here, but just in case...
	if (typeof userid === 'object' && ('userid' in userid)) userid = userid.userid;
	let vip = Db('vips').get(userid);

	if (vip === 1) return true;
	return false;
}


function isDev(userid) {
	if (!userid) return;
	// We shouldn't be passing user objects in here, but just in case...
	if (typeof userid === 'object' && ('userid' in userid)) userid = userid.userid;
	let dev = Db('devs').get(userid);

	if (dev === 1) return true;
	return false;
}

function formatTitle(userid) {
	if (Db('customtitles').has(userid) && Db('titlecolors').has(userid)) {
		return '<font color="' + Db('titlecolors').get(userid) + '">(<b>' + Db('customtitles').get(userid) + '</b>)</font>';
	}
	return '';
}

function titleCheck(userid) {
	if (Db('customtitles').has(userid) && Db('titlecolors').has(userid)) {
		return formatTitle(userid);
	}
	return '';
}

function devCheck(userid) {
	if (isDev(userid)) return '<font color="#009320">(<b>Developer</b>)</font>';
	return '';
}

function vipCheck(userid) {
	if (isVIP(userid)) return '<font color="#6390F0">(<b>VIP User</b>)</font>';
	return '';
}

function formatProfile(userid) {
	let background = Db('profilebackgrounds').get(userid);
	let colorHex = Db('profiletextcolors').get(userid);
	let cursor = Db('profilecursors').get(userid);
	return '<div style="background:url(' + background + '); cursor:url(' + cursor + ') , auto ; color:' + colorHex + ';">';
}

function showAcePokemon(userid) {
	if (!Db('aces').has(userid)) return '';
	let ace = Db('aces').get(userid);
	let api = "http://play.pokemonshowdown.com/sprites/xyani/";
	let ACE_IMG = api + ace + ".gif";
	return "<img src='" + ACE_IMG + "' style='float:right'>";
}

function showPokemonGOTeam(userid) {
	let output = '';
	let pokemongoteam = Db('pokemongoteams').get(userid, false);
	if (!pokemongoteam) return '';
	switch (pokemongoteam) {
	case 'instinct':
		output += '<font color="yellow"><b>Instinct</b></font><img src="http://www.pokemondecals.co.uk/wp-content/uploads/2016/07/team-instinct-cutout.png" width="16" height="16">';
		break;
	case 'mystic':
		output += '<font color="blue"><b>Mystic</b></font><img src="https://jackaloupe.files.wordpress.com/2016/07/team-mystic-cutout1.png" width="16" height="16">';
		break;
	case 'valor':
		output += '<font color="red"><b>Valor</b></font><img src="https://jackaloupe.files.wordpress.com/2016/07/team-valor-cutout.png" width="16" height="16">';
		break;
	default:
		// If this happens, someone manually edited the Db object...
		return '';
	}
	return '&nbsp;<div style="display:inline-block;height:5px;width:80px;"></div><font color="#24678d"><b>Pokémon GO Team: </b></font>' + output + '<br />';
}

function showBadges(userid) {
	if (Db('userBadges').has(userid)) {
		let badges = Db('userBadges').get(userid);
		let css = 'border: none; background: none; padding: 0;';
		if (typeof badges !== 'undefined' && badges !== null) {
			let output = '<td><div style="float: right; background: rgba(69, 76, 80, 0.4); text-align: center; border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset; margin: 0px 3px;">';
			output += ' <table style="' + css + '"> <tr>';
			for (let i = 0; i < badges.length; i++) {
				if (i !== 0 && i % 4 === 0) output += '</tr> <tr>';
				output += '<td><button style="' + css + '" name="send" value="/badges info, ' + badges[i] + '">' +
				'<img src="' + Db('badgeData').get(badges[i])[1] + '" height="16" width="16" alt="' + badges[i] + '" title="' + badges[i] + '" >' + '</button></td>';
			}
			output += '</tr> </table></div></td>';
			return output;
		}
	}
	return '';
}

function lastActive(userid) {
	if (!Users(userid)) return false;
	userid = Users(userid);
	return (userid && userid.lastMessageTime ? moment(userid.lastMessageTime).fromNow() : "hasn't talked yet");
}

function getLastSeen(userid) {
	if (Users(userid) && Users(userid).connected) {
		return '&nbsp;<font color="#24678d"><b>Last Active:</b></font>' + lastActive(userid) + '<br />';
	}
	let seen = Db('seen').get(userid);
	if (!seen) return '&nbsp;<font color="#24678d"><b>Last Seen:</b></font> <b><font color="red">Never</font></b><br />';
	return '&nbsp;<font color="#24678d"><b>Last Seen:</b></font> ' + moment(seen).fromNow() + '<br />';
}

/*
function getLeague(userid) {
	return false; //TEMPORARY
	//return SG.getLeague(userid);
}

function getLeagueRank(userid) {
	return 'N/A';
}
*/

/*
function loadRegdateCache() {
	try {
		regdateCache = JSON.parse(fs.readFileSync('config/regdate.json', 'utf8'));
	} catch (e) {}
}
loadRegdateCache();
function saveRegdateCache() {
	fs.writeFileSync('config/regdate.json', JSON.stringify(regdateCache));
}
*/

exports.commands = {
	vip: {
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let vipUsername = toId(target);
			if (vipUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (isVIP(vipUsername)) return this.errorReply(vipUsername + " is already a VIP user.");
			Db('vips').set(vipUsername, 1);
			this.sendReply(vipUsername + " has been given VIP status.");
			if (Users.get(vipUsername)) Users(vipUsername).popup("You have been given VIP status by " + user.name + ".");
		},
		take: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let vipUsername = toId(target);
			if (vipUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (!isVIP(vipUsername)) return this.errorReply(vipUsername + " isn't a VIP user.");
			Db('vips').delete(vipUsername);
			this.sendReply(vipUsername + " has been demoted from VIP status.");
			if (Users.get(vipUsername)) Users(vipUsername).popup("You have been demoted from VIP status by " + user.name + ".");
		},
		'': 'help',
		help: function (target, room, user) {
			this.sendReplyBox(
				'<div style="padding: 3px 5px;"><center>' +
				'<code>/vip</code> commands.<br />These commands are nestled under the namespace <code>vip</code>.</center>' +
				'<hr width="100%">' +
				'<code>give [username]</code>: Gives <code>username</code> VIP status. Requires: & ~' +
				'<br />' +
				'<code>take [username]</code>: Takes <code>username</code>\'s VIP status. Requires: & ~' +
				'</div>'
			);
		},
	},

	dev: {
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let devUsername = toId(target);
			if (devUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (isDev(devUsername)) return this.errorReply(devUsername + " is already a DEV user.");
			Db('devs').set(devUsername, 1);
			this.sendReply(devUsername + " has been given DEV status.");
			if (Users.get(devUsername)) Users(devUsername).popup("You have been given DEV status by " + user.name + ".");
		},
		take: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let devUsername = toId(target);
			if (devUsername.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
			if (!isDev(devUsername)) return this.errorReply(devUsername + " isn't a DEV user.");
			Db('devs').delete(devUsername);
			this.sendReply(devUsername + " has been demoted from DEV status.");
			if (Users.get(devUsername)) Users(devUsername).popup("You have been demoted from DEV status by " + user.name + ".");
		},
		'': 'help',
		help: function (target, room, user) {
			this.sendReplyBox(
				'<div style="padding: 3px 5px;"><center>' +
				'<code>/dev</code> commands.<br />These commands are nestled under the namespace <code>dev</code>.</center>' +
				'<hr width="100%">' +
				'<code>give [username]</code>: Gives <code>username</code> DEV status. Requires: & ~' +
				'<br />' +
				'<code>take [username]</code>: Takes <code>username</code>\'s DEV status. Requires: & ~' +
				'</div>'
			);
		},
	},

	title: 'customtitle',
	customtitle: {
		set: 'give',
		give: function (target, room, user) {
			if (!this.can('declare')) return false;
			target = target.split(',');
			if (!target || target.length < 3) return this.parse('/help', true);
			let userid = toId(target[0]);
			let title = target[1].trim();
			if (Db('customtitles').has(userid) && Db('titlecolors').has(userid)) {
				return this.errorReply(userid + " already has a custom title.");
			}
			let color = target[2].trim();
			if (color.charAt(0) !== '#') return this.errorReply("The color needs to be a hex starting with '#'.");
			Db('titlecolors').set(userid, color);
			Db('customtitles').set(userid, title);
			if (Users(userid)) {
				Users(userid).popup(
					'|html|You have recieved a custom title from ' + SG.nameColor(user.name, true) + '.' +
					'<br />Title: ' + formatTitle(userid) +
					'<br />Title Hex Color: ' + Db('titlecolors').get(userid)
				);
			}
			this.logModCommand(user.name + " set a custom title to " + userid + "'s profile.");
			return this.sendReply("Title '" + title + "' and color '" + color + "' for " + userid + "'s custom title have been set.");
		},
		take: 'remove',
		remove: function (target, room, user) {
			if (!this.can('declare')) return false;
			if (!target) return this.parse('/help', true);
			let userid = toId(target);
			if (!Db('customtitles').has(userid) && !Db('titlecolors').has(userid)) {
				return this.errorReply(userid + " does not have a custom title set.");
			}
			Db('titlecolors').delete(userid);
			Db('customtitles').delete(userid);
			if (Users.get(userid)) {
				Users(userid).popup('|html|' + SG.nameColor(user.name, true) + " has removed your custom title.");
			}
			this.logModCommand(user.name + " removed " + userid + "'s custom title.");
			return this.sendReply(userid + "'s custom title and title color were removed from the server memory.");
		},
		'': 'help',
		help: function (target, room, user) {
			if (!user.autoconfirmed) return this.errorReply("You need to be autoconfirmed to use this command.");
			if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");
			if (!this.runBroadcast()) return;
			let help = '<center><code>/customtitle</code> commands<br />' +
				'All commands are nestled under the namespace <code>customtitle</code>.</center>' +
				'<hr width="100%">' +
				'- <code>[set|give] [username], [title], [hex color]</code>: Sets a user\'s custom title. Requires: & ~' +
				'- <code>[take|remove] [username]</code>: Removes a user\'s custom title and erases it from the server. Requires: & ~';
			return this.sendReplyBox(help);
		},
	},

	fc: 'friendcode',
	friendcode: {
		add: 'set',
		set: function (target, room, user) {
			if (room.battle) return this.errorReply("Please use this command outside of battle rooms.");
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			if (!target) return this.parse('/help', true);
			let fc = target;
			fc = fc.replace(/-/g, '');
			fc = fc.replace(/ /g, '');
			if (isNaN(fc)) {
				return this.errorReply("Your friend code needs to contain only numerical characters.");
			}
			if (fc.length < 12) return this.errorReply("Your friend code needs to be 12 digits long.");
			fc = fc.slice(0, 4) + '-' + fc.slice(4, 8) + '-' + fc.slice(8, 12);
			Db('friendcodes').set(user.userid, fc);
			return this.sendReply("Your friend code: " + fc + " has been saved to the server.");
		},
		remove: 'delete',
		delete: function (target, room, user) {
			if (room.battle) return this.errorReply("Please use this command outside of battle rooms.");
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			if (!target) {
				if (!Db('friendcodes').has(user.userid)) return this.errorReply("Your friend code isn't set.");
				Db('friendcodes').delete(user.userid);
				return this.sendReply("Your friend code has been deleted from the server.");
			} else {
				if (!this.can('lock')) return false;
				let userid = toId(target);
				if (!Db('friendcodes').has(userid)) return this.errorReply(userid + " hasn't set a friend code.");
				Db('friendcodes').delete(userid);
				return this.sendReply(userid + "'s friend code has been deleted from the server.");
			}
		},
		'': 'help',
		help: function (target, room, user) {
			if (room.battle) return this.errorReply("Please use this command outside of battle rooms.");
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			let help = '<center><code>/friendcode</code> commands<br />' +
				'All commands are nestled under the namespace <code>friendcode</code>.</center>' +
				'<hr width="100%">' +
				'<code>[add|set] [code]</code>: Sets your friend code. Must be in the format 111111111111, 1111 1111 1111, or 1111-1111-1111.' +
				'<br />' +
				'<code>[remove|delete]</code>: Removes your friend code. Global staff can include <code>[username]</code> to delete a user\'s friend code.' +
				'<br />' +
				'<code>help</code>: Displays this help command.';
			return this.sendReplyBox(help);
		},
	},

	pokemongoteam: {
		join: 'set',
		set: function (target, room, user) {
			if (!user.autoconfirmed) return this.errorReply("You must be autoconfirmed to use this command.");
			target = toId(target);
			if (!target) return this.sendReply("/pokemongoteam [instinct|valor|mystic]: Sets your Pokemon GO team to either Instinct, Mystic, or Valor.");
			let validTeams = ['instinct', 'mystic', 'valor'];
			if (!validTeams.includes(target)) return this.errorReply(`Invalid team. Options are: ${validTeams.join(', ')}.`);
			Db('pokemongoteams').set(user.userid, target);
			return this.sendReply("Your Pokemon GO team was set to " + target + ". You can now see it displayed in your profile.");
		},
		leave: 'remove',
		remove: function (target, room, user) {
			target = toId(target);
			if (!target) {
				target = user.userid;
				if (!Db('pokemongoteams').has(target)) return this.errorReply("You aren't currently in a Pokemon GO team.");
				Db('pokemongoteams').delete(target);
				return this.sendReply("You successfully removed your Pokemon GO team. It will no longer be displayed in your profile.");
			} else {
				if (!this.can('declare')) return this.errorReply("You don't have the sufficient rank to remove someone else's Pokemon GO team.");
				if (!Db('pokemongoteams').has(target)) return this.errorReply("The specified user isn't currently in a Pokemon GO team.");
				Db('pokemongoteams').delete(target);
				return this.sendReply(`You successfully removed ${target} from their Pokemon GO team. It will no longer be displayed in their profile.`);
			}
		},
	},

	setbackground:'setprofilebackground',
	setprofilebackground : function (target, room, user) {
		if (!this.can('roomowner')) return false;
		let parts = target.split(',');
		if (!parts[1]) return this.parse('/help setprofilebackground');
		let targetUser = parts[0].toLowerCase().trim();
		let IMG_URL = parts[1].trim();
		Db('profilebackgrounds').set(targetUser, IMG_URL);
		this.sendReply(targetUser + '\'s custom profile background has been set.');
		this.parse('/profile ' + targetUser);
	},

	deletebackground: 'deleteprofilebackground',
	deleteprofilebackground: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help deleteprofilebackground');
		let targetUser = target.toLowerCase().trim();
		if (!Db('profilebackgrounds').has(targetUser)) return this.errorReply('This user does not have a custom background.');
		Db('profilebackgrounds').delete(targetUser);
		this.sendReply(target + '\'s background was deleted.');
	},

	setprofiletextcolor: 'settext',
	settextcolor:'settext',
	settext : function (target, room, user) {
		if (!this.can('roomowner')) return false;
		let parts = target.split(',');
		if (!parts[1]) return this.parse('/help settext');
		let targetUser = parts[0].toLowerCase().trim();
		let colorHex = parts[1].trim();
		Db('profiletextcolors').set(targetUser, colorHex);
		this.sendReply(targetUser + '\'s custom profile text color has been set to : ' + colorHex);
		this.parse('/profile ' + targetUser);
	},

	deleteprofiletextcolor: 'deletetext',
	deletetextcolor: 'deletetext',
	deletetext: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help deletetext');
		let targetUser = target.toLowerCase().trim();
		if (!Db('profiletextcolors').has(targetUser)) return this.errorReply('This user does not have a custom profile text color.');
		Db('profiletextcolors').delete(targetUser);
		this.sendReply(target + '\'s custom profile text color was deleted.');
	},

	setprofilecursor: 'setcursor',
	setcustomprofilecursor:'setcursor',
	setcursor : function (target, room, user) {
		if (!this.can('roomowner')) return false;
		let parts = target.split(',');
		if (!parts[1]) return this.parse('/help setcursor');
		let targetUser = parts[0].toLowerCase().trim();
		let CURSOR_URL = parts[1].trim();
		Db('profilecursors').set(targetUser, CURSOR_URL);
		this.sendReply(targetUser + '\'s custom profile text color has been set.');
		this.parse('/profile ' + targetUser);
	},

	deleteprofilecursor: 'deletecursor',
	deletecustomprofilecursor: 'deletecursor',
	deletecursor: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help deletecursor');
		let targetUser = target.toLowerCase().trim();
		if (!Db('profilecursors').has(targetUser)) return this.errorReply('This user does not have a custom profile text color.');
		Db('profilecursors').delete(targetUser);
		this.sendReply(target + '\'s custom profile text color was deleted.');
	},

	setace:'setacepokemon',
	setacepokemon : function (target, room, user) {
		if (!this.can('roomowner')) return false;
		let parts = target.split(',');
		if (!parts[1]) return this.parse('/help setacepokemon');
		let targetUser = parts[0].toLowerCase().trim();
		let ace = parts[1].trim().toLowerCase();
		Db('aces').set(targetUser, ace);
		this.sendReply(targetUser + '\'s ace has been set.');
		this.parse('/profile ' + targetUser);
	},

	deleteace: 'deleteacepokemon',
	deleteacepokemon: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target) return this.parse('/help deleteacepokemon');
		let targetUser = target.toLowerCase().trim();
		if (!Db('aces').has(targetUser)) return this.errorReply('This user does not have a ace.');
		Db('aces').delete(targetUser);
		this.sendReply(target + '\'s background was deleted.');
	},

	profile: function (target, room, user) {
		target = toId(target);
		if (!target) target = user.userid;
		if (target.length > 18) return this.errorReply("Usernames cannot exceed 18 characters.");
		if (!this.runBroadcast()) return;
		let self = this;
		let targetUser = Users.get(target);
		let username = (targetUser ? targetUser.name : target);
		let userid = (targetUser ? targetUser.userid : toId(target));
		let avatar = (targetUser ? (isNaN(targetUser.avatar) ? "http://" + serverIp + ":" + Config.port + "/avatars/" + targetUser.avatar : "http://play.pokemonshowdown.com/sprites/trainers/" + targetUser.avatar + ".png") : (Config.customavatars[userid] ? "http://" + serverIp + ":" + Config.port + "/avatars/" + Config.customavatars[userid] : "http://play.pokemonshowdown.com/sprites/trainers/1.png"));
		if (targetUser && targetUser.avatar[0] === '#') avatar = 'http://play.pokemonshowdown.com/sprites/trainers/' + targetUser.avatar.substr(1) + '.png';
		let userSymbol = (Users.usergroups[userid] ? Users.usergroups[userid].substr(0, 1) : "Regular User");
		let userGroup = (Config.groups[userSymbol] ? 'Global ' + Config.groups[userSymbol].name : "Regular User");
		let regdate = '(Unregistered)';
		SG.regdate(userid, date => {
			if (date) {
				regdate = moment(date).format("MMMM DD, YYYY");
			}
			showProfile();
		});

		function getFlag(flagee) {
			return false;
			/*if (!Users(flagee)) return false;
			let geo = geoip.lookupCountry(Users(flagee).latestIp);
			return (Users(flagee) && geo ? '<img src="https://github.com/kevogod/cachechu/blob/master/flags/' + geo.toLowerCase() + '.png?raw=true" height=10 title="' + geo + '">' : false);
			*/
		}

		function showProfile() {
			Economy.readMoney(userid, currency => {
				let profile = '';
				let css = 'border:none;background:none;padding:0;float:left;';
				profile += formatProfile(userid);
				profile += showBadges(userid);
				profile += '<button style="' + css + '" name="parseCommand" value="/user ' + toId(userid) + '" title="' + toId(userid) + '">' + '<img src="' + avatar + '" height="80" width="80">' + '</button>';
				profile += showAcePokemon(userid);
				if (!getFlag(userid)) {
					profile += '&nbsp;<font color="#24678d"><b>Name:</b></font> ' + SG.nameColor(username, true) + ' ' + titleCheck(username) + '<br />';
				} else {
					profile += '&nbsp;<font color="#24678d"><b>Name:</b></font> ' + SG.nameColor(username, true) + '&nbsp;' + getFlag(userid) + ' ' + titleCheck(username) + '<br />';
				}
				profile += '&nbsp;<font color="#24678d"><b>Group:</b></font> ' + userGroup + ' ' + devCheck(userid) + vipCheck(userid) + '<br />';
				profile += '&nbsp;<font color="#24678d"><b>Registered:</b></font> ' + regdate + '<br />';
				profile += '&nbsp;<font color="#24678d"><b>' + currencyPlural + ':</b></font> ' + currency + '<br />';
				//profile += '&nbsp;<font color="#24678d"><b>League:</b></font> ' + (getLeague(toId(username)) ? (getLeague(toId(username)) + ' (' + getLeagueRank(toId(username)) + ')') : 'N/A') + '<br />';			
				profile += getLastSeen(userid);
				profile += showPokemonGOTeam(userid);				
				if (Db('friendcodes').has(userid)) {
					profile += '&nbsp;<div style="display:inline-block;height:5px;width:80px;"></div><font color="#24678d"><b>Friend Code:</b></font> ' + Db('friendcodes').get(toId(username));
				}
				profile += '<br clear="all">';
				self.sendReplyBox(profile);
				room.update();
			});
		}
	},
};
