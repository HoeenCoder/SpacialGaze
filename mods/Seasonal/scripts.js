'use strict';

exports.BattleScripts = {
	randomPvZTeam: function () {
		let pool = [
			'Abomasnow', 'Amoonguss', 'Bayleef', 'Bellossom', 'Bellsprout', 'Bounsweet', 'Breloom', 'Bulbasaur', 'Cacnea', 'Cacturne', 'Carnivine',
			'Cherrim', 'Cherubi', 'Chikorita', 'Comfey', 'Cottonee', 'Exeggcute', 'Exeggutor', 'Ferroseed', 'Ferrothorn', 'Fomantis', 'Foongus',
			'Gloom', 'Grotle', 'Hoppip', 'Ivysaur', 'Jumpluff', 'Lilligant', 'Lombre', 'Lotad', 'Ludicolo', 'Lurantis', 'Maractus', 'Meganium',
			'Morelull', 'Nuzleaf', 'Oddish', 'Paras', 'Parasect', 'Petilil', 'Phantump', 'Roselia', 'Roserade', 'Seedot', 'Serperior', 'Servine',
			'Shiftry', 'Shiinotic', 'Shroomish', 'Skiploom', 'Snivy', 'Snover', 'Steenee', 'Sunflora', 'Sunkern', 'Tangela', 'Tangrowth', 'Torterra',
			'Trevenant', 'Tropius', 'Tsareena', 'Turtwig', 'Venusaur', 'Victreebel', 'Vileplume', 'Weepinbell', 'Whimsicott', 'Accelgor',
			'Araquanid', 'Ariados', 'Beautifly', 'Beedrill', 'Burmy', 'Butterfree', 'Cascoon', 'Caterpie', 'Charjabug', 'Combee', 'Crustle',
			'Cutiefly', 'Dewpider', 'Drapion', 'Durant', 'Dustox', 'Dwebble', 'Escavalier', 'Flygon', 'Forretress', 'Galvantula', 'Gligar',
			'Gliscor', 'Golisopod', 'Grubbin', 'Heracross', 'Illumise', 'Joltik', 'Kakuna', 'Karrablast', 'Kricketot', 'Kricketune',
			'Larvesta', 'Leavanny', 'Ledian', 'Ledyba', 'Masquerain', 'Metapod', 'Mothim', 'Nincada', 'Ninjask', 'Pineco', 'Pinsir',
			'Ribombee', 'Scatterbug', 'Scizor', 'Scolipede', 'Scyther', 'Sewaddle', 'Shelmet', 'Shuckle', 'Silcoon', 'Skorupi', 'Spewpa',
			'Spinarak', 'Surskit', 'Swadloon', 'Trapinch', 'Venipede', 'Venomoth', 'Venonat', 'Vespiquen', 'Vibrava', 'Vikavolt', 'Vivillon',
			'Volbeat', 'Volcarona', 'Weedle', 'Whirlipede', 'Wimpod', 'Wormadam', 'Wurmple', 'Yanma', 'Yanmega',
		];
		let team = [];

		for (let i = 0; i < 6; i++) {
			let mon = this.sampleNoReplace(pool);
			let template = this.getTemplate(mon);
			let set = this.randomSet(template, i, {megaCount: 1});
			set.species = mon;
			if (mon === 'ludicolo') {
				set.name = 'HoeenHero';
				set.item = 'leftovers';
				set.ability = 'primordialsea';
				set.moves = ['scald', 'gigadrain', 'calmmind', 'focusblast'];
			} else if (mon === 'amoonguss') {
				set.name = 'Mystifung';
			}
			set.moves[4] = 'growth';
			if (set.item === 'Assault Vest') {
				set.item = 'Leftovers';
			}
			if (set.item === 'Choice Band' || set.item === 'Choice Specs') {
				set.item = 'Life Orb';
			}
		}
		team.push(set);

		return team;
	},
};
