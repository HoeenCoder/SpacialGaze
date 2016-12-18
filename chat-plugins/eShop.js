/******************************
    Default shop setup
    for spacialgaze.psim.us
    coded by HoeenHero
    Refactored by Lord Haji
    -----------------------
    THIS IS NOT THE SAME AS
    THE PRIVATE SHOP ON SG
******************************/
'use strict';

const fs = require('fs');
let allowThisShop = false; //Change to true to make these command work
let writeJSON = true;
SG.eShop = {};

function NewItem(name, desc, price, isSSB) {
	this.name = name;
	this.id = toId(name);
	this.desc = Chat.escapeHTML(desc);
	this.price = Number(price);
	this.isSSB = Boolean(isSSB);
}

function writeShop() {
	if (!writeJSON) return false; //Prevent corruptions
	fs.writeFile('config/eShop.json', JSON.stringify(SG.eShop));
}

function shopDisplay() {
	let output = '<div style="max-height:300px; width: 100%; overflow: scroll"><table style="border:2px solid #101ad1; border-radius: 5px; width: 100%;"><tr><th colspan="3" style="border: 2px solid #070e96; border-radius: 5px">Server Shop</th></tr>';
	for (let i in SG.eShop) {
		if (!SG.eShop[i]) continue;
		output += '<tr><td style="border: 2px solid #070e96; width: 20%; text-align: center"><button name="send" value="/eshop buy ' + SG.eShop[i].id + '">' + SG.eShop[i].name + '</button></td><td style="border: 2px solid #070e96; width: 70%; text-align: center">' + SG.eShop[i].desc + '</td><td style="border: 2px solid #070e96; width: 10%; text-align: center">' + SG.eShop[i].price + '</td></tr>';
	}
	output += '</table></div>';
	return output;
}

try {
	fs.accessSync('config/eShop.json', fs.F_OK);
	let raw = JSON.parse(fs.readFileSync('config/eShop.json', 'utf8'));
	SG.eShop = raw;
} catch (e) {
	fs.writeFile('config/eShop.json', "{}", function (err) {
		if (err) {
			console.error('Error while loading eShop: ' + err);
			SG.eShop = {
				closed: true,
			};
			writeJSON = false;
		} else {
			console.log("config/eShop.json not found, creating a new one...");
		}
	});
}

//Usage notification
try {
	fs.accessSync('chat-plugins/shop.js', fs.F_OK);
	if (allowThisShop) console.warn('Since the normal shop is up the eShop has been disabled.');
	allowThisShop = false;
} catch (e) {
	if (!allowThisShop) console.warn('Unable to find the normal shop, activating the eShop...');
	allowThisShop = true;
}

