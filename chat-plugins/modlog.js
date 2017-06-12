'use strict';

const fs = require('fs');
const path = require('path');
const ProcessManager = require('./../process-manager');
const execSync = require('child_process').execSync;

const MAX_PROCESSES = 1;
const RESULTS_MAX_LENGTH = 100;
const LOG_PATH = '../logs/modlog/';

class ModlogManager extends ProcessManager {
	onMessageUpstream(message) {
		// Protocol:
		// when crashing: 	  "[id]|0"
		// when not crashing: "[id]|1|[results]"
		let pipeIndex = message.indexOf('|');
		let id = +message.substr(0, pipeIndex);

		if (this.pendingTasks.has(id)) {
			this.pendingTasks.get(id)(message.slice(pipeIndex + 1));
			this.pendingTasks.delete(id);
			this.release();
		}
	}

	onMessageDownstream(message) {
		// protocol:
		// "[id]|[room]|[searchString]|[exactSearch]|[maxLines]"
		let pipeIndex = message.indexOf('|');
		let nextPipeIndex = message.indexOf('|', pipeIndex + 1);
		let id = message.substr(0, pipeIndex);
		let room = message.substr(pipeIndex + 1, nextPipeIndex - pipeIndex - 1);

		pipeIndex = nextPipeIndex;
		nextPipeIndex = message.indexOf('|', pipeIndex + 1);
		let searchString = message.substr(pipeIndex + 1, nextPipeIndex - pipeIndex - 1);

		pipeIndex = nextPipeIndex;
		nextPipeIndex = message.indexOf('|', pipeIndex + 1);
		let exactSearch = message.substr(pipeIndex + 1, nextPipeIndex - pipeIndex - 1);
		let maxLines = message.substr(nextPipeIndex + 1);

		process.send(id + '|' + this.receive(room, searchString, exactSearch, maxLines));
	}

	receive(room, searchString, exactSearch, maxLines) {
		let result;
		exactSearch = exactSearch === '1';
		maxLines = Number(maxLines);
		if (isNaN(maxLines) || maxLines > RESULTS_MAX_LENGTH || maxLines < 1) maxLines = RESULTS_MAX_LENGTH;
		try {
			result = '1|' + runModlog(room, searchString, exactSearch, maxLines);
		} catch (err) {
			require('../crashlogger')(err, 'A modlog query', {
				room: room,
				searchString: searchString,
				exactSearch: exactSearch,
				maxLines: maxLines,
			});
			result = '0';
		}
		return result;
	}
}

exports.ModlogManager = ModlogManager;

const PM = exports.PM = new ModlogManager({
	execFile: __filename,
	maxProcesses: MAX_PROCESSES,
	isChatBased: true,
});

class SortedLimitedLengthList {
	constructor(maxSize) {
		this.maxSize = maxSize;
		this.list = [];
	}

	getListClone() {
		return this.list.slice(0);
	}

	tryInsert(element) {
		let insertedAt = -1;
		for (let i = this.list.length - 1; i >= 0; i--) {
			if (element.localeCompare(this.list[i]) < 0) {
				insertedAt = i + 1;
				if (i === this.list.length - 1) {
					this.list.push(element);
					break;
				}
				this.list.splice(i + 1, 0, element);
				break;
			}
		}
		if (insertedAt < 0) this.list.splice(0, 0, element);
		if (this.list.length > this.maxSize) {
			this.list.splice(-1, 1);
			if (insertedAt === this.list.length) return false;
		}
		return true;
	}
}

function checkRipgrepAvailability() {
	if (Config.ripgrepmodlog === undefined) {
		try {
			execSync(`rg --version`, {cwd: `${__dirname}/${LOG_PATH}`});
			Config.ripgrepmodlog = true;
		} catch (error) {
			Config.ripgrepmodlog = false;
		}
	}
	return Config.ripgrepmodlog;
}

