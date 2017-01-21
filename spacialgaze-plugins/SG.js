'use strict';

let fs = require('fs');
let http = require('http');
const Autolinker = require('autolinker');

let regdateCache = {};

SG.nameColor = function (name, bold) {
	return (bold ? "<b>" : "") + "<font color=" + SG.hashColor(name) + ">" + (Users(name) && Users(name).connected && Users.getExact(name) ? Chat.escapeHTML(Users.getExact(name).name) : Chat.escapeHTML(name)) + "</font>" + (bold ? "</b>" : "");
};
// usage: SG.nameColor(user.name, true) for bold OR SG.nameColor(user.name, false) for non-bolded.

SG.messageSeniorStaff = function (message, pmName, from) {
	pmName = (pmName ? pmName : '~SG Server');
	from = (from ? ' (PM from ' + from + ')' : '');
	Users.users.forEach(curUser => {
		if (curUser.group === '~' || curUser.group === '&') {
			curUser.send('|pm|' + pmName + '|' + curUser.getIdentity() + '|' + message + from);
		}
	});
};
// format: SG.messageSeniorStaff('message', 'person')
//
// usage: SG.messageSeniorStaff('Mystifi is a confirmed user and they were banned from a public room. Assess the situation immediately.', '~Server')
//
// this makes a PM from ~Server stating the message

SG.regdate = function (target, callback) {
	target = toId(target);
	if (regdateCache[target]) return callback(regdateCache[target]);
	let options = {
		host: 'pokemonshowdown.com',
		port: 80,
		path: '/users/' + target + '.json',
		method: 'GET',
	};
	http.get(options, function (res) {
		let data = '';
		res.on('data', function (chunk) {
			data += chunk;
		}).on('end', function () {
			data = JSON.parse(data);
			let date = data['registertime'];
			if (date !== 0 && date.toString().length < 13) {
				while (date.toString().length < 13) {
					date = Number(date.toString() + '0');
				}
			}
			if (date !== 0) {
				regdateCache[target] = date;
				saveRegdateCache();
			}
			callback((date === 0 ? false : date));
		});
	});
};

/*SG.setTitle = function (userid, title, callback) {
	userid = toId(userid);
	SG.database.all("SELECT * FROM users WHERE userid=$userid", {$userid: userid}, function (err, rows) {
		if (rows.length < 1) {
			SG.database.run("INSERT INTO users(userid, title) VALUES ($userid, $title)", {$userid: userid, $title: title}, function (err) {
				if (err) return console.log(err);
				if (callback) return callback();
			});
		} else {
			SG.database.run("UPDATE users SET title=$title WHERE userid=$userid", {$title: title, $userid: userid}, function (err) {
				if (err) return console.log(err);
				if (callback) return callback();
			});
		}
	});
};

SG.getTitle = function (userid, callback) {
	if (!callback) return false;
	userid = toId(userid);
	SG.database.all("SELECT title FROM users WHERE userid=$userid", {$userid: userid}, function (err, rows) {
		if (err) return console.log(err);
		callback(((rows[0] && rows[0].title) ? rows[0].title : ""));
	});
};*/

SG.parseMessage = function (message) {
	if (message.substr(0, 5) === "/html") {
		message = message.substr(5);
		message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // italics
		message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>'); // bold
		message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>'); // strikethrough
		message = message.replace(/&lt;&lt;([a-z0-9-]+)&gt;&gt;/g, '&laquo;<a href="/$1" target="_blank">$1</a>&raquo;'); // <<roomid>>
		message = Autolinker.link(message.replace(/&#x2f;/g, '/'), {stripPrefix: false, phone: false, twitter: false});
		return message;
	}
	message = Chat.escapeHTML(message).replace(/&#x2f;/g, '/');
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // italics
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>'); // bold
	message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>'); // strikethrough
	message = message.replace(/&lt;&lt;([a-z0-9-]+)&gt;&gt;/g, '&laquo;<a href="/$1" target="_blank">$1</a>&raquo;'); // <<roomid>>
	message = Autolinker.link(message, {stripPrefix: false, phone: false, twitter: false});
	return message;
};

SG.randomString = function (length) {
	return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

SG.reloadCSS = function () {
	const cssPath = 'spacialgaze'; // This should be the server id if Config.serverid doesn't exist. Ex: 'serverid'
	let options = {
		host: 'play.pokemonshowdown.com',
		port: 80,
		path: '/customcss.php?server=' + (Config.serverid || cssPath),
		method: 'GET',
	};
	http.get(options);
};

//Daily Rewards System for SpacialGaze by Lord Haji
SG.giveDailyReward = function (userid, user) {
	if (!user || !userid) return false;
	userid = toId(userid);
	if (!Db('DailyBonus').has(userid)) Db('DailyBonus').set(userid, 1);
	let seen = Db('seen').get(userid);
	if ((Date.now() - seen) < 86400000) return false;
	if ((Date.now() - seen) > 89964000) Db('DailyBonus').set(userid, 1);
	if (Db('DailyBonus').get(userid) === 8) Db('DailyBonus').set(userid, 1);
	Db('currency').set(userid, Db('currency').get(userid) + Db('DailyBonus').get(userid));
	user.send('|popup||wide||html| <center><u><b><font size="3">SpacialGaze Daily Bonus</font></b></u><br>You have been awarded ' + Db('DailyBonus').get(userid) + ' Stardust.<br>' + showDailyRewardAni(userid) + ' <br>Because you are on your ' + Db('DailyBonus').get(userid) + ' Streak.<br>Come Everyday to collect Stardust.(It gets reset every 7 days or if you do not come everyday.)</center>');
	Db('DailyBonus').set(userid, (Db('DailyBonus').get(userid) + 1));		
};


// last two functions needed to make sure SG.regdate() fully works
function loadRegdateCache() {
	try {
		regdateCache = JSON.parse(fs.readFileSync('config/regdate.json', 'utf8'));
	} catch (e) {}
}
loadRegdateCache();

function saveRegdateCache() {
	fs.writeFileSync('config/regdate.json', JSON.stringify(regdateCache));
}

function showDailyRewardAni(userid) {
	userid = toId(userid);
	let streak = Db('DailyBonus').get(userid);
	let output = '';
	for(let i = 1; i <= streak; i++) {
		output += "<img src='http://i.imgur.com/ZItWCLB.png' width='16' height='16'> ";
	}
	return output;
}
