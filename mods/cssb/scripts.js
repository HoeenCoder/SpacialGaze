'use strict';

const fs = require('fs');

function extend(obj, src) {
	for (let key in src) {
		if (src.hasOwnProperty(key)) obj[key] = src[key];
	}
	return obj;
}

//var SGSSB = JSON.parse(fs.readFileSync('config/ssb.json', 'utf-8'));

exports.BattleScripts = {
	randomCustomSSBTeam: function (side) {
		let SGSSB = JSON.parse(fs.readFileSync('config/ssb.json', 'utf-8'));
		let team = [];
		let variant = this.random(2);

		//Save these incase we decide to readd base sets
		/*var baseSets = {
			'Zarel': {
				species: 'Meloetta',
				ability: 'Serene Grace',
				item: '',
				gender: 'F',
				moves: ['lunardance', 'fierydance', 'perishsong', 'petaldance', 'quiverdance'],
				signatureMove: "Relic Song Dance",
				evs: {
					hp: 4,
					atk: 252,
					spa: 252
				},
				nature: 'Quiet',
			},
			'Joim': {
				species: 'Zapdos',
				ability: 'Tinted Lens',
				item: 'Life Orb',
				gender: 'M',
				shiny: true,
				moves: ['thunderbolt', 'hurricane', 'quiverdance'],
				signatureMove: "Gaster Blaster",
				evs: {
					hp: 4,
					spa: 252,
					spe: 252
				},
				ivs: {
					atk: 0
				},
				nature: 'Modest',
			},
			'*SpaceGazer': {
				species: 'Registeel',
				ability: 'No Guard',
				item: 'Weakness Policy',
				moves: ['Zap Cannon', 'Iron Head', 'Stone Edge'],
				signatureMove: 'Spacial Blast',
				evs: {
					atk: 252,
					spd: 252,
					hp: 4
				},
				nature: 'Adamant',
			},
			'*Spacial Bot': {
				species: 'Regirock',
				ability: 'Sturdy',
				item: 'Leftovers',
				moves: [
					['Stone Edge', 'Earthquake'][this.random(2)], 'Explosion', 'Iron Head'
				],
				signatureMove: 'Ancient Ritual',
				evs: {
					atk: 252,
					spd: 252,
					hp: 4
				},
				nature: 'Adamant',
			},
			'*SG Bot': {
				species: 'Regice',
				ability: 'Flash Fire',
				item: 'Leftovers',
				moves: ['Ice Beam', 'Ancient Power', 'Thunderbolt'],
				signatureMove: 'Frostbite',
				evs: {
					spa: 252,
					spd: 252,
					hp: 4
				},
				nature: 'Adamant',
			},
			'‽Edles': {
				species: 'Unown',
				ability: 'Defiant',
				item: 'Choice Specs',
				moves: ['Hidden Power'],
				signatureMove: 'Ad Blitz',
				evs: {
					spa: 252,
					spd: 252,
					hp: 4
				},
				nature: 'Modest',
			}
		};*/
		//Parse player objects into sets.
		let ssbSets = {};
		for (let key in SGSSB) {
			if (!SGSSB[key].active) continue; //This pokemon is not to be used yet.
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)] = {};
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].name = SGSSB[key].name;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].species = SGSSB[key].species;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].ability = SGSSB[key].ability;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].item = SGSSB[key].item;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].gender = (SGSSB[key].gender === 'random' ? ((variant === 1) ? 'M' : 'F') : SGSSB[key].gender);
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].moves = SGSSB[key].movepool;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].signatureMove = SGSSB[key].cMove;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].evs = SGSSB[key].evs;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].ivs = SGSSB[key].ivs;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].nature = SGSSB[key].nature;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].level = parseInt(SGSSB[key].level);
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].shiny = SGSSB[key].shiny;
			ssbSets[(SGSSB[key].symbol + SGSSB[key].name)].happiness = SGSSB[key].happiness;
		}

		//var sets = extend(baseSets, ssbSets);
		let backupSet = {
			'Unown': {
				species: 'Unown',
				ability: 'Levitate',
				item: 'Choice Specs',
				moves: ['Hidden Power'],
				evs: {
					spa: 252,
					spd: 252,
					hp: 4,
				},
				nature: 'Modest',
			},
		};
		let sets;
		if (Object.keys(ssbSets).length === 0) {
			sets = extend(ssbSets, backupSet);
		} else {
			sets = ssbSets;
		}

		for (let k in sets) {
			sets[k].moves = sets[k].moves.map(toId);
			if (sets[k].baseSignatureMove) sets[k].baseSignatureMove = toId(sets[k].baseSignatureMove);
		}

		// Generate the team randomly.
		let pool = Object.keys(sets);
		for (let i = 0; i < (Object.keys(sets).length < 6 ? Object.keys(sets).length : 6); i++) {
			let name = this.sampleNoReplace(pool);
			if (i === 1 && SGSSB[toId(side.name)] && SGSSB[toId(side.name)].active && sets[(SGSSB[toId(side.name)].symbol + SGSSB[toId(side.name)].name)] && pool.indexOf((SGSSB[toId(side.name)].symbol + SGSSB[toId(side.name)].name)) !== -1) {
				pool.push(name); //re-add
				name = pool[pool.indexOf((SGSSB[toId(side.name)].symbol + SGSSB[toId(side.name)].name))];
				pool.splice(pool.indexOf(name), 1);
			}
			let set = sets[name];
			set.name = name;
			if (!set.level) set.level = 100;
			if (!set.ivs) {
				set.ivs = {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				};
			} else {
				for (let iv in {
					hp: 31,
					atk: 31,
					def: 31,
					spa: 31,
					spd: 31,
					spe: 31,
				}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) {
				set.evs = {
					hp: 84,
					atk: 84,
					def: 84,
					spa: 84,
					spd: 84,
					spe: 84,
				};
			}
			if (set.signatureMove) {
				set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			}
			team.push(set);
		}
		return team;
	},
};
