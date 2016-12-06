'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// SM Singles
	///////////////////////////////////////////////////////////////////
	{
		section: "SM Singles (beta)",
	}, {
		name: "[Gen 7] Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],

		mod: 'gen7',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Unrated Random Battle",

		mod: 'gen7',
		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] OU",

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Power Construct', 'Shadow Tag'],
		requirePentagon: true,
	}, {
		name: "[Gen 7] Pokebank OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587188/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587177/\">OU Banlist</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Uber', 'Bank-Uber', 'Power Construct', 'Shadow Tag'],
	}, {
		name: "[Gen 7] Pokebank Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587184/\">Ubers Metagame Discussion</a>"],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	}, {
		name: "[Gen 7] Pokebank LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587196/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/sm/formats/lc/\">LC Banlist</a>",
		],

		mod: 'gen7',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Little Cup'],
		banlist: ['Drifloon', 'Gligar', 'Meditite', 'Misdreavus', 'Murkrow', 'Porygon', 'Scyther', 'Sneasel', 'Swirlix', 'Tangela', 'Yanma', 'Eevium Z', 'Dragon Rage', 'Sonic Boom'],
	}, {
		name: "[Gen 7] Pokebank Anything Goes",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587441/\">Anything Goes</a>"],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	}, {
		name: "[Gen 7] CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587865/\">CAP Metagame Discussion</a>",
		],

		mod: 'gen7',
		ruleset: ['[Gen 7] Pokebank OU'],
		banlist: ['Allow CAP'],
	}, {
		name: "[Gen 7] Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587473/\">Battle Spot Singles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587201/\">Battle Spot Singles Viability Ranking</a>",
		],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
		requirePentagon: true,
		onValidateSet: function (set) {
			let localDex = {
				"Abra": 1,
				"Absol": 1,
				"Aegislash": 1,
				"Aerodactyl": 1,
				"Alakazam": 1,
				"Alomomola": 1,
				"Araquanid": 1,
				"Arcanine": 1,
				"Archen": 1,
				"Archeops": 1,
				"Ariados": 1,
				"Axew": 1,
				"Azumarill": 1,
				"Azurill": 1,
				"Bagon": 1,
				"Barboach": 1,
				"Bastiodon": 1,
				"Bayleef": 1,
				"Beldum": 1,
				"Bellsprout": 1,
				"Bewear": 1,
				"Blissey": 1,
				"Boldore": 1,
				"Bonsly": 1,
				"Bounsweet": 1,
				"Braviary": 1,
				"Brionne": 1,
				"Bruxish": 1,
				"Budew": 1,
				"Butterfree": 1,
				"Buzzwole": 1,
				"Carbink": 1,
				"Carracosta": 1,
				"Carvanha": 1,
				"Castform": 1,
				"Caterpie": 1,
				"Celesteela": 1,
				"Chandelure": 1,
				"Chansey": 1,
				"Charjabug": 1,
				"Chikorita": 1,
				"Chinchou": 1,
				"Clefable": 1,
				"Clefairy": 1,
				"Cleffa": 1,
				"Cloyster": 1,
				"Comfey": 1,
				"Conkeldurr": 1,
				"Corsola": 1,
				"Cottonee": 1,
				"Crabominable": 1,
				"Crabrawler": 1,
				"Cranidos": 1,
				"Crobat": 1,
				"Croconaw": 1,
				"Cubone": 1,
				"Cutiefly": 1,
				"Cyndaquil": 1,
				"Dartrix": 1,
				"Decidueye": 1,
				"Deino": 1,
				"Delibird": 1,
				"Dewott": 1,
				"Dewpider": 1,
				"Dhelmise": 1,
				"Diglett": 1,
				"Ditto": 1,
				"Doublade": 1,
				"Dragonair": 1,
				"Dragonite": 1,
				"Drampa": 1,
				"Dratini": 1,
				"Drifblim": 1,
				"Drifloon": 1,
				"Drowzee": 1,
				"Dugtrio": 1,
				"Duosion": 1,
				"Eelektrik": 1,
				"Eelektross": 1,
				"Eevee": 1,
				"Electabuzz": 1,
				"Electivire": 1,
				"Elekid": 1,
				"Emboar": 1,
				"Emolga": 1,
				"Espeon": 1,
				"Exeggcute": 1,
				"Exeggutor": 1,
				"Fearow": 1,
				"Feebas": 1,
				"Feraligatr": 1,
				"Finneon": 1,
				"Flareon": 1,
				"Fletchinder": 1,
				"Fletchling": 1,
				"Flygon": 1,
				"Fomantis": 1,
				"Fraxure": 1,
				"Froslass": 1,
				"Gabite": 1,
				"Garbodor": 1,
				"Garchomp": 1,
				"Gastly": 1,
				"Gastrodon": 1,
				"Gengar": 1,
				"Geodude": 1,
				"Gible": 1,
				"Gigalith": 1,
				"Glaceon": 1,
				"Glalie": 1,
				"Golbat": 1,
				"Goldeen": 1,
				"Golduck": 1,
				"Golem": 1,
				"Golisopod": 1,
				"Goodra": 1,
				"Goomy": 1,
				"Gothita": 1,
				"Gothitelle": 1,
				"Gothorita": 1,
				"Granbull": 1,
				"Graveler": 1,
				"Grimer": 1,
				"Growlithe": 1,
				"Grubbin": 1,
				"Gumshoos": 1,
				"Gurdurr": 1,
				"Guzzlord": 1,
				"Gyarados": 1,
				"Hakamo-o": 1,
				"Happiny": 1,
				"Hariyama": 1,
				"Haunter": 1,
				"Haxorus": 1,
				"Herdier": 1,
				"Honchkrow": 1,
				"Honedge": 1,
				"Horsea": 1,
				"Hydreigon": 1,
				"Hypno": 1,
				"Igglybuff": 1,
				"Incineroar": 1,
				"Jangmo-o": 1,
				"Jigglypuff": 1,
				"Jolteon": 1,
				"Kadabra": 1,
				"Kangaskhan": 1,
				"Kartana": 1,
				"Kingdra": 1,
				"Klang": 1,
				"Klefki": 1,
				"Klink": 1,
				"Klinklang": 1,
				"Komala": 1,
				"Kommo-o": 1,
				"Krokorok": 1,
				"Krookodile": 1,
				"Lampent": 1,
				"Lanturn": 1,
				"Lapras": 1,
				"Leafeon": 1,
				"Leavanny": 1,
				"Ledian": 1,
				"Ledyba": 1,
				"Lilligant": 1,
				"Lillipup": 1,
				"Litten": 1,
				"Litwick": 1,
				"Lucario": 1,
				"Lumineon": 1,
				"Lurantis": 1,
				"Luvdisc": 1,
				"Luxio": 1,
				"Luxray": 1,
				"Lycanroc": 1,
				"Machamp": 1,
				"Machoke": 1,
				"Machop": 1,
				"Magby": 1,
				"Magikarp": 1,
				"Magmar": 1,
				"Magmortar": 1,
				"Magnemite": 1,
				"Magneton": 1,
				"Magnezone": 1,
				"Makuhita": 1,
				"Mamoswine": 1,
				"Mandibuzz": 1,
				"Mankey": 1,
				"Mareanie": 1,
				"Marill": 1,
				"Marowak": 1,
				"Masquerain": 1,
				"Meganium": 1,
				"Meowth": 1,
				"Metagross": 1,
				"Metang": 1,
				"Metapod": 1,
				"Milotic": 1,
				"Miltank": 1,
				"Mimikyu": 1,
				"Minior": 1,
				"Misdreavus": 1,
				"Mismagius": 1,
				"Morelull": 1,
				"Mudbray": 1,
				"Mudsdale": 1,
				"Muk": 1,
				"Munchlax": 1,
				"Murkrow": 1,
				"Nihilego": 1,
				"Ninetales": 1,
				"Nosepass": 1,
				"Oranguru": 1,
				"Oricorio": 1,
				"Oshawott": 1,
				"Palossand": 1,
				"Pancham": 1,
				"Pangoro": 1,
				"Paras": 1,
				"Parasect": 1,
				"Passimian": 1,
				"Pelipper": 1,
				"Persian": 1,
				"Petilil": 1,
				"Phantump": 1,
				"Pheromosa": 1,
				"Pichu": 1,
				"Pignite": 1,
				"Pikachu": 1,
				"Pikipek": 1,
				"Piloswine": 1,
				"Pinsir": 1,
				"Politoed": 1,
				"Poliwag": 1,
				"Poliwhirl": 1,
				"Poliwrath": 1,
				"Popplio": 1,
				"Porygon": 1,
				"Porygon-Z": 1,
				"Porygon2": 1,
				"Primarina": 1,
				"Primeape": 1,
				"Probopass": 1,
				"Psyduck": 1,
				"Pyukumuku": 1,
				"Quilava": 1,
				"Raichu": 1,
				"Rampardos": 1,
				"Raticate": 1,
				"Rattata": 1,
				"Relicanth": 1,
				"Reuniclus": 1,
				"Rhydon": 1,
				"Rhyhorn": 1,
				"Rhyperior": 1,
				"Ribombee": 1,
				"Riolu": 1,
				"Rockruff": 1,
				"Roggenrola": 1,
				"Roselia": 1,
				"Roserade": 1,
				"Rowlet": 1,
				"Rufflet": 1,
				"Sableye": 1,
				"Salamence": 1,
				"Salandit": 1,
				"Salazzle": 1,
				"Samurott": 1,
				"Sandile": 1,
				"Sandshrew": 1,
				"Sandslash": 1,
				"Sandygast": 1,
				"Scizor": 1,
				"Scolipede": 1,
				"Scyther": 1,
				"Seaking": 1,
				"Sealeo": 1,
				"Serperior": 1,
				"Servine": 1,
				"Sewaddle": 1,
				"Sharpedo": 1,
				"Shelgon": 1,
				"Shellder": 1,
				"Shellos": 1,
				"Shieldon": 1,
				"Shiinotic": 1,
				"Shinx": 1,
				"Silvally": 1,
				"Skarmory": 1,
				"Slaking": 1,
				"Slakoth": 1,
				"Sliggoo": 1,
				"Slowbro": 1,
				"Slowking": 1,
				"Slowpoke": 1,
				"Smeargle": 1,
				"Sneasel": 1,
				"Snivy": 1,
				"Snorlax": 1,
				"Snorunt": 1,
				"Snubbull": 1,
				"Solosis": 1,
				"Spearow": 1,
				"Spheal": 1,
				"Spinarak": 1,
				"Spinda": 1,
				"Staraptor": 1,
				"Staravia": 1,
				"Starly": 1,
				"Starmie": 1,
				"Staryu": 1,
				"Steenee": 1,
				"Stoutland": 1,
				"Stufful": 1,
				"Sudowoodo": 1,
				"Surskit": 1,
				"Swadloon": 1,
				"Swinub": 1,
				"Sylveon": 1,
				"Talonflame": 1,
				"Tapu Bulu": 1,
				"Tapu Fini": 1,
				"Tapu Koko": 1,
				"Tapu Lele": 1,
				"Tauros": 1,
				"Tentacool": 1,
				"Tentacruel": 1,
				"Tepig": 1,
				"Timburr": 1,
				"Tirtouga": 1,
				"Togedemaru": 1,
				"Togekiss": 1,
				"Togepi": 1,
				"Togetic": 1,
				"Torkoal": 1,
				"Torracat": 1,
				"Totodile": 1,
				"Toucannon": 1,
				"Toxapex": 1,
				"Trapinch": 1,
				"Trevenant": 1,
				"Trubbish": 1,
				"Trumbeak": 1,
				"Tsareena": 1,
				"Turtonator": 1,
				"Tynamo": 1,
				"Type: Null": 1,
				"Typhlosion": 1,
				"Umbreon": 1,
				"Vanillish": 1,
				"Vanillite": 1,
				"Vanilluxe": 1,
				"Vaporeon": 1,
				"Venipede": 1,
				"Vibrava": 1,
				"Victreebel": 1,
				"Vigoroth": 1,
				"Vikavolt": 1,
				"Vullaby": 1,
				"Vulpix": 1,
				"Wailmer": 1,
				"Wailord": 1,
				"Walrein": 1,
				"Weavile": 1,
				"Weepingbel": 1,
				"Whimsicott": 1,
				"Whirlipede": 1,
				"Whiscash": 1,
				"Wigglytuff": 1,
				"Wimpod": 1,
				"Wingull": 1,
				"Wishiwashi": 1,
				"Xurkitree": 1,
				"Yungoos": 1,
				"Zubat": 1,
				"Zweilous": 1,
			};
			let template = this.getTemplate(set.species || set.name);
			if (!(template.baseSpecies in localDex)) {
				return [template.baseSpecies + " is not permitted in Battle Spot Singles."];
			}
		},
	}, {
		name: "[Gen 7] Battle Spot Special 1",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3587169/\">Battle Spot Special</a>"],

		mod: 'gen7',
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
		requirePentagon: true,
		onValidateSet: function (set) {
			let localDex = {
				"Abra": 1,
				"Absol": 1,
				"Aegislash": 1,
				"Aerodactyl": 1,
				"Alakazam": 1,
				"Alomomola": 1,
				"Araquanid": 1,
				"Arcanine": 1,
				"Archen": 1,
				"Archeops": 1,
				"Ariados": 1,
				"Axew": 1,
				"Azumarill": 1,
				"Azurill": 1,
				"Bagon": 1,
				"Barboach": 1,
				"Bastiodon": 1,
				"Bayleef": 1,
				"Beldum": 1,
				"Bellsprout": 1,
				"Bewear": 1,
				"Blissey": 1,
				"Boldore": 1,
				"Bonsly": 1,
				"Bounsweet": 1,
				"Braviary": 1,
				"Brionne": 1,
				"Bruxish": 1,
				"Budew": 1,
				"Butterfree": 1,
				"Buzzwole": 1,
				"Carbink": 1,
				"Carracosta": 1,
				"Carvanha": 1,
				"Castform": 1,
				"Caterpie": 1,
				"Celesteela": 1,
				"Chandelure": 1,
				"Chansey": 1,
				"Charjabug": 1,
				"Chikorita": 1,
				"Chinchou": 1,
				"Clefable": 1,
				"Clefairy": 1,
				"Cleffa": 1,
				"Cloyster": 1,
				"Comfey": 1,
				"Conkeldurr": 1,
				"Corsola": 1,
				"Cottonee": 1,
				"Crabominable": 1,
				"Crabrawler": 1,
				"Cranidos": 1,
				"Crobat": 1,
				"Croconaw": 1,
				"Cubone": 1,
				"Cutiefly": 1,
				"Cyndaquil": 1,
				"Dartrix": 1,
				"Decidueye": 1,
				"Deino": 1,
				"Delibird": 1,
				"Dewott": 1,
				"Dewpider": 1,
				"Dhelmise": 1,
				"Diglett": 1,
				"Ditto": 1,
				"Doublade": 1,
				"Dragonair": 1,
				"Dragonite": 1,
				"Drampa": 1,
				"Dratini": 1,
				"Drifblim": 1,
				"Drifloon": 1,
				"Drowzee": 1,
				"Dugtrio": 1,
				"Duosion": 1,
				"Eelektrik": 1,
				"Eelektross": 1,
				"Eevee": 1,
				"Electabuzz": 1,
				"Electivire": 1,
				"Elekid": 1,
				"Emboar": 1,
				"Emolga": 1,
				"Espeon": 1,
				"Exeggcute": 1,
				"Exeggutor": 1,
				"Fearow": 1,
				"Feebas": 1,
				"Feraligatr": 1,
				"Finneon": 1,
				"Flareon": 1,
				"Fletchinder": 1,
				"Fletchling": 1,
				"Flygon": 1,
				"Fomantis": 1,
				"Fraxure": 1,
				"Froslass": 1,
				"Gabite": 1,
				"Garbodor": 1,
				"Garchomp": 1,
				"Gastly": 1,
				"Gastrodon": 1,
				"Gengar": 1,
				"Geodude": 1,
				"Gible": 1,
				"Gigalith": 1,
				"Glaceon": 1,
				"Glalie": 1,
				"Golbat": 1,
				"Goldeen": 1,
				"Golduck": 1,
				"Golem": 1,
				"Golisopod": 1,
				"Goodra": 1,
				"Goomy": 1,
				"Gothita": 1,
				"Gothitelle": 1,
				"Gothorita": 1,
				"Granbull": 1,
				"Graveler": 1,
				"Grimer": 1,
				"Growlithe": 1,
				"Grubbin": 1,
				"Gumshoos": 1,
				"Gurdurr": 1,
				"Guzzlord": 1,
				"Gyarados": 1,
				"Hakamo-o": 1,
				"Happiny": 1,
				"Hariyama": 1,
				"Haunter": 1,
				"Haxorus": 1,
				"Herdier": 1,
				"Honchkrow": 1,
				"Honedge": 1,
				"Horsea": 1,
				"Hydreigon": 1,
				"Hypno": 1,
				"Igglybuff": 1,
				"Incineroar": 1,
				"Jangmo-o": 1,
				"Jigglypuff": 1,
				"Jolteon": 1,
				"Kadabra": 1,
				"Kangaskhan": 1,
				"Kartana": 1,
				"Kingdra": 1,
				"Klang": 1,
				"Klefki": 1,
				"Klink": 1,
				"Klinklang": 1,
				"Komala": 1,
				"Kommo-o": 1,
				"Krokorok": 1,
				"Krookodile": 1,
				"Lampent": 1,
				"Lanturn": 1,
				"Lapras": 1,
				"Leafeon": 1,
				"Leavanny": 1,
				"Ledian": 1,
				"Ledyba": 1,
				"Lilligant": 1,
				"Lillipup": 1,
				"Litten": 1,
				"Litwick": 1,
				"Lucario": 1,
				"Lumineon": 1,
				"Lurantis": 1,
				"Luvdisc": 1,
				"Luxio": 1,
				"Luxray": 1,
				"Lycanroc": 1,
				"Machamp": 1,
				"Machoke": 1,
				"Machop": 1,
				"Magby": 1,
				"Magikarp": 1,
				"Magmar": 1,
				"Magmortar": 1,
				"Magnemite": 1,
				"Magneton": 1,
				"Magnezone": 1,
				"Makuhita": 1,
				"Mamoswine": 1,
				"Mandibuzz": 1,
				"Mankey": 1,
				"Mareanie": 1,
				"Marill": 1,
				"Marowak": 1,
				"Masquerain": 1,
				"Meganium": 1,
				"Meowth": 1,
				"Metagross": 1,
				"Metang": 1,
				"Metapod": 1,
				"Milotic": 1,
				"Miltank": 1,
				"Mimikyu": 1,
				"Minior": 1,
				"Misdreavus": 1,
				"Mismagius": 1,
				"Morelull": 1,
				"Mudbray": 1,
				"Mudsdale": 1,
				"Muk": 1,
				"Munchlax": 1,
				"Murkrow": 1,
				"Nihilego": 1,
				"Ninetales": 1,
				"Nosepass": 1,
				"Oranguru": 1,
				"Oricorio": 1,
				"Oshawott": 1,
				"Palossand": 1,
				"Pancham": 1,
				"Pangoro": 1,
				"Paras": 1,
				"Parasect": 1,
				"Passimian": 1,
				"Pelipper": 1,
				"Persian": 1,
				"Petilil": 1,
				"Phantump": 1,
				"Pheromosa": 1,
				"Pichu": 1,
				"Pignite": 1,
				"Pikachu": 1,
				"Pikipek": 1,
				"Piloswine": 1,
				"Pinsir": 1,
				"Politoed": 1,
				"Poliwag": 1,
				"Poliwhirl": 1,
				"Poliwrath": 1,
				"Popplio": 1,
				"Porygon": 1,
				"Porygon-Z": 1,
				"Porygon2": 1,
				"Primarina": 1,
				"Primeape": 1,
				"Probopass": 1,
				"Psyduck": 1,
				"Pyukumuku": 1,
				"Quilava": 1,
				"Raichu": 1,
				"Rampardos": 1,
				"Raticate": 1,
				"Rattata": 1,
				"Relicanth": 1,
				"Reuniclus": 1,
				"Rhydon": 1,
				"Rhyhorn": 1,
				"Rhyperior": 1,
				"Ribombee": 1,
				"Riolu": 1,
				"Rockruff": 1,
				"Roggenrola": 1,
				"Roselia": 1,
				"Roserade": 1,
				"Rowlet": 1,
				"Rufflet": 1,
				"Sableye": 1,
				"Salamence": 1,
				"Salandit": 1,
				"Salazzle": 1,
				"Samurott": 1,
				"Sandile": 1,
				"Sandshrew": 1,
				"Sandslash": 1,
				"Sandygast": 1,
				"Scizor": 1,
				"Scolipede": 1,
				"Scyther": 1,
				"Seaking": 1,
				"Sealeo": 1,
				"Serperior": 1,
				"Servine": 1,
				"Sewaddle": 1,
				"Sharpedo": 1,
				"Shelgon": 1,
				"Shellder": 1,
				"Shellos": 1,
				"Shieldon": 1,
				"Shiinotic": 1,
				"Shinx": 1,
				"Silvally": 1,
				"Skarmory": 1,
				"Slaking": 1,
				"Slakoth": 1,
				"Sliggoo": 1,
				"Slowbro": 1,
				"Slowking": 1,
				"Slowpoke": 1,
				"Smeargle": 1,
				"Sneasel": 1,
				"Snivy": 1,
				"Snorlax": 1,
				"Snorunt": 1,
				"Snubbull": 1,
				"Solosis": 1,
				"Spearow": 1,
				"Spheal": 1,
				"Spinarak": 1,
				"Spinda": 1,
				"Staraptor": 1,
				"Staravia": 1,
				"Starly": 1,
				"Starmie": 1,
				"Staryu": 1,
				"Steenee": 1,
				"Stoutland": 1,
				"Stufful": 1,
				"Sudowoodo": 1,
				"Surskit": 1,
				"Swadloon": 1,
				"Swinub": 1,
				"Sylveon": 1,
				"Talonflame": 1,
				"Tapu Bulu": 1,
				"Tapu Fini": 1,
				"Tapu Koko": 1,
				"Tapu Lele": 1,
				"Tauros": 1,
				"Tentacool": 1,
				"Tentacruel": 1,
				"Tepig": 1,
				"Timburr": 1,
				"Tirtouga": 1,
				"Togedemaru": 1,
				"Togekiss": 1,
				"Togepi": 1,
				"Togetic": 1,
				"Torkoal": 1,
				"Torracat": 1,
				"Totodile": 1,
				"Toucannon": 1,
				"Toxapex": 1,
				"Trapinch": 1,
				"Trevenant": 1,
				"Trubbish": 1,
				"Trumbeak": 1,
				"Tsareena": 1,
				"Turtonator": 1,
				"Tynamo": 1,
				"Type: Null": 1,
				"Typhlosion": 1,
				"Umbreon": 1,
				"Vanillish": 1,
				"Vanillite": 1,
				"Vanilluxe": 1,
				"Vaporeon": 1,
				"Venipede": 1,
				"Vibrava": 1,
				"Victreebel": 1,
				"Vigoroth": 1,
				"Vikavolt": 1,
				"Vullaby": 1,
				"Vulpix": 1,
				"Wailmer": 1,
				"Wailord": 1,
				"Walrein": 1,
				"Weavile": 1,
				"Weepingbel": 1,
				"Whimsicott": 1,
				"Whirlipede": 1,
				"Whiscash": 1,
				"Wigglytuff": 1,
				"Wimpod": 1,
				"Wingull": 1,
				"Wishiwashi": 1,
				"Xurkitree": 1,
				"Yungoos": 1,
				"Zubat": 1,
				"Zweilous": 1,
				"Solgaleo": 1,
				"Lunala": 1,
				"Magearna": 1,
			};
			let template = this.getTemplate(set.species || set.name);
			if (!(template.baseSpecies in localDex) && set.ability !== 'Battle Bond') {
				return [template.baseSpecies + " is not permitted in Battle Spot Special."];
			}
		},
		onValidateTeam: function (team) {
			for (let i = 0; i < team.length; i++) {
				if (toId(team[i].item)) return ["Items are not permitted in Battle Spot Special."];
			}
		},
	}, {
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// SM Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: "SM Doubles (beta)",
	}, {
		name: "[Gen 7] Random Doubles Battle",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Pokebank Doubles OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3586596/\">Doubles OU Metagame Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Lunala', 'Magearna', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	}, {
		name: "[Gen 7] Pokebank Doubles Ubers",

		mod: 'gen7',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased'],
	}, {
		name: "[Gen 7] VGC 2017",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3586596/\">VGC 2017 Discussion</a>"],

		mod: 'gen7',
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod', 'Alola Pokedex'],
		banlist: ['Illegal', 'Unreleased', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zygarde', 'Mega'],
		requirePentagon: true,
	}, {
		name: "[Gen 7] Battle Spot Doubles",

		mod: 'gen7',
		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
		requirePentagon: true,
		onValidateSet: function (set) {
			let localDex = {
				"Abra": 1,
				"Absol": 1,
				"Aegislash": 1,
				"Aerodactyl": 1,
				"Alakazam": 1,
				"Alomomola": 1,
				"Araquanid": 1,
				"Arcanine": 1,
				"Archen": 1,
				"Archeops": 1,
				"Ariados": 1,
				"Axew": 1,
				"Azumarill": 1,
				"Azurill": 1,
				"Bagon": 1,
				"Barboach": 1,
				"Bastiodon": 1,
				"Bayleef": 1,
				"Beldum": 1,
				"Bellsprout": 1,
				"Bewear": 1,
				"Blissey": 1,
				"Boldore": 1,
				"Bonsly": 1,
				"Bounsweet": 1,
				"Braviary": 1,
				"Brionne": 1,
				"Bruxish": 1,
				"Budew": 1,
				"Butterfree": 1,
				"Buzzwole": 1,
				"Carbink": 1,
				"Carracosta": 1,
				"Carvanha": 1,
				"Castform": 1,
				"Caterpie": 1,
				"Celesteela": 1,
				"Chandelure": 1,
				"Chansey": 1,
				"Charjabug": 1,
				"Chikorita": 1,
				"Chinchou": 1,
				"Clefable": 1,
				"Clefairy": 1,
				"Cleffa": 1,
				"Cloyster": 1,
				"Comfey": 1,
				"Conkeldurr": 1,
				"Corsola": 1,
				"Cottonee": 1,
				"Crabominable": 1,
				"Crabrawler": 1,
				"Cranidos": 1,
				"Crobat": 1,
				"Croconaw": 1,
				"Cubone": 1,
				"Cutiefly": 1,
				"Cyndaquil": 1,
				"Dartrix": 1,
				"Decidueye": 1,
				"Deino": 1,
				"Delibird": 1,
				"Dewott": 1,
				"Dewpider": 1,
				"Dhelmise": 1,
				"Diglett": 1,
				"Ditto": 1,
				"Doublade": 1,
				"Dragonair": 1,
				"Dragonite": 1,
				"Drampa": 1,
				"Dratini": 1,
				"Drifblim": 1,
				"Drifloon": 1,
				"Drowzee": 1,
				"Dugtrio": 1,
				"Duosion": 1,
				"Eelektrik": 1,
				"Eelektross": 1,
				"Eevee": 1,
				"Electabuzz": 1,
				"Electivire": 1,
				"Elekid": 1,
				"Emboar": 1,
				"Emolga": 1,
				"Espeon": 1,
				"Exeggcute": 1,
				"Exeggutor": 1,
				"Fearow": 1,
				"Feebas": 1,
				"Feraligatr": 1,
				"Finneon": 1,
				"Flareon": 1,
				"Fletchinder": 1,
				"Fletchling": 1,
				"Flygon": 1,
				"Fomantis": 1,
				"Fraxure": 1,
				"Froslass": 1,
				"Gabite": 1,
				"Garbodor": 1,
				"Garchomp": 1,
				"Gastly": 1,
				"Gastrodon": 1,
				"Gengar": 1,
				"Geodude": 1,
				"Gible": 1,
				"Gigalith": 1,
				"Glaceon": 1,
				"Glalie": 1,
				"Golbat": 1,
				"Goldeen": 1,
				"Golduck": 1,
				"Golem": 1,
				"Golisopod": 1,
				"Goodra": 1,
				"Goomy": 1,
				"Gothita": 1,
				"Gothitelle": 1,
				"Gothorita": 1,
				"Granbull": 1,
				"Graveler": 1,
				"Grimer": 1,
				"Growlithe": 1,
				"Grubbin": 1,
				"Gumshoos": 1,
				"Gurdurr": 1,
				"Guzzlord": 1,
				"Gyarados": 1,
				"Hakamo-o": 1,
				"Happiny": 1,
				"Hariyama": 1,
				"Haunter": 1,
				"Haxorus": 1,
				"Herdier": 1,
				"Honchkrow": 1,
				"Honedge": 1,
				"Horsea": 1,
				"Hydreigon": 1,
				"Hypno": 1,
				"Igglybuff": 1,
				"Incineroar": 1,
				"Jangmo-o": 1,
				"Jigglypuff": 1,
				"Jolteon": 1,
				"Kadabra": 1,
				"Kangaskhan": 1,
				"Kartana": 1,
				"Kingdra": 1,
				"Klang": 1,
				"Klefki": 1,
				"Klink": 1,
				"Klinklang": 1,
				"Komala": 1,
				"Kommo-o": 1,
				"Krokorok": 1,
				"Krookodile": 1,
				"Lampent": 1,
				"Lanturn": 1,
				"Lapras": 1,
				"Leafeon": 1,
				"Leavanny": 1,
				"Ledian": 1,
				"Ledyba": 1,
				"Lilligant": 1,
				"Lillipup": 1,
				"Litten": 1,
				"Litwick": 1,
				"Lucario": 1,
				"Lumineon": 1,
				"Lurantis": 1,
				"Luvdisc": 1,
				"Luxio": 1,
				"Luxray": 1,
				"Lycanroc": 1,
				"Machamp": 1,
				"Machoke": 1,
				"Machop": 1,
				"Magby": 1,
				"Magikarp": 1,
				"Magmar": 1,
				"Magmortar": 1,
				"Magnemite": 1,
				"Magneton": 1,
				"Magnezone": 1,
				"Makuhita": 1,
				"Mamoswine": 1,
				"Mandibuzz": 1,
				"Mankey": 1,
				"Mareanie": 1,
				"Marill": 1,
				"Marowak": 1,
				"Masquerain": 1,
				"Meganium": 1,
				"Meowth": 1,
				"Metagross": 1,
				"Metang": 1,
				"Metapod": 1,
				"Milotic": 1,
				"Miltank": 1,
				"Mimikyu": 1,
				"Minior": 1,
				"Misdreavus": 1,
				"Mismagius": 1,
				"Morelull": 1,
				"Mudbray": 1,
				"Mudsdale": 1,
				"Muk": 1,
				"Munchlax": 1,
				"Murkrow": 1,
				"Nihilego": 1,
				"Ninetales": 1,
				"Nosepass": 1,
				"Oranguru": 1,
				"Oricorio": 1,
				"Oshawott": 1,
				"Palossand": 1,
				"Pancham": 1,
				"Pangoro": 1,
				"Paras": 1,
				"Parasect": 1,
				"Passimian": 1,
				"Pelipper": 1,
				"Persian": 1,
				"Petilil": 1,
				"Phantump": 1,
				"Pheromosa": 1,
				"Pichu": 1,
				"Pignite": 1,
				"Pikachu": 1,
				"Pikipek": 1,
				"Piloswine": 1,
				"Pinsir": 1,
				"Politoed": 1,
				"Poliwag": 1,
				"Poliwhirl": 1,
				"Poliwrath": 1,
				"Popplio": 1,
				"Porygon": 1,
				"Porygon-Z": 1,
				"Porygon2": 1,
				"Primarina": 1,
				"Primeape": 1,
				"Probopass": 1,
				"Psyduck": 1,
				"Pyukumuku": 1,
				"Quilava": 1,
				"Raichu": 1,
				"Rampardos": 1,
				"Raticate": 1,
				"Rattata": 1,
				"Relicanth": 1,
				"Reuniclus": 1,
				"Rhydon": 1,
				"Rhyhorn": 1,
				"Rhyperior": 1,
				"Ribombee": 1,
				"Riolu": 1,
				"Rockruff": 1,
				"Roggenrola": 1,
				"Roselia": 1,
				"Roserade": 1,
				"Rowlet": 1,
				"Rufflet": 1,
				"Sableye": 1,
				"Salamence": 1,
				"Salandit": 1,
				"Salazzle": 1,
				"Samurott": 1,
				"Sandile": 1,
				"Sandshrew": 1,
				"Sandslash": 1,
				"Sandygast": 1,
				"Scizor": 1,
				"Scolipede": 1,
				"Scyther": 1,
				"Seaking": 1,
				"Sealeo": 1,
				"Serperior": 1,
				"Servine": 1,
				"Sewaddle": 1,
				"Sharpedo": 1,
				"Shelgon": 1,
				"Shellder": 1,
				"Shellos": 1,
				"Shieldon": 1,
				"Shiinotic": 1,
				"Shinx": 1,
				"Silvally": 1,
				"Skarmory": 1,
				"Slaking": 1,
				"Slakoth": 1,
				"Sliggoo": 1,
				"Slowbro": 1,
				"Slowking": 1,
				"Slowpoke": 1,
				"Smeargle": 1,
				"Sneasel": 1,
				"Snivy": 1,
				"Snorlax": 1,
				"Snorunt": 1,
				"Snubbull": 1,
				"Solosis": 1,
				"Spearow": 1,
				"Spheal": 1,
				"Spinarak": 1,
				"Spinda": 1,
				"Staraptor": 1,
				"Staravia": 1,
				"Starly": 1,
				"Starmie": 1,
				"Staryu": 1,
				"Steenee": 1,
				"Stoutland": 1,
				"Stufful": 1,
				"Sudowoodo": 1,
				"Surskit": 1,
				"Swadloon": 1,
				"Swinub": 1,
				"Sylveon": 1,
				"Talonflame": 1,
				"Tapu Bulu": 1,
				"Tapu Fini": 1,
				"Tapu Koko": 1,
				"Tapu Lele": 1,
				"Tauros": 1,
				"Tentacool": 1,
				"Tentacruel": 1,
				"Tepig": 1,
				"Timburr": 1,
				"Tirtouga": 1,
				"Togedemaru": 1,
				"Togekiss": 1,
				"Togepi": 1,
				"Togetic": 1,
				"Torkoal": 1,
				"Torracat": 1,
				"Totodile": 1,
				"Toucannon": 1,
				"Toxapex": 1,
				"Trapinch": 1,
				"Trevenant": 1,
				"Trubbish": 1,
				"Trumbeak": 1,
				"Tsareena": 1,
				"Turtonator": 1,
				"Tynamo": 1,
				"Type: Null": 1,
				"Typhlosion": 1,
				"Umbreon": 1,
				"Vanillish": 1,
				"Vanillite": 1,
				"Vanilluxe": 1,
				"Vaporeon": 1,
				"Venipede": 1,
				"Vibrava": 1,
				"Victreebel": 1,
				"Vigoroth": 1,
				"Vikavolt": 1,
				"Vullaby": 1,
				"Vulpix": 1,
				"Wailmer": 1,
				"Wailord": 1,
				"Walrein": 1,
				"Weavile": 1,
				"Weepingbel": 1,
				"Whimsicott": 1,
				"Whirlipede": 1,
				"Whiscash": 1,
				"Wigglytuff": 1,
				"Wimpod": 1,
				"Wingull": 1,
				"Wishiwashi": 1,
				"Xurkitree": 1,
				"Yungoos": 1,
				"Zubat": 1,
				"Zweilous": 1,
			};
			let template = this.getTemplate(set.species || set.name);
			if (!(template.baseSpecies in localDex)) {
				return [template.baseSpecies + " is not permitted in Battle Spot Doubles."];
			}
		},
	}, {
		name: "[Gen 7] Doubles Custom Game",

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	///////////////////////////////////////////////////////
	// SpacialGaze Metagames
	{
		section: 'Spacialgaze Metagames',
		column: 2,
	}, {
		name: "[Gen 7] Super Staff Bros",

		mod: 'sgssb',
		team: 'randomSeasonalRegStaff',
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		onBegin: function () {
			this.add('message', 'GET READY FOR THE NEXT BATTLE!');

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
			}
		},
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);

			// stat boosts.

			if (name === 'therun') {
				this.add('c', '+The Run', 'Are you fast enough?');
			}
			if (name === 'serperiorater') {
				this.add('c', '%Serperiorater', 'The badossness has arrived.');
			}
			if (name === 'vacuo') {
				this.add('c', '@Vacuo', 'glhf');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'All right, time for a Umich sweep!');
			}
			if (name === 'ducktown') {
				this.add('c', '%ducktown', 'Beware! You are entering a town of ducks!');
			}
			if (name === 'hurricaned') {
				this.add('c', '@Hurricane\'d', 'Ay lmao it\'s ya boi. CAP is the best tier, so let me show you.');
			}
			if (name === 'hoeenhero') {
				this.add('c', '~HoeenHero', 'Do I have to? I\'m in the middle of programming.');
			}
			if (name === 'hiroz') {
				this.add('c', '&HiroZ', 'Your wing isn\'t able to fly anywhere!');
			}
			if (name === 'admewn') {
				this.add('c', '+Admewn', 'This battle will be amewsing :]');
			}
			if (name === 'vulcaron') {
				this.add('c', '%Vulcaron', 'I will scorch you with 628 blue flames!!! ...I\'m really bad at this.');
			}
			if (name === 'mystifi') {
				this.add('c', '~Mystifi', '__I\'ll HM01 u faster then sanic m89__');
			}
			if (name === 'krakenmare') {
				this.add('c', '@Kraken Mare', 'You can\'t touch the master of RAGE!');
			}
			if (name === 'almightybronzong') {
				this.add('c', '@Almighty Bronzong', '``All hail.``');
			}
			if (name === 'opple') {
				this.add('c', '+Opple', 'lol hi');
			}
			if (name === 'mimiroppu') {
				this.add('c', '@Mimiroppu', 'Mimiroppu, charm up~');
			}
			if (name === 'bdh93') {
				this.add('c', '@BDH93', 'Time for some trolling');
			}
			if (name === 'c733937123') {
				this.add('c', '@C733937 123', 'Hello opponent, Welcome to Spacial Bros, I, C733937 123, shall defeat you.....hopefully.');
			}
			if (name === 'spacialbot') {
				this.add('c', '%Spacial Bot', '``Bot rebooting...``');
				this.add('c', '%Spacial Bot', '``Rebooting complete. Beginning to engage in battle.``');
			}
			if (name === 'hydrostatics') {
				this.add('c', '+Hydrostatics', 'Dare to fight me??');
			}
			if (name === 'auction') {
				this.add('c', '+Auction', 'I think its time for the man to take his throne.');
			}
			if (name === 'saberran') {
				this.add('c', '+Saber Ran', 'Watch Out Ice mons!');
			}
			if (name === 'xavier1942') {
				this.add('c', '+Xavier1942', 'Behold, THE GREAT WALL OF...um...HAAAAAAX!');
			}
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.hp) return;
			let name = toId(pokemon.name);

			if (name === 'therun') {
				this.add('c', '+The Run', 'I\'ll be back faster than the speed of light');
			}
			if (name === 'hoeenhero') {
				this.add('c', '~Hoeenhero', 'I can\'t battle now, i\'m too busy.');
			}
			if (name === 'hurricaned') {
				this.add('c', '@Hurricane\'d', 'Ay ya boi is gettin outta here. Later asshat');
			}
			if (name === 'ducktown') {
				this.add('c', '%ducktown', 'My other ducks will come attack you!');
			}
			if (name === 'vacuo') {
				this.add('c', '@Vacuo', 'lmfao brb');
			}
			if (name === 'serperiorater') {
				this.add('c', '%Serperiorater', 'Don\'t worry, I\'ll be back later, so be prepared.');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'I\'m gonna hand this over to a friend, you\'re not worth the effort');
			}
			if (name === 'hiroz') {
				this.add('c', '&HiroZ', 'Crawl like the insect you are, I\'ll be back!');
			}
			if (name === 'vulcaron') {
				this.add('c', '%Vulcaron', 'I\'ll be back, I have a lot of free time');
			}
			if (name === 'krakenmare') {
				this.add('c', '@Kraken Mare', 'I shall spare you today, young one!');
			}
			if (name === 'almightybronzong') {
				this.add('c', '@Almighty Bronzong', '``I\'m off, night``');
			}
			if (name === 'admewn') {
				this.add('c', '+Admewn', 'Brb, I\'ll be mewting someone :]');
			}
			if (name === 'xavier1942') {
				this.add('c', '+Xavier1942', 'I\'ll be back, i have business to take care of *Runs away shouting "WEE WOO WEE WOO WEE WOO*');
			}
			if (name === 'mimiroppu') {
				this.add('c', '@Mimiroppu', 'I\'ll be back soon bitches');
			}
			if (name === 'bdh93') {
				this.add('c', '@BDH93', 'I\'ll be back for more trolling');
			}
			if (name === 'spacialbot') {
				this.add('c', '+The Run', '.battleswitchout');
				this.add('c', '%Spacial Bot', '``var returnMessage = alert("Will return with more power.")``');
			}
			if (name === 'auction') {
				this.add('c', '+Auction', 'I think I should take a bathroom break');
			}
			if (name === 'c733937123') {
				this.add('c', '@C733937 123', '*laughs* Now you have to defeat a stronger ally....and have to still face me later where I can have a better chance at *distorted voice* KiLlInG YoU To wIn!!!');
			}
			if (name === 'hydrostatics') {
				this.add('c', '+Hydrostatics', '/me has studies');
			}
		},
		onModifyPokemon: function (pokemon) {
			//let name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			let moves = pokemon.moveset;
			if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
				for (let i = 0; i < 3; i++) {
					if (!moves[i].disabled) {
						pokemon.disableMove(moves[i].id, false);
						moves[i].disabled = true;
					}
				}
			}
		},
		onFaint: function (pokemon) {
			let name = toId(pokemon.name);

			// custom messages.

			if (name === 'therun') {
				this.add('c', '+The Run', 'So much for being faster...');
			}
			if (name === 'hoeenhero') {
				this.add('c', '~HoeenHero', 'Hey! Thats more hax than I get to use >:(');
			}
			if (name === 'vulcaron') {
				this.add('c', '%Vulcaron', 'The flames are dowsed.');
			}
			if (name === 'mystifi') {
				this.add('c', '~Mystifi', '**WOW U HACKER I\'M REPORTING YOU TO ZAREL**');
			}
			if (name === 'hurricaned') {
				this.add('c', '@Hurricane\'d', 'You did this because I like CAP didn\'t you. I bet you like OU as well. You\'re tier-ist');
			}
			if (name === 'serperiorater') {
				this.add('c', '%Serperiorater', 'Dammit Benny, why ya gotta be that guy?');
			}
			if (name === 'hiroz') {
				this.add('c', '&HiroZ', 'Argh... scumbag...');
			}
			if (name === 'xavier1942') {
				this.add('c', '+Xavier1942', 'Nuuuuu! MY BEAUTIFUL WALL! ');
			}
			if (name === 'ducktown') {
				this.add('c', '%ducktown', 'Quack Quack Quaaaaaa...');
			}
			if (name === 'vacuo') {
				this.add('c', '@Vacuo', 'yeah so I\'mma go get some food see you later');
			}
			if (name === 'admewn') {
				this.add('c', '+Admewn', 'Turn off the mewsic! I\'m out!');
			}
			if (name === 'krakenmare') {
				this.add('c', '@Kraken Mare', 'The RAGE wasn\'t enough to overpower you!');
			}
			if (name === 'almightybronzong') {
				this.add('c', '@Almighty Bronzong', '``Nice achievement.``');
			}
			if (name === 'hydrostatics') {
				this.add('c', '+Hydrostatics', 'Ok! It was a nice warm up for me! Let\'s battle for real the next time! ;)');
			}
			if (name === 'umichbrendan') {
				this.add('c', '+UmichBrendan', 'I lost? How is that possible?');
			}
			if (name === 'opple') {
				this.add('c', '+Opple', 'I call hacks, fine. You got me, lol, I\'ll get you next time!');
			}
			if (name === 'mimiroppu') {
				this.add('c', '@Mimiroppu', 'Sorry \'bout it...');
			}
			if (name === 'c733937123') {
				this.add('c', '@C733937 123', 'What, I...got defeated by some lousy fighter like you??? Well...Good luck next time we fight for both of us....but why did I lose?');
			}
			if (name === 'bdh93') {
				this.add('c', '@BDH93', 'Aww man! No more trolling :(');
			}
			if (name === 'spacialbot') {
				this.add('c', '%Spacial Bot', 'I blame my creator for my loss');
			}
			if (name === 'auction') {
				this.add('c', '+Auction', 'Ya know, I think I should\'ve gotten __burn everything__ as my ability ;_;');
			}
			if (name === 'saberran') {
				this.add('c', '+Saber Ran', 'No Fair flygon cant be beat D:');
			}
		},
	}, {
		section: 'Spacialgaze Metagames',
		column: 2,
	}, {
		name: "[Gen 7] Pokemon Mystery Dungeon",

		mod: 'pmd',
		team: 'randomPmd',
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				allPokemon[i].maxhp *= 5;
				allPokemon[i].hp = allPokemon[i].maxhp;
			}
		},
	}, {
		section: 'Spacialgaze Metagames',
		column: 2,
	}, {
		name: "[Gen 1] Retro Super Staff Bros",
		desc: ["Happy B-Day Johto/Regional/SpacialGaze! Celebrate with this mashup of old staff!"],

		mod: 'retrossb',
		team: 'randomRetroStaff',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|Retro Super Staff Bros. <b>Return of the old staff!!!!</b>");

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last] && !pokemon.set.noCustom) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
			}
		},
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (name === 'hoeenkid') this.add('c|&HoeenKid|One day I will be a Hero!');
			//if (name === 'opple') this.add('c|@Opple|Default Message');
			if (name === 'supersonicx') this.add('c|~supersonicx|I am the best pokemon here!');
		},
		onFaint: function (pokemon, source, effect) {
			let name = toId(pokemon.name);
			if (name === 'hoeenkid') this.add('c|&HoeenKid|But not today...');
			//if (name === 'opple') this.add('c|@Opple|Default Message');
			if (name === 'supersonicx') this.add('c|~supersonicx|I\'m reporting you for cheating!');
		},
	}, {
		section: 'Spacialgaze Metagames',
		column: 2,
	}, {
		name: "[Gen 7] Super Staff Bros Free For All",
		desc: ['Duke it out with other users custom made pokemon.',
			'Make your own as well! Get started with <button class="button" name="send" value="/ssb edit">/ssb edit</button>.',
			'Use <button class="button" name="send" value="/ssb">/ssb</button> for the commands you can use.',
		],

		mod: 'cssb',
		team: 'randomCustomSSB',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|<h2>Free for All!</h2>");
			this.add("raw|<h3>3</h3>");
			this.add("raw|<h3>2</h3>");
			this.add("raw|<h3>1</h3>");
			this.add("raw|<h1>BATTLE!</h1>");
		},
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////

	{
		section: "OM of the Month",
		column: 2,
	}, {
		name: "[Gen 7] STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587949/\">STABmons</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Ignore STAB Moves',
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', "King's Rock", 'Razor Fang', 'Salamencite',
		],
	}, {
		name: "[Gen 7] Middle Cup",
		desc: [
			"Only middle evolutions are allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3588047/\">Middle Cup</a>",
		],

		mod: 'gen7',
		searchShow: false,
		maxLevel: 50,
		defaultLevel: 50,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Eviolite', 'Light Ball', 'Baton Pass'],
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			if (!template.prevo || !template.nfe) {
				return [set.species + " is not the middle Pokémon in an evolution chain."];
			}
		},
	}, {
		section: "Other Metagames",
		column: 2,
	}, {
		name: "[Gen 7] Balanced Hackmons",
		desc: [
			"Anything that can be hacked in-game and is usable in local battles is allowed.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587475/\">Balanced Hackmons</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Arena Trap', 'Huge Power', 'Moody', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Chatter', 'Extreme Evoboost'],
	}, {
		name: "[Gen 7] 1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587523/\">1v1</a>",
		],

		mod: 'gen7',
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: [
			'Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Chansey + Charm + Seismic Toss',
		],
	}, {
		name: "[Gen 7] Monotype",
		desc: [
			"All the Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587204/\">Monotype</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: [
			'Aegislash', 'Arceus', 'Blaziken', 'Deoxys-Base', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Smooth Rock', 'Terrain Extender',
		],
	}, {
		name: "[Gen 7] Mix and Mega",
		desc: [
			"Mega Stones and Primal Orbs can be used on almost any fully evolved Pok&eacute;mon with no Mega Evolution limit.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587740/\">Mix and Mega</a>",
		],

		mod: 'mixandmega',
		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Mega Rayquaza Clause', 'Team Preview'],
		banlist: ['Baton Pass'],
		onValidateTeam: function (team) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (item in itemTable && itemTable[item] >= 2) {
					if (item.megaStone) return ["You are limited to two of each Mega Stone.", "(You have more than two " + this.getItem(item).name + ")"];
					if (item.id === 'blueorb' || item.id === 'redorb') return ["You are limited to two of each Primal Orb.", "(You have more than two " + this.getItem(item).name + ")"];
					itemTable[item]++;
				} else {
					itemTable[item] = 1;
				}
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (template.baseSpecies === 'Groudon' && item.id === 'redorb') || (template.baseSpecies === 'Kyogre' && item.id === 'blueorb')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			let uberStones = ['beedrillite', 'gengarite', 'kangaskhanite', 'mawilite', 'medichamite'];
			if (template.tier === 'Uber' || template.tier === 'Bank-Uber' || set.ability === 'Power Construct' || uberStones.includes(item.id)) return ["" + template.species + " is not allowed to hold " + item.name + "."];
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchIn: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				// Place volatiles on the Pokémon to show its mega-evolved condition and details
				this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
				let oTemplate = this.getTemplate(pokemon.originalSpecies);
				if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	}, {
		name: "[Gen 7] Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587901/\">Almost Any Ability</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Aegislash', 'Arceus', 'Archeops', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {
				'Arena Trap': 1,
				'Contrary': 1,
				'Fur Coat': 1,
				'Huge Power': 1,
				'Imposter': 1,
				'Pure Power': 1,
				'Simple': 1,
				'Water Bubble': 1,
				'Wonder Guard': 1,
			};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	}, {
		name: "[Gen 7] Sketchmons",
		desc: [
			"Pok&eacute;mon gain access to one Sketched move.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3587743/\">Sketchmons</a>",
		],

		mod: 'gen7',
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Baton Pass Clause'],
		banlist: ['Allow One Sketch',
			'Aegislash', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Dialga', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Lunala', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zekrom',
			'Power Construct', 'Shadow Tag', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Salamencite',
		],
		onValidateTeam: function (team) {
			let sketchedMoves = {};
			for (let i = 0; i < team.length; i++) {
				let move = team[i].sketchmonsMove;
				if (!move) continue;
				if (move in sketchedMoves) {
					return ["You are limited to sketching one of each move by Move Clause.", "(You have sketched " + this.getMove(move).name + " more than once)"];
				}
				sketchedMoves[move] = (team[i].name || team[i].species);
			}
		},
	}, {
		name: "[Gen 7] Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			// "&bullet; <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a>",
		],

		searchShow: false,
		mod: 'hiddentype',
		ruleset: ['[Gen 7] Pokebank OU'],
	}, {
		name: "[Gen 7] 2v2 Doubles",
		desc: ["Doubles battle where you bring four Pok&eacute;mon to Team Preview and choose only two."],

		mod: 'gen7',
		gameType: 'doubles',
		searchShow: false,
		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['[Gen 7] Pokebank Doubles OU'],
		banlist: [],
	}, {
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU'],
	}, {
		name: "Gen-NEXT OU",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},

	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 2,
	}, {
		name: "Battle Factory",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	}, {
		name: "[Gen 7] Challenge Cup 1v1",

		mod: 'gen7',
		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	}, {
		name: "[Gen 7] Monotype Random Battle",

		mod: 'gen7',
		team: 'random',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],

		mod: 'gen7',
		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 7] Doubles Hackmons Cup",

		mod: 'gen7',
		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// RoA Spotlight
	///////////////////////////////////////////////////////////////////

	{
		section: "RoA Spotlight",
		column: 3,
	}, {
		name: "[Gen 5] Anything Goes",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	},

	// ORAS Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Singles",
		column: 3,
	}, {
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3573990/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3571990/\">OU Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	}, {
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
	}, {
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3582473/\">np: UU Stage 7.3</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555277/\">UU Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought', 'Baton Pass'],
	}, {
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3583022/\">np: RU Stage 19</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
		],

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'UU', 'BL2', 'Drizzle', 'Drought'],
	}, {
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3576747/\">np: NU Stage 15</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555650/\">NU Viability Ranking</a>",
		],

		ruleset: ['RU', 'Baton Pass Speed Clause'],
		banlist: ['RU', 'BL3'],
	}, {
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3578583/\">np: PU Stage 9</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],

		ruleset: ['RU'],
		banlist: ['RU', 'BL3', 'NU', 'BL4', 'Chatter'],
	}, {
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/lc/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	}, {
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>",
		],

		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
	}, {
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
		],

		searchShow: false,
		ruleset: ['OU'],
		banlist: ['Allow CAP'],
	}, {
		name: "Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>",
		],

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "Inverse Battle",

		searchShow: false,
		ruleset: ['Pokemon', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased'],
		onNegateImmunity: false,
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	}, {
		name: "[Gen 6] Random Battle",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "Custom Game",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// ORAS Doubles/Triples
	///////////////////////////////////////////////////////////////////

	{
		section: "ORAS Doubles/Triples",
	}, {
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580680/\">np: Doubles OU Stage 5</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom', 'Soul Dew',
			'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder',
		],
	}, {
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Dark Void'],
	}, {
		name: "Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: [
			'Aegislash', 'Amoonguss', 'Arcanine', 'Azumarill', 'Bisharp', 'Breloom', 'Charizard-Mega-Y', 'Charizardite Y',
			'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Ferrothorn', 'Garchomp', 'Gardevoir-Mega', 'Gardevoirite',
			'Gastrodon', 'Gengar', 'Greninja', 'Heatran', 'Hitmontop', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi',
			'Kangaskhan-Mega', 'Kangaskhanite', 'Keldeo', 'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Milotic',
			'Politoed', 'Raichu', 'Rotom-Wash', 'Scizor', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon', 'Talonflame',
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Volcanion', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	}, {
		name: "VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3580592/\">VGC 2016 Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: [
			'Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy', 'Darkrai',
			'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Volcanion', 'Soul Dew',
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {
				'Mewtwo': 1,
				'Lugia': 1,
				'Ho-Oh': 1,
				'Kyogre': 1,
				'Groudon': 1,
				'Rayquaza': 1,
				'Dialga': 1,
				'Palkia': 1,
				'Giratina': 1,
				'Reshiram': 1,
				'Zekrom': 1,
				'Kyurem': 1,
				'Xerneas': 1,
				'Yveltal': 1,
				'Zygarde': 1,
			};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	}, {
		name: "Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560820/\">Battle Spot Doubles Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560824/\">Battle Spot Doubles Viability Ranking</a>",
		],

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "[Gen 6] Random Doubles Battle",

		gameType: 'doubles',
		team: 'random',
		searchShow: false,
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "Doubles Custom Game",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	}, {
		name: "Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>",
		],

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	}, {
		name: "Triples Custom Game",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		section: "BW2 Singles",
		column: 4,
	}, {
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	}, {
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
	}, {
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	}, {
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	}, {
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	}, {
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	}, {
		name: "[Gen 5] GBU Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	}, {
		name: "[Gen 5] Random Battle",

		mod: 'gen5',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 5] Custom Game",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Doubles
	///////////////////////////////////////////////////////////////////

	{
		section: 'BW2 Doubles',
		column: 4,
	}, {
		name: "[Gen 5] Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533424/\">BW2 Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533421/\">BW2 Doubles Viability Ranking</a>",
		],

		mod: 'gen5',
		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: [
			'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Jirachi',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop',
		],
	}, {
		name: "[Gen 5] GBU Doubles",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	}, {
		name: "[Gen 5] Doubles Custom Game",

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Generations",
		column: 4,
	}, {
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	}, {
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	}, {
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	}, {
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['LC Uber', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma', 'Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom'],
	}, {
		name: "[Gen 4] Custom Game",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	}, {
		name: "[Gen 4] Doubles Custom Game",

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	}, {
		name: "[Gen 3] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	}, {
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	}, {
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	}, {
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	}, {
		name: "[Gen 2] Random Battle",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	}, {
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	}, {
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	}, {
		name: "[Gen 1] OU (tradeback)",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Allow Tradeback', 'Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	}, {
		name: "[Gen 1] Random Battle",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 1] Challenge Cup",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	}, {
		name: "[Gen 1] Stadium",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	}, {
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
];