exports.commands = {	
	//shop: 'eshop', //Uncomment this if you want this to be able to be used using the /shop command
	eshop: {
		add: function (target, room, user, connection, cmd, message) {
			if (!this.can('roomowner')) return false;
			if (Shop.closed) return this.sendReply('An error closed the shop.');
			target = target.split(',');
			if (!target[2]) return this.parse('/shop help');
			if (Shop[toId(target[0])]) return this.errorReply(target[0] + ' is already in the shop.');
			if (isNaN(Number(target[2]))) return this.parse('/shop help');
			Shop[toId(target[0])] = new NewItem(target[0], target[1], target[2]);
			writeShop();
			return this.sendReply('The item ' + target[0] + ' was added.');
		},
		delete: 'remove',
		remove: function (target, room, user, connection, cmd, message) {
			if (!this.can('roomowner')) return false;
			if (Shop.closed) return this.sendReply('An error closed the shop.');
			if (!target) return this.parse('/shop help');
			if (!Shop[toId(target)]) return this.errorReply(target + ' is not in the shop.');
			delete Shop[toId(target)];
			writeShop();
			return this.sendReply('The item ' + target + ' was removed.');
		},
		buy: function (target, room, user, connection, cmd, message) {
			if (!target) return this.parse('/shop help buy');
			if (Shop.closed) return this.sendReply('The shop is closed, come back later.');
			if (!Shop[toId(target)]) return this.errorReply('Item ' + target + ' not found.');
			let item = Shop[toId(target)];
			if (item.price > Db('money').get(user.userid)) return this.errorReply("You don't have you enough money for this. You need " + (item.price - Db('money').get(user.userid)) + SG.currencyName((item.price - Db('money').get(user.userid))) + " more to buy this.");
			Db('money').set(user.userid, Db('money').get(user.userid) - item.price);
			SG.logMoney(user.name + " has purchased " + item.name + " from the shop for " + item.price + " and " + user.name + " now has " + Db('money').get(user.userid) + SG.currencyName(Db('money').get(user.userid)) + ".");
			if (item.id === 'customsymbol') {
				user.canCustomSymbol = true;
			}
			let msg = '**' + user.name + " has bought " + item.name + ".** for " + item.price + SG.currencyName(item.price) + " and now has " + Db('money').get(user.userid) + SG.currencyName(Db('money').get(user.userid)) + ".";
			Rooms.rooms.get("staff").add('|c|~Shop Alert|' + msg);
			Rooms.rooms.get("staff").update();
			Users.users.forEach(function (user) {
				if (user.group === '~' || user.group === '&') {
					user.send('|pm|~Shop Alert|' + user.getIdentity() + '|' + msg);
				}
			});
			user.sendTo(room, "|uhtmlchange|shop" + user.userid + "|<div style='max-height:300px'><table style='border:2px solid #000000; border-radius: 5px'><tr><th colspan='3' style='border: 2px solid #000000; border-radius: 5px'>Server Shop</th></tr><tr><td style='colspan: 3; border: 2px solid #000000; border-radius: 5px'><center>You have purchased a " + item.name + ". " + (item.id === 'customsymbol' ? "You may now use /customsymbol [symbol] to change your symbol." : "Upper staff have been notified of your purchase and will contact you shortly.") + "</center></td></tr><tr><td colspan='3' style='text-align:center'><button class='button' name='send' value='/shop reopen'>Return to Shop</button></td></tr></table>");
		},
		help: function (target, room, user, connection, cmd, message) {
			let reply = '<b>Shop commands</b><br/>';
			reply += '/shop - Load the shop screen.<br/>';
			reply += '/shop buy [item] - Buy an item from the shop.<br/>';
			if (user.can('roomowner')) {
				reply += '<b>Administrative shop commands:</b><br/>';
				reply += '/shop add [item name], [description], [price] - Adds a item to the shop.<br/>';
				reply += '/shop remove [item] - removes a item from the shop.<br/>';
			}
			return this.sendReplyBox(reply);
		},
		reopen: '',
		'': function (target, room, user, connection, cmd, message) {
			if (cmd === 'reopen') return user.sendTo(room, '|uhtmlchange|Shop' + user.userid + '|' + shopDisplay());
			return user.sendTo(room, '|uhtml|shop' + user.userid + '|' + shopDisplay());
		},
	},

	customsymbol: function (target, room, user) {
		let bannedSymbols = ['!', '|', '‽', '\u2030', '\u534D', '\u5350', '\u223C'];
		for (let u in Config.groups) if (Config.groups[u].symbol) bannedSymbols.push(Config.groups[u].symbol);
		if (!user.canCustomSymbol) return this.errorReply('You need to buy this item from the shop to use.');
		if (!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character');
		if (target.match(/([a-zA-Z ^0-9])/g) || bannedSymbols.indexOf(target) >= 0) {
			return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		this.sendReply('Your symbol is now ' + target + '. It will be saved until you log off for more than an hour, or the server restarts. You can remove it with /resetsymbol');
	},
	customsymbolhelp: ["/customsymbol [symbol] - Get a custom symbol."],

	removesymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.customSymbol) return this.errorReply("You don't have a custom symbol!");
		delete user.customSymbol;
		user.updateIdentity();
		this.sendReply('Your symbol has been removed.');
	},
	resetsymbolhelp: ["/resetsymbol - Resets your custom symbol."],
};
