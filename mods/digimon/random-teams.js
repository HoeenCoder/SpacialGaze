/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Digimon Showdown                                             *
 *  Created By:                                                  *
 *  Insist + Ashley the Pikachu + Stellation + AlfaStorm	 *
 *  Special Thanks to:                                           *
 *  HoeenCoder (Assisted with Mechanics)                         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomDigimonTeams extends RandomTeams {
	randomDigimonTeam() {
		let team = [];
		let sets = {
			"Botamon": {
				species: "Pyukumuku",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Poyomon": {
				species: "Vanillite",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Punimon": {
				species: "Darumaka",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Yuramon": {
				species: "Cascoon",
				ability: "Data",
				moves: ['acidbubble'],
			},
			"Koromon": {
				species: "Igglybuff",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Tokomon": {
				species: "Swirlix",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Tsunomon": {
				species: "Swinub",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Tanemon": {
				species: "Sunkern",
				ability: "Data",
				moves: ['acidbubble'],
				rate: 5,
			},
			"Agumon": {
				species: "Helioptile",
				ability: "Vaccine",
				moves: ['firetower', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'musclecharge', 'sonicjab'],
				baseSignatureMove: "pepperbreath",
				signatureMove: "Pepper Breath",
			},
			"Gabumon": {
				species: "Rockruff",
				ability: "Data",
				moves: ['firetower', 'heatlaser', 'tremar', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch'],
				baseSignatureMove: "blueblaster",
				signatureMove: "Blue Blaster",
			},
			"Patamon": {
				species: "Dedenne",
				ability: "Data",
				moves: ['warcry', 'sonicjab', 'dynamitekick', 'busterdrive', 'spinningshot', 'windcutter', 'confusedstorm'],
				baseSignatureMove: "boombubble",
				signatureMove: "Boom acidbubble",
			},
			"Elecmon": {
				species: "Electrike",
				ability: "Data",
				moves: ['musclecharge', 'dynamitekick', 'reboundstrike', 'electriccloud', 'megalospark', 'staticelect', 'windcutter'],
				baseSignatureMove: "superthunderstrike",
				signatureMove: "Super Thunder Strike",
			},
			"Biyomon": {
				species: "Oricoriopau",
				ability: "Vaccine",
				moves: ['spitfire', 'heatlaser', 'spinningshot', 'electriccloud', 'windcutter', 'confusedstorm', 'typhoon'],
				signatureMove: "Spiral Twister",
			},
			"Kunemon": {
				species: "Weedle",
				ability: "Virus",
				moves: ['electriccloud', 'megalospark', 'staticelect', 'toxicpowder', 'massmorph', 'poisonclaw', 'dangersting'],
				baseSignatureMove: "electricthread",
				signatureMove: "Electric Thread",
			},
			"Palmon": {
				species: "Sunflora",
				ability: "Vaccine",
				moves: ['toxicpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'waterblit', 'aquamagic', 'teardrop'],
				baseSignatureMove: "poisonivy",
				signatureMove: "Poison Ivy",
			},
			"Betamon": {
				species: "Mudkip",
				ability: "Virus",
				moves: ['electriccloud', 'staticelect', 'gigafreeze', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic'],
				baseSignatureMove: "electricshock",
				signatureMove: "Electric Shock",
			},
			"Penguinmon": {
				species: "Delibird",
				ability: "Data",
				moves: ['charmperfume', 'poisonclaw', 'gigafreeze', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic'],
				baseSignatureMove: "superslap",
				signatureMove: "Super Slap",
			},
			"Greymon": {
				species: "Heliolisk",
				ability: "Vaccine",
				moves: ['firetower', 'prominencebeam', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'meltdown', 'musclecharge', 'dynamitekick', 'reboundstrike', 'spinningshot', 'megalospark'],
				baseSignatureMove: "megaflame",
				signatureMove: "Mega Flame",
			},
			"Monochromon": {
				species: "Rhyhorn",
				ability: "Data",
				moves: ['prominencebeam', 'spitfire', 'redinferno', 'heatlaser', 'meltdown', 'tremar', 'reboundstrike', 'megatonpunch', 'massmorph', 'insectplague', 'greentrap'],
				baseSignatureMove: "volcanicstrike",
				signatureMove: "Volcanic Strike",
			},
			"Ogremon": {
				species: "Marowak",
				ability: "Virus",
				moves: ['spitfire', 'redinferno', 'magmabomb', 'tremar', 'meltdown', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch', 'spinningshot', 'busterdrive'],
				baseSignatureMove: "pummelwhack",
				signatureMove: "Pummel Whack",
			},
			"Airdramon": {
				species: "Altaria",
				ability: "Vaccine",
				moves: ['prominencebeam', 'spitfire', 'heatlaser', 'spinningshot', 'electriccloud', 'megalospark', 'staticelect', 'windcutter', 'confusedstorm', 'typhoon'],
				baseSignatureMove: "spinningneedle",
				signatureMove: "Spinning Needle",
			},
			"Kuwagamon": {
				species: "Buzzwole",
				ability: "Virus",
				moves: ['musclecharge', 'sonicjab', 'spinningshot', 'windcutter', 'toxicpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap'],
				baseSignatureMove: "scissorclaw",
				signatureMove: "Scissor Claw",
			},
			"Whamon": {
				species: "Wailord",
				ability: "Vaccine",
				moves: ['toxicpowder', 'charmperfume', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'aurorafreeze', 'teardrop'],
				baseSignatureMove: "blastingspout",
				signatureMove: "Blasting Spout",
			},
			"Frigimon": {
				species: "Beartic",
				ability: "Vaccine",
				moves: ['musclecharge', 'sonicjab', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'aurorafreeze', 'teardrop'],
				baseSignatureMove: "subzeroicepunch",
				signatureMove: "Sub Zero Ice Punch",
			},
			"Nanimon": {
				species: "Electrode",
				ability: "Virus",
				moves: ['dynamitekick', 'reboundstrike', 'megatonpunch', 'orderspray', 'poopspdtoss', 'bigpooptoss', 'bigrndtoss', 'pooprndtoss', 'rndspdtoss', 'horizontalkick'],
				baseSignatureMove: "partytime",
				signatureMove: "Party Time",
			},
			"Meramon": {
				species: "Magmar",
				ability: "Data",
				moves: ['firetower', 'prominencebeam', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'infinityburn', 'warcry', 'dynamitekick', 'reboundstrike'],
				baseSignatureMove: "fireball",
				signatureMove: "Fireball",
			},
			"Drimogemon": {
				species: "Excadrill",
				ability: "Data",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'charmperfume', 'greentrap'],
				baseSignatureMove: "drillspin",
				signatureMove: "Drill Spin",
			},
			"Leomon": {
				species: "Pyroar",
				ability: "Vaccine",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'megalospark', 'staticelect'],
				baseSignatureMove: "fistofthebeastking",
				signatureMove: "Fist of the Beast King",
			},
			"Kokatorimon": {
				species: "Combusken",
				ability: "Vaccine",
				moves: ['tremar', 'warcry', 'dynamitekick', 'spinningshot', 'electriccloud', 'megalospark', 'staticelect', 'windcutter', 'confusedstorm', 'typhoon'],
				baseSignatureMove: "frozenfireshot",
				signatureMove: "Frozen Fire Shot",
			},
			"Vegiemon": {
				species: "Carnivine",
				ability: "Virus",
				moves: ['toxicpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap', 'waterblit', 'aquamagic'],
				baseSignatureMove: "sweetbreath",
				signatureMove: "Sweet Breath",
			},
			"Shellmon": {
				species: "Crustle",
				ability: "Data",
				moves: ['toxicpowder', 'charmperfume', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'aurorafreeze', 'teardrop'],
				baseSignatureMove: "hydropressure",
				signatureMove: "Hydro Pressure",
			},
			"Mojyamon": {
				species: "Vigoroth",
				ability: "Vaccine",
				moves: ['dynamitekick', 'megatonpunch', 'massmorph', 'greentrap', 'gigafreeze', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'aurorafreeze'],
				baseSignatureMove: "boneboomerang",
				signatureMove: "Bone Boomerang",
			},
			"Birdramon": {
				species: "Moltres",
				ability: "Vaccine",
				moves: ['firetower', 'prominencebeam', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'meltdown', 'spinningshot', 'windcutter', 'typhoon'],
				baseSignatureMove: "meteorwing",
				signatureMove: "Meteor Wing",
			},
			"Tyrannomon": {
				species: "Tyrantrum",
				ability: "Data",
				moves: ['prominencebeam', 'spitfire', 'magmabomb', 'tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch', 'busterdrive'],
				baseSignatureMove: "blazeblast",
				signatureMove: "Blaze Blast",
			},
			"Angemon": {
				species: "Togetic",
				ability: "Vaccine",
				moves: ['musclecharge', 'dynamitekick', 'reboundstrike', 'spinningshot', 'electriccloud', 'megalospark', 'staticelect', 'windcutter', 'confusedstorm', 'typhoon'],
				baseSignatureMove: "handoffate",
				signatureMove: "Hand of Fate",
			},
			"Unimon": {
				species: "Rapidash",
				ability: "Vaccine",
				moves: ['warcry', 'dynamitekick', 'reboundstrike', 'spinningshot', 'electriccloud', 'megalospark', 'staticelect', 'windcutter', 'confusedstorm', 'typhoon'],
				baseSignatureMove: "aerialattack",
				signatureMove: "Aerial Attack",
				nature: "Serious",
			},
			"Ninjamon": {
				species: "Accelgor",
				ability: "Data",
				moves: ['firetower', 'magmabomb', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'toxicpowder', 'massmorph', 'charmperfume', 'dangersting'],
				baseSignatureMove: "igaschoolthrowingknife",
				signatureMove: "Iga School Throwing Knife",
			},
			"Coelamon": {
				species: "Relicanth",
				ability: "Data",
				moves: ['insectplague', 'poisonclaw', 'dangersting', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'teardrop'],
				baseSignatureMove: "variabledarts",
				signatureMove: "Variable Darts",
			},
			"Numemon": {
				species: "Mukalola",
				ability: "Data",
				moves: ['orderspray', 'poopspdtoss', 'bigpooptoss', 'bigrndtoss', 'pooprndtoss', 'rndspdtoss', 'horizontalkick', 'ultpoophell'],
				baseSignatureMove: "partytime",
				signatureMove: "Party Time",
			},
			"Centarumon": {
				species: "Mudsdale",
				ability: "Data",
				moves: ['firetower', 'prominencebeam', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'meltdown', 'musclecharge', 'dynamitekick', 'reboundstrike'],
				baseSignatureMove: "solarray",
				signatureMove: "Solar Ray",
			},
			"Devimon": {
				species: "Banette",
				ability: "Virus",
				moves: ['musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'thunderjustice', 'spinningshot', 'electriccloud', 'megalospark', 'gigafreeze', 'icestatue'],
				baseSignatureMove: "deathclaw",
				signatureMove: "Death Claw",
			},
			"Bakemon": {
				species: "Mimikyu",
				ability: "Virus",
				moves: ['thunderjustice', 'spinningshot', 'electriccloud', 'megalospark', 'staticelect', 'windcutter', 'typhoon', 'gigafreeze', 'winterblast', 'aquamagic'],
				baseSignatureMove: "darkclaw",
				signatureMove: "Dark Claw",
			},
			"Kabuterimon": {
				species: "Heracross",
				ability: "Vaccine",
				moves: ['prominencebeam', 'spitfire', 'redinferno', 'aquamagic', 'teardrop', 'toxicpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap'],
				baseSignatureMove: "electroshocker",
				signatureMove: "Electro Shocker",
			},
			"Seadramon": {
				species: "Dragonair",
				ability: "Data",
				moves: ['spitfire', 'magmabomb', 'toxicpowder', 'charmperfume', 'dangersting', 'gigafreeze', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'teardrop'],
				baseSignatureMove: "iceblast",
				signatureMove: "Ice Blast",
			},
			"Garurumon": {
				species: "Lycanroc",
				ability: "Vaccine",
				moves: ['firetower', 'spitfire', 'magmabomb', 'warcry', 'megatonpunch', 'busterdrive', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'aquamagic'],
				baseSignatureMove: "howlingblaster",
				signatureMove: "Howling Blaster",
			},
			"Sukamon": {
				species: "Garbodor",
				ability: "Virus",
				moves: ['orderspray', 'poopspdtoss', 'bigpooptoss', 'bigrndtoss', 'pooprndtoss', 'rndspdtoss', 'horizontalkick', 'ultpoophell'],
				baseSignatureMove: "partytime",
				signatureMove: "Party Time",
			},
			//Ultimates
			"MetalGreymon": {
				species: "Druddigon",
				ability: "Virus",
				moves: ['heatlaser', 'infinityburn', 'meltdown', 'tremar', 'megatonpunch', 'busterdrive', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselazer', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "gigablaster",
				signatureMove: "Giga Blaster",
			},
			"SkullGreymon": {
				species: "Aggron",
				ability: "Virus",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'gigafreeze', 'icestatue', 'winterblast', 'allrangebeam', 'pulselazer'],
				baseSignatureMove: "darkshot",
				signatureMove: "Dark Shot",
			},
			"Giromon": {
				species: "Pawniard",
				ability: "Vaccine",
				moves: ['megatonpunch', 'busterdrive', 'thunderjustice', 'electriccloud', 'megalospark', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselazer', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "deadlybomb",
				signatureMove: "Deadly Bomb",
			},
			"HerculesKabuterimon": {
				species: "Pinsirmega",
				ability: "Data",
				moves: ['prominencebeam', 'redinferno', 'musclecharge', 'reboundstrike', 'megatonpunch', 'busterdrive', 'toxicpowder', 'bug', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap'],
				baseSignatureMove: "highelectricshocker",
				signatureMove: "High Electric Shocker",
			},
			"Mamemon": {
				species: "Chingling",
				ability: "Data",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'powercrane', 'metalsprinter', 'pulselazer', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "smileybomb",
				signatureMove: "Smiley Bomb",
			},
			"MegaSeadramon": {
				species: "Gyarados",
				ability: "Data",
				moves: ['windcutter', 'confusedstorm', 'typhoon', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'waterblit', 'aquamagic', 'aurorafreeze', 'teardrop'],
				baseSignatureMove: "mailstorm",
				signatureMove: "Mail Storm",
			},
			"Vademon": {
				species: "Beheeyem",
				ability: "Virus",
				moves: ['bug', 'charmperfume', 'greentrap', 'tremar', 'megatonpunch', 'busterdrive', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselazer', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "abductionbeam",
				signatureMove: "Abduction Beam",
			},
			"Etemon": {
				species: "Simisear",
				ability: "Virus",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'thunderjustice', 'spinningshot', 'megalospark', 'horizontalkick', 'ultpoophell'],
				baseSignatureMove: "darknetwork",
				signatureMove: "Dark Network",
			},
			"Andromon": {
				species: "Registeel",
				ability: "Vaccine",
				moves: ['tremar', 'reboundstrike', 'megatonpunch', 'busterdrive', 'megalospark', 'staticelect', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselazer', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "spiralsword",
				signatureMove: "Spiral Sword",
			},
			"Megadramon": {
				species: "Zygarde",
				ability: "Virus",
				moves: ['dynamitekick', 'megatonpunch', 'gigafreeze', 'icestatue', 'winterblast', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselazer', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "genocideattack",
				signatureMove: "Genocide Attack",
			},
			"Phoenixmon": {
				species: "Hooh",
				ability: "Vaccine",
				moves: ['prominencebeam', 'redinferno', 'magmabomb', 'meltdown', 'thunderjustice', 'spinningshot', 'electriccloud', 'megalospark', 'staticelect', 'windcutter', 'confusedstorm', 'typhoon'],
				baseSignatureMove: "crimsonflare",
				signatureMove: "Crimson Flare",
			},
			"Piximon": {
				species: "Jigglypuff",
				ability: "Data",
				moves: ['spinningshot', 'windcutter', 'confusedstorm', 'typhoon', 'toxicpowder', 'bug', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap'],
				baseSignatureMove: "bitbomb",
				signatureMove: "Bit Bomb",
			},
			"MetalMamemon": {
				species: "Ferroseed",
				ability: "Data",
				moves: ['tremar', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'allrangebeam', 'metalsprinter', 'pulselazer', 'deleteprogram', 'reverseprogram'],
				baseSignatureMove: "energybomb",
				signatureMove: "Energy Bomb",
			},
			"Monzaemon": {
				species: "Bewear",
				ability: "Vaccine",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'thunderjustice', 'electriccloud', 'megalospark', 'staticelect', 'confusedstorm'],
				baseSignatureMove: "lovelyattack",
				signatureMove: "Lovely Attack",
			},
			"DigiTamamon": {
				species: "Togepi",
				ability: "Data",
				moves: ['firetower', 'prominencebeam', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'infinityburn', 'meltdown', 'thunderjustice', 'spinningshot', 'megalospark', 'confusedstorm', 'typhoon', 'aquamagic', 'teardrop'],
				baseSignatureMove: "nightmaresyndrome",
				signatureMove: "Nightmare Syndrome",
			},
			"Machinedramon": {
				species: "Genesect",
				ability: "Virus",
				moves: ['megatonpunch', 'thunderjustice', 'megalospark', 'aurorafreeze'],
				baseSignatureMove: "infinitycannon",
				signatureMove: "Infinity Cannon",
				rate: 5,
			},
		};
		//Generate the team randomly.
		let pool = Object.keys(sets);
		for (let i = 0; i < 6; i++) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			if (set.rate && Math.ceil(Math.random() * set.rate !== 1)) {
				// Skip this digimon
				i--;
				continue;
			}
			set.level = 100;
			set.name = name;
			set.nature = "Serious";
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), 'Protect', set.signatureMove];
			let sigItems = ['Small Recovery', 'Medium Recovery', 'Large Recovery', 'Super Recovery Floppy', 'Various', 'Protection', 'Omnipotent', 'Restore Floppy', 'Super Restore Floppy', 'Offense Disk', 'Defense Disk', 'Hi Speed Disk', 'Super Defense Disk', 'Super Offense Disk', 'Super Speed Disk', 'Omnipotent Disk'];
			let choosenItems = [];
			while (set.moves.length < 8) {
				let itemChoosen = sigItems[Math.floor(Math.random() * sigItems.length)];
				if (choosenItems.length !== 0) {
					for (let k = 0; k < choosenItems.length; k++) {
						if (choosenItems[k] === itemChoosen) continue;
					}
				}
				choosenItems.push(itemChoosen);
				set.moves.push(itemChoosen);
			}
			team.push(set);
		}
		return team;
	}
}

module.exports = RandomDigimonTeams;