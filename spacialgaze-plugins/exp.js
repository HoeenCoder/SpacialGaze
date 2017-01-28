'use strict';

/********************************************
*     EXP SYSTEM FOR POKEMON SHOWDOWN	    *
*     	  By Volco and HoeenHero	    *
********************************************/

const DEFAULT_AMOUNT = 0;

function isExp(exp) {
	let numExp = Number(exp);
	if (isNaN(exp)) return "Must be a number.";
	if (String(exp).includes('.')) return "Cannot contain a decimal.";
	if (numExp < 1) return "Cannot be less than one EXP.";
	return numExp;
}
SG.isExp = isExp;

let EXP = SG.EXP = {
	readExp: function (userid, callback) {
		userid = toId(userid);

		let amount = Db.exp.get(userid, DEFAULT_AMOUNT);
		if (typeof callback !== 'function') {
			return amount;
		} else {
			return callback(amount);
		}
	},

	writeExp: function (userid, amount, callback) {
		// In case someone forgot to turn `userid` into an actual ID...
		userid = toId(userid);

		// In case someone forgot to make sure `amount` was a Number...
		amount = Number(amount);
		if (isNaN(amount)) {
			throw new Error("EXP.writeExp: Expected amount parameter to be a Number, instead received " + typeof amount);
		}
		let curTotal = Db.exp.get(userid, DEFAULT_AMOUNT);
		Db.exp.set(userid, curTotal + amount);
		let newTotal = Db.exp.get(userid);
		if (callback && typeof callback === 'function') {
			// If a callback is specified, return `newTotal` through the callback.
			return callback(newTotal);
		}
	},
};

