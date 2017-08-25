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
				signatureMove: "Boom Bubble",
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
				moves: ['heatlaser', 'infinityburn', 'meltdown', 'tremar', 'megatonpunch', 'busterdrive', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "gigablaster",
				signatureMove: "Giga Blaster",
			},
			"SkullGreymon": {
				species: "Aggron",
				ability: "Virus",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'gigafreeze', 'icestatue', 'winterblast', 'allrangebeam', 'pulselaser'],
				baseSignatureMove: "darkshot",
				signatureMove: "Dark Shot",
			},
			"Giromon": {
				species: "Pawniard",
				ability: "Vaccine",
				moves: ['megatonpunch', 'busterdrive', 'thunderjustice', 'electriccloud', 'megalospark', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
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
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'powercrane', 'metalsprinter', 'pulselaser', 'fullpotential', 'reverseprogram'],
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
				moves: ['bug', 'charmperfume', 'greentrap', 'tremar', 'megatonpunch', 'busterdrive', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
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
				moves: ['tremar', 'reboundstrike', 'megatonpunch', 'busterdrive', 'megalospark', 'staticelect', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
				baseSignatureMove: "spiralsword",
				signatureMove: "Spiral Sword",
			},
			"Megadramon": {
				species: "Zygarde",
				ability: "Virus",
				moves: ['dynamitekick', 'megatonpunch', 'gigafreeze', 'icestatue', 'winterblast', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
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
				moves: ['tremar', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'reverseprogram'],
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
			"*Gatomon": {
				species: "Glameow",
				ability: "Vaccine",
				moves: ['tremar', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch', 'busterdrive', 'confusedstorm', 'prominencebeam', 'spitfire', 'redinferno'],
			},
			"*BlackGatomon": {
				species: "Purugly",
				ability: "Virus",
				moves: ['tremar', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch', 'busterdrive', 'confusedstorm', 'prominencebeam', 'spitfire', 'redinferno'],
			},
			"*Gigadramon": {
				species: "Zygarde",
				shiny: true,
				ability: "Data",
				moves: ['dynamitekick', 'megatonpunch', 'icestatue', 'gigafreeze', 'winterblast', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
			},
			"*IceLeomon": {
				species: "Ninetailsalola",
				ability: "Data",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'megalospark', 'staticelect'],
			},
			"*MetalEtemon": {
				species: "Simipour",
				ability: "Vaccine",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'dynamitekick', 'reboundstrike', 'megatonpunch', 'busterdrive', 'thunderjustice', 'spinningshot', 'megalospark', 'horizontalkick', 'ultpoophell'],
			},
			"*Myotismon": {
				species: "Golbat",
				ability: "Virus",
				moves: ['megatonpunch', 'thunderjustice', 'typhoon', 'gigafreeze', 'aurorafreeze'],
			},
			"*Yanmamon": {
				species: "Yanmega",
				ability: "Virus",
				moves: ['spinningshot', 'electriccloud', 'poisonclaw', 'toxicpowder', 'windcutter', 'massmorph', 'insectplague', 'dangersting'],
			},
			"*Gotsumon": {
				species: "Geodudealola",
				ability: "Data",
				moves: ['powercrane', 'fullpotential', 'reboundstrike'],
			},
			"*Flarerizamon": {
				species: "Growlithe",
				ability: "Data",
				moves: ['firetower', ' spitfire', 'redinferno', 'magmabomb', 'heatlaser'],
			},
			"*WaruMonzaemon": {
				species: "Bewear",
				shiny: true,
				ability: "Virus",
				moves: ['musclecharge', 'megatonpunch', 'busterdrive', 'thunderjustice'],
			},
			"*SnowAgumon": {
				species: "Bermite",
				ability: "Vaccine",
				moves: ['musclecharge', 'sonicjab', 'icestatue', 'winterblast', 'winterblast'],
			},
			"*Hyogamon": {
				species: "Crabominable",
				ability: "Virus",
				moves: ['warcry', 'sonicjab', 'megatonpunch', 'busterdrive', 'gigafreeze', 'iceneedle'],
			},
			"*PlatinumSukamon": {
				species: "Garbodor",
				shiny: true,
				ability: "Vaccine",
				moves: ['orderspray', 'bigpooptoss', 'bigrndtoss', 'rndspdtoss', 'ultpoophell'],
			},
			"*Dokunemon": {
				species: "Caterpie",
				ability: "Virus",
				moves: ['toxicpowder', 'winterblast', 'poisonclaw', 'dangersting'],
			},
			"*ShimaUnimon": {
				species: "Rapidash",
				shiny: true,
				ability: "Data",
				moves: ['warcry', 'sonicjab', 'reverseprogram', 'electriccloud', 'megalospark', 'staticelect'],
			},
			"*Tankmon": {
				species: "Bastiodon",
				shiny: true,
				ability: "Data",
				moves: ['spitfire', 'redinferno', 'megatonpunch', 'busterdrive'],
			},
			"*RedVegiemon": {
				species: "Tangrowth",
				shiny: true,
				ability: "Virus",
				moves: ['toxicpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'confusedstorm', 'typhoon'],
			},
			"*JungleMojyamon": {
				species: "Vigoroth",
				shiny: true,
				ability: "Vaccine",
				moves: ['dynamitekick', 'megatonpunch', 'massmorph'],
			},
			"*NiseDrimogemon": {
				species: "Excadrill",
				shiny: true,
				ability: "Vaccine",
				moves: ['tremar', 'musclecharge', 'sonicjab', 'dynamitekick', 'reboundstrike', 'busterdrive'],
			},
			"*Goburimon": {
				species: "Machop",
				shiny: true,
				ability: "Virus",
				moves: ['spitfire', 'magmabomb', 'warcry', 'sonicjab', 'magmabomb', 'icestatue'],
			},
			"*MudFrigimon": {
				species: "Ursaring",
				ability: "Vaccine",
				moves: ['musclecharge', 'sonicjab', 'winterblast', 'aurorafreeze', 'greentrap'],
			},
			"*Psychemon": {
				species: "Rockruff",
				shiny: true,
				ability: "Vaccine",
				moves: ['tremar', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch'],
			},
			"*ModokiBetamon": {
				species: "Mudkip",
				shiny: true,
				ability: "Vaccine",
				moves: ['electriccloud', 'staticelect', 'winterblast', 'aquamagic'],
			},
			"*ToyAgumon": {
				species: "Porygon",
				ability: "Data",
				moves: ['firetower', 'spitfire', 'magmabomb', 'heatlaser', 'sonicjab'],
			},
			"*Piddomon": {
				species: "Togetic",
				ability: "Vaccine",
				moves: ['dynamitekick', 'reboundstrike', 'spinningshot', 'megalospark', 'megatonpunch', 'busterdrive'],
			},
			"*Aruraumon": {
				species: "Gloom",
				ability: "Virus",
				moves: ['toxicpowder', 'charmperfume', 'poisonclaw', 'winterblast', 'teardrop'],
			},
			"*Geremon": {
				species: "Muk",
				ability: "Virus",
				moves: ['orderspray', 'poopspdtoss', 'pooprndtoss', 'rndspdtoss', 'horizontalkick'],
			},
			"*Vermilimon": {
				species: "Rhyhorn",
				shiny: true,
				ability: "Vaccine",
				moves: ['prominencebeam', 'redinferno', 'heatlaser', 'meltdown', 'tremar', 'reboundstrike', 'megatonpunch'],
			},
			"*Fugamon": {
				species: "Marowakalola",
				ability: "Virus",
				moves: ['spitfire', 'magmabomb', 'megatonpunch', 'staticelect'],
			},
			"*Tekkamon": {
				species: "Aron",
				shiny: true,
				ability: "Virus",
				moves: ['megatonpunch', 'busterdrive', 'fullpotential', 'reverseprogram'],
			},
			"*MoriShellmon": {
				species: "Crustle",
				shiny: true,
				ability: "Data",
				moves: ['toxicpowder', 'charmperfume', 'icestatue', 'winterblast', 'aquamagic', 'teardrop'],
			},
			"*Guardromon": {
				species: "Metang",
				ability: "Vaccine",
				moves: ['prominencebeam', 'dangersting', 'powercrane', 'allrangebeam', 'fullpotential'],
			},
			"*Muchomon": {
				species: "Delibird",
				shiny: true,
				ability: "Data",
				moves: ['poisonclaw', 'gigafreeze', 'iceneedle'],
			},
			"*Icemon": {
				species: "Glalie",
				ability: "Vaccine",
				moves: ['megatonpunch', 'gigafreeze', 'iceneedle'],
			},
			"*Akatorimon": {
				species: "Fletchinder",
				ability: "Data",
				moves: ['dynamitekick', 'spinningshot', 'electriccloud', 'staticelect', 'windcutter', 'confusedstorm'],
			},
			"*Tsukaimon": {
				species: "Dedenne",
				shiny: true,
				ability: "Virus",
				moves: ['warcry', 'sonicjab', 'dynamitekick', 'busterdrive', 'spinningshot', 'windcutter'],
			},
			"*Shamanmon": {
				species: "Tyrogue",
				ability: "Virus",
				moves: ['spitfire', 'magmabomb', 'warcry', 'sonicjab', 'megatonpunch'],
			},
			"*ClearAgumon": {
				species: "Porygon",
				shiny: true,
				ability: "Data",
				moves: ['firetower', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'musclecharge', 'sonicjab'],
			},
			"*Weedmon": {
				species: "Carnivine",
				shiny: true,
				ability: "Virus",
				moves: ['toxicpowder', 'massmorph', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap'],
			},
			"*IceDevimon": {
				species: "Banette",
				shiny: true,
				ability: "Virus",
				moves: ['warcry', 'sonicjab', 'reboundstrike', 'gigafreeze', 'icestatue'],
			},
			"*Darkrizamon": {
				species: "Houndour",
				ability: "Virus",
				moves: ['redinferno', 'magmabomb', 'heatlaser', 'gigafreeze', 'winterblast', 'iceneedle'],
			},
			"*SandYanmamon": {
				species: "Yanmega",
				shiny: true,
				ability: "Virus",
				moves: ['spitfire', 'spinningshot', 'typhoon'],
			},
			"*SnowGoburimon": {
				species: "Machop",
				ability: "Virus",
				moves: ['warcry', 'sonicjab', 'megatonpunch', 'gigafreeze', 'winterblast'],
			},
			"*BlueMeramon": {
				species: "Emboar",
				shiny: true,
				ability: "Vaccine",
				moves: ['firetower', 'prominencebeam', 'redinferno', 'dynamitekick', 'reboundstrike', 'gigafreeze', 'icestatue', 'icestatue'],
			},
			"*Gururumon": {
				species: "Lycanroc",
				shiny: true,
				ability: "Virus",
				moves: ['warcry', 'megatonpunch', 'busterdrive', 'gigafreeze', 'icestatue', 'winterblast'],
			},
			"*Saberdramon": {
				species: "Moltres",
				shiny: true,
				ability: "Virus",
				moves: ['prominencebeam', 'spitfire', 'redinferno', 'spinningshot', 'windcutter', 'busterdrive'],
			},
			"*Soulmon": {
				species: "Mimikyu",
				shiny: true,
				ability: "Virus",
				moves: ['thunderjustice', 'electriccloud', 'megalospark', 'staticelect', 'gigafreeze'],
			},
			"*Rockmon": {
				species: "Ursaring",
				shiny: true,
				ability: "Virus",
				moves: ['musclecharge', 'sonicjab', 'icestatue', 'winterblast', 'iceneedle', 'aurorafreeze'],
			},
			"*Otamamon": {
				species: "Shellder",
				ability: "Data",
				moves: ['waterblit', 'teardrop'],
			},
			"*Gekomon": {
				species: "Froakie",
				ability: "Data",
				moves: ['gigafreeze', 'winterblast', 'waterblit', 'teardrop'],
			},
			"*Tentomon": {
				species: "Paras",
				ability: "Data",
				moves: ['bug', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw'],
			},
			"*WaruSeadramon": {
				species: "Gyarados",
				shiny: true,
				ability: "Virus",
				moves: ['confusedstorm', 'gigafreeze', 'winterblast', 'aurorafreeze'],
			},
			"*Meteromon": {
				species: "Golem",
				ability: "Data",
				moves: ['magmabomb', 'meltdown', 'tremar', 'megatonpunch'],
			},
			"*Machinedramon": {
				species: "Aggron",
				ability: "Virus",
				moves: ['megatonpunch', 'thunderjustice', 'megalospark', 'aurorafreeze', 'allrangebeam', 'fullpotential'],
			},
			"*MegaKabuterimon": {
				species: "Heracross",
				shiny: true,
				ability: "Vaccine",
				moves: ['musclecharge', 'reboundstrike', 'megatonpunch', 'busterdrive', 'spinningshot', 'staticelect', 'toxicpowder', 'bug', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap'],
			},
			"*Garudamon": {
				species: "Blaziken",
				ability: "Vaccine",
				moves: ['prominencebeam', 'redinferno', 'magmabomb', 'meltdown', 'musclecharge', 'thunderjustice', 'spinningshot', 'electriccloud', 'megalospark', 'windcutter', 'confusedstorm', 'typhoon'],
			},
			"*MetalGreymon": {
				species: "Druddigon",
				shiny: true,
				ability: "Vaccine",
				moves: ['heatlaser', 'infinityburn', 'meltdown', 'tremar', 'megatonpunch', 'busterdrive', 'powercrane', 'allrangebeam', 'metalsprinter', 'pulselaser', 'deleteprogram', 'dgdimension', 'fullpotential', 'reverseprogram'],
			},
			"*WereGarurumon": {
				species: "Smeargle",
				ability: "Data",
				moves: ['firetower', 'spitfire', 'magmabomb', 'infinityburn', 'musclecharge', 'sonicjab', 'dynamitekick', 'megatonpunch', 'busterdrive', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'aquamagic'],
			},
			"*BlackWereGarurumon": {
				species: "Zoroark",
				ability: "Virus",
				moves: ['firetower', 'spitfire', 'magmabomb', 'infinityburn', 'musclecharge', 'sonicjab', 'dynamitekick', 'megatonpunch', 'busterdrive', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'aquamagic'],
			},
			"*WarGreymon": {
				species: "Haxorus",
				ability: "Vaccine",
				moves: ['firetower', 'magmabomb', 'heatlaser', 'infinityburn', 'meltdown', 'sonicjab', 'reboundstrike', 'megatonpunch', 'powercrane', 'metalsprinter', 'fullpotential'],
			},
			"*BlackWarGreymon": {
				species: "Haxorus",
				shiny: true,
				ability: "Virus",
				moves: ['firetower', 'magmabomb', 'heatlaser', 'infinityburn', 'meltdown', 'sonicjab', 'reboundstrike', 'megatonpunch', 'powercrane', 'metalsprinter', 'fullpotential'],
			},
			"*MetalGarurumon": {
				species: "Mightyena",
				shiny: true,
				ability: "Data",
				moves: ['prominencebeam', 'magmabomb', 'gigafreeze', 'icestatue', 'winterblast', 'iceneedle', 'aurorafreeze', 'allrangebeam', 'pulselaser', 'fullpotential'],
			},
			"*BlackMetalGarurumon": {
				species: "Mightyena",
				ability: "Virus",
				moves: ['prominencebeam', 'magmabomb', 'thunderjustice', 'electriccloud', 'megalospark', 'staticelect', 'confusedstorm', 'allrangebeam', 'pulselaser', 'fullpotential'],
			},
			"*Rosemon": {
				species: "Florges-Pink",
				ability: "Data",
				moves: ['toxicpowder', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap', 'aquamagic', 'teardrop'],
			},
			"*Togemon": {
				species: "Cacturne",
				ability: "Data",
				moves: ['tremar', 'musclecharge', 'warcry', 'sonicjab', 'megatonpunch', 'toxicpowder', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap', 'aquamagic', 'teardrop'],
			},
			"*Lilymon": {
				species: "Cherrim-Day",
				ability: "Data",
				moves: ['firetower', 'spitfire','toxicpowder', 'massmorph', 'insectplague', 'charmperfume', 'poisonclaw', 'dangersting', 'greentrap', 'aquamagic', 'teardrop'],
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