function runModlog(room, searchString, exactSearch, maxLines) {
	const useRipgrep = checkRipgrepAvailability();
	let fileNameList = [];
	if (room === 'all') {
		const fileList = fs.readdirSync(`${__dirname}/${LOG_PATH}`);
		for (let i = 0; i < fileList.length; i++) {
			fileNameList.push(fileList[i]);
		}
	} else if (room === 'public') {
		const isPublicRoom = (room => !(room.isPrivate || room.battle || room.isPersonal || room.id === 'global'));
		const publicRoomIds = Array.from(Rooms.rooms.values()).filter(isPublicRoom).map(room => room.id);
		for (let i = 0; i < publicRoomIds.length; i++) {
			fileNameList.push(`modlog_${publicRoomIds[i]}.txt`);
		}
	} else {
		fileNameList = [`modlog_${room}.txt`];
	}

	let searchStringRegex;
	if (!searchString) {
		searchStringRegex = new RegExp('.');
	} else if (exactSearch) {
		const escapedSearchString = searchString.replace(/\\/g, '\\\\\\\\').replace(/["'`]/g, '\'\\$&\'').replace(/[\{\}\[\]\(\)\$\^\.\?\+\-\*]/g, '[$&]');
		searchStringRegex = new RegExp(escapedSearchString, 'i');
	} else {
		searchString = searchString.replace(/[^a-zA-Z0-9]/, '');
		searchStringRegex = new RegExp(`\\b${searchString.split('').join('\\W*')}\\b`, 'i');
	}

	let results = new SortedLimitedLengthList(maxLines);
	if (useRipgrep && searchString) {
		if (room === 'all') fileNameList = [`${__dirname}/${LOG_PATH}`];
		runRipgrepModlog(fileNameList.join(' '), searchStringRegex.toString().slice(1, -2), results);
	} else {
		fileNameList = fileNameList.map(filename => path.normalize(`${__dirname}/${LOG_PATH}${filename}`));
		for (let i = 0; i < fileNameList.length; i++) {
			checkRoomModlog(fileNameList[i], searchStringRegex, results);
		}
	}
	const resultData = results.getListClone();
	return resultData.join('\n');
}

function checkRoomModlog(path, regex, results) {
	if (!fs.existsSync(path)) return results;
	let newLines = [];
	let lineFragment = '';
	let blockSize = 1024;
	let buf = Buffer.alloc(blockSize);
	const stats = fs.statSync(path);
	let startPos = stats.size;
	const fd = fs.openSync(path, 'r');

	outerLoop: do {
		startPos -= blockSize;
		if (startPos < 0) {
			blockSize += startPos;
			startPos = 0;
		}
		const bytesRead = fs.readSync(fd, buf, 0, blockSize, startPos);
		newLines = buf.toString().substr(0, bytesRead).split('\n').reverse();
		newLines[0] += lineFragment;
		lineFragment = newLines[newLines.length - 1];
		if (startPos > 0) newLines.splice(-1, 1);
		for (let i = 0; i < newLines.length; i++) {
			if (newLines[i] && regex.test(newLines[i])) {
				const insertionSuccessful = results.tryInsert(newLines[i]);
				if (!insertionSuccessful) {
					break outerLoop;
				}
			}
		}
	} while (startPos > 0);

	fs.close(fd);

	return results;
}

function runRipgrepModlog(paths, regexString, results) {
	let stdout;
	try {
		stdout = execSync(`rg -i -e ${regexString} --no-filename --no-line-number ${paths}`, {cwd: `${__dirname}/${LOG_PATH}`});
	} catch (error) {
		return results;
	}
	const fileResults = stdout.toString().split('\n').reverse();
	for (let i = 0; i < fileResults.length; i++) {
		results.tryInsert(fileResults[i]);
	}
	return results;
}

function prettifyResults(rawResults, room, searchString, exactSearch, addModlogLinks, hideIps) {
	if (rawResults === '0') {
		return "The modlog query has crashed.";
	}
	let roomName;
	switch (room) {
	case 'all':
		roomName = "all rooms";
		break;
	case 'public':
		roomName = "all public rooms";
		break;
	default:
		roomName = `room ${room}`;
	}
	if (exactSearch) searchString = `"${searchString}"`;
	let pipeIndex = rawResults.indexOf('|');
	if (pipeIndex < 0) pipeIndex = 0;
	rawResults = rawResults.substr(pipeIndex + 1, rawResults.length);
	if (!rawResults) {
		return `No moderator actions containing ${searchString} found on ${roomName}.` +
				(exactSearch ? "" : " Add quotes to the search parameter to search for a phrase, rather than a user.");
	}
	const resultArray = rawResults.split('\n');
	let lines = resultArray.length;
	const resultString = resultArray.map(line => {
		if (hideIps) line = line.replace(/\([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\)/g, '');
		let bracketIndex = line.indexOf(']');
		let parenIndex = line.indexOf(')');
		if (bracketIndex < 0) return Chat.escapeHTML(line);
		const time = line.slice(1, bracketIndex);
		let timestamp = Chat.toTimestamp(new Date(time), {hour12: true});
		parenIndex = line.indexOf(')');
		let thisRoomID = line.slice(bracketIndex + 3, parenIndex);
		if (addModlogLinks) {
			let url = Config.modloglink(time, thisRoomID);
			if (url) timestamp = `<a href="${url}">${timestamp}</a>`;
		}
		return `<small>[${timestamp}] (${thisRoomID})</small>${Chat.escapeHTML(line.slice(parenIndex + 1))}`;
	}).join(`<br />`);
	let preamble;
	if (searchString) {
		preamble = `|wide||html|<p>The last ${lines} logged actions containing ${searchString} on ${roomName}.` +
						(exactSearch ? "" : " Add quotes to the search parameter to search for a phrase, rather than a user.");
	} else {
		preamble = `|wide||html|<p>The last ${lines} lines of the Moderator Log of ${roomName}.`;
	}
	preamble +=	`</p><p><small>[${Chat.toTimestamp(new Date(), {hour12: true})}] \u2190 current server time</small></p>`;
	return preamble + resultString;
}

exports.commands = {
	timedmodlog: 'modlog',
	modlog: function (target, room, user, connection, cmd) {
		const startTime = Date.now();
		let roomId = (room.id === 'staff' ? 'global' : room.id);
		let hideIps = !user.can('lock');

		if (target.includes(',')) {
			let targets = target.split(',');
			target = targets[1].trim();
			roomId = toId(targets[0]) || room.id;
		}

		let targetRoom = Rooms.search(roomId);
		// if a room alias was used, replace alias with actual id
		if (targetRoom) roomId = targetRoom.id;
		if (roomId.startsWith('battle-') || roomId.startsWith('groupchat-')) this.errorReply("Battles and groupchats don't have individual modlogs.");

		let addModlogLinks = Config.modloglink && (!hideIps || (targetRoom && !targetRoom.isPrivate));
		// Let's check the number of lines to retrieve or if it's a word instead
		let lines = 0;
		if (!target.match(/[^0-9]/)) {
			lines = parseInt(target || 20);
			if (lines > RESULTS_MAX_LENGTH) lines = RESULTS_MAX_LENGTH;
		}
		let wordSearch = (!lines || lines < 0);
		let searchString = '';
		if (wordSearch) {
			searchString = target;
			lines = RESULTS_MAX_LENGTH;
		}
		let exactSearch = '0';
		if (searchString.match(/^["'].+["']$/)) {
			exactSearch = '1';
			searchString = searchString.substring(1, searchString.length - 1);
		}

		PM.send(roomId, searchString, exactSearch, lines).then(response => connection.popup(prettifyResults(response, roomId, searchString, exactSearch, addModlogLinks, hideIps)));
		if (cmd === 'timedmodlog') this.sendReply(`The modlog query took ${Date.now() - startTime} ms to complete.`);
	},
	modloghelp: ["/modlog [roomid|all|public], [n] - Roomid defaults to current room.",
		"If n is a number or omitted, display the last n lines of the moderator log. Defaults to 20.",
		"If n is not a number, search the moderator log for 'n' on room's log [roomid]. If you set [all] as [roomid], searches for 'n' on all rooms's logs.",
		"If you set [public] as [roomid], searches for 'n' in all public room's logs, excluding battles. Requires: % @ * # & ~",
	],
};