function addExp(user, room, amount) {
	user = Users.getExact(toId(user));
	EXP.readExp(user.userid, totalExp => {
		let oldLevel = SG.level(user);
		EXP.writeExp(user.userid, amount);
		if (!user || !room) return;
		user.sendTo(room, 'You have gained ' + amount + ' EXP.');
		let level = SG.level(user);
		if (oldLevel < level) {
			//let reward;
			let currency;
			if (oldLevel < 3 <= level) {
				//reward = '';
				currency = 3;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 5 <= level) {
				//reward = '';
				currency = 5;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 8 <= level) {
				//reward = '';
				currency = 5;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 10 <= level) {
				//reward = '';
				currency = 7;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 12 <= level) {
				//reward = '';
				currency = 10;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 13 <= level) {
				//reward = '';
				currency = 13;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 17 <= level) {
				//reward = '';
				currency = 17;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (oldLevel < 20 <= level) {
				//reward = '';
				currency = 25;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (level > 20) {
				//reward = '';
				currency = 27;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (level === 2 || level === 4) {
				//reward = "-3 Stardust";
				currency = 3;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			if (level === 6 || level === 7 || level === 9 || level === 11 || level === 14 || level === 16 || level === 15 || level === 16 || level === 18 || level === 19) {
				//reward = "-5 Stardust";
				currency = 5;
				Economy.writeMoney(user.userid, currency, () => {
					Economy.readMoney(user.userid, newAmount => {
						Economy.logTransaction(Chat.escapeHTML(user.userid) + ' has received ' + currency + ' ' + (currency === 1 ? global.currencyName : global.currencyPlural) + ' from a level up.');
					});
				});
				//user.sendTo(room, 'You have earned ' + reward + ' for level up!');
			}
			let newLevel = SG.level(user);
			user.sendTo(room, '|html|<center><font size=4><b><i>Level Up!</i></b></font><br />' +
				'You have reached level ' + newLevel + '.' + /*' This will award you:<br /><b> ' + reward + */'</b></center>'
			);
		}
	});
}
SG.addExp = addExp;

function level(user) {
	let curExp = Db.exp.get(user, 0);
	let benchmarks = [0, 40, 90, 165, 250, 400, 600, 810, 1250, 1740, 2450, 3300, 4400, 5550, 6740, 8120, 9630, 11370, 13290, 15520, 18050, 23000, 28000, 33720, 39900, 46440, 52690, 58000, 63600, 69250, 75070, 81170, 87470, 93970, 100810, 107890, 115270, 122960, 131080, 140000];
	for (let i = 0; i < benchmarks.length; i++) {
		if (curExp >= benchmarks[benchmarks.length - 1]) return "Maxed!";
		if (benchmarks[i] <= curExp) {
			continue;
		} else {
			return i;
		}
	}
}
SG.level = level;

function nextLevel(user) {
	let curExp = Db.exp.get(user, 0);
	let benchmarks = [0, 40, 90, 165, 250, 400, 600, 810, 1250, 1740, 2450, 3300, 4400, 5550, 6740, 8120, 9630, 11370, 13290, 15520, 18050, 23000, 28000, 33720, 39900, 46440, 52690, 58000, 63600, 69250, 75070, 81170, 87470, 93970, 100810, 107890, 115270, 122960, 131080, 140000];
	for (let i = 0; i < benchmarks.length; i++) {
		if (curExp >= benchmarks[benchmarks.length - 1]) return "no more level ups :(";
		if (benchmarks[i] <= curExp) {
			continue;
		} else {
			return benchmarks[i] - curExp + " exp";
		}
	}
}
SG.nextLevel = nextLevel;

exports.commands = {
	level: 'exp',
	xp: 'exp',
	exp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;

		const targetId = toId(target);

		EXP.readExp(targetId, exp => {
			this.sendReplyBox('<b>' + SG.nameColor(targetId, true) + '</b> has ' + exp + ' exp and is level ' + SG.level(targetId) + ' and needs ' + SG.nextLevel(targetId) + ' to reach the next level.');
		});
	},

	givexp: 'giveexp',
	giveexp: function (target, room, user) {
		if (!this.can('roomowner')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help giveexp');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isExp(parts[1]);

		if (amount > 1000) return this.sendReply("You cannot give more than 1,000 exp at a time.");
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
		if (typeof amount === 'string') return this.errorReply(amount);
		if (!Users.get(username)) return this.errorReply("The target user could not be found");


		SG.addExp(uid, this.room, amount);
		this.sendReply(uid + " has received " + amount + ((amount === 1) ? " exp." : " exp."));
	},
	giveexphelp: ["/giveexp [user], [amount] - Give a user a certain amount of exp."],

	resetexp: 'resetxp',
	confirmresetexp: 'resetxp',
	resetxp: function (target, room, user, conection, cmd) {
		if (!target) return this.errorReply('USAGE: /resetxp (USER)');
		let parts = target.split(',');
		let targetUser = parts[0].toLowerCase().trim();
		if (!this.can('roomowner')) return false;
		if (cmd !== 'confirmresetexp') {
			return this.popupReply('|html|<center><button name="send" value="/confirmresetexp ' + targetUser + '"style="background-color:red;height:300px;width:150px"><b><font color="white" size=3>Confirm XP reset of ' + SG.nameColor(targetUser, true) + '; this is only to be used in emergencies, cannot be undone!</font></b></button>');
		}
		Db.exp.set(toId(target), 0);
		if (Users.get(target)) Users.get(target).popup('Your XP was reset by an Administrator. This cannot be undone and nobody below the rank of Administrator can assist you or answer questions about this.');
		user.popup("|html|You have reset the XP of " + SG.nameColor(targetUser, true) + ".");
		Rooms('staff').add('|html|[EXP Monitor] ' + SG.nameColor(user.name, true) + ' has reset the XP of ' + SG.nameColor(target, true));
		room.update();
	},

	xpladder: 'expladder',
	expladder: function (target, room, user) {
		if (!target) target = 10;
		target = Number(target);
		if (isNaN(target)) target = 10;
		if (!this.runBroadcast()) return;
		if (this.broadcasting && target > 10) target = 10; // limit to 10 while broadcasting
		if (target > 500) target = 500;

		let self = this;

		function showResults(rows) {
			let output = '<table border="1" cellspacing ="0" cellpadding="3"><tr><th>Rank</th><th>Name</th><th>EXP!</th></tr>';
			let count = 1;
			for (let u in rows) {
				if (rows[u].amount < 1) continue;
				output += '<tr><td>' + count + '</td><td>' + SG.nameColor(rows[u].name, true) + '</td><td>' + rows[u].amount + '</td></tr>';
				count++;
			}
			self.sendReplyBox(output);
			if (room) room.update();
		}
		let obj = Db.exp.keys().map(function (name) {return {name: name, amount: Db.exp.get(name)};});
		let results = obj.sort(function (a, b) {
			return b.amount - a.amount;
		});
		showResults(results.slice(0, target));
	},

	cleanexp: function (target, room, user) {
		if (!this.can('root')) return this.errorReply("/cleanexp - Access denied.");
		Db.exp.keys().filter(key =>	Db.exp.get(key) < 1).forEach(key => Db.exp.remove(key));
		this.sendReply("All users who has less than 1 exp total are now removed from the database.");
	},
	cleanexphelp: ["/cleanexp - Cleans exp database by removing users with less than one exp."],

	confirmclearexp: "clearexp",
	clearexp: function (target, room, user, connection, cmd) {
		if (!this.can('root')) return false;
		if (cmd !== 'confirmclearexp') {
			return this.popupReply('|html|<center><button name="send" value="/confirmclearexp"style="background-color:red;height:300px;width:150px"><b><font color="white" size=3>Confirm GLOBAL EXP RESET? this is only to be used in emergencies, cannot be undone!</font></b></button>');
		}
		Db.exp.keys().forEach(key => {
			Db.exp.remove(key);
		});
		user.popup("|html|You have reset the EXP of everyone.");
		Monitor.log('[EXP Monitor] ' + user.name + ' has reset all user EXP.');
	},
};
