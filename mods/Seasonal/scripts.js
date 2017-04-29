randomSpoopyTeam: function () {
		let pool = [
			'ekans', 'arbok', 'golbat', 'parasect', 'muk', 'gengar', 'marowak', 'weezing', 'tangela', 'mr. mime', 'ditto',
			'kabutops', 'noctowl', 'ariados', 'crobat', 'umbreon', 'murkrow', 'misdreavus', 'gligar', 'granbull', 'sneasel',
			'houndoom', 'mightyena', 'dustox', 'shiftry', 'shedinja', 'exploud', 'sableye', 'mawile', 'swalot', 'carvanha',
			'sharpedo', 'cacturne', 'seviper', 'lunatone', 'claydol', 'shuppet', 'banette', 'duskull', 'dusclops', 'absol',
			'snorunt', 'glalie', 'drifloon', 'drifblim', 'mismagius', 'honchkrow', 'skuntank', 'spiritomb', 'drapion',
			'toxicroak', 'weavile', 'tangrowth', 'gliscor', 'dusknoir', 'froslass', 'rotom', 'rotomwash', 'rotomheat',
			'rotommow', 'purrloin', 'liepard', 'swoobat', 'whirlipede', 'scolipede', 'basculin', 'krookodile', 'sigilyph',
			'yamask', 'cofagrigus', 'garbodor', 'zorua', 'zoroark', 'gothita', 'gothorita', 'gothitelle', 'frillish',
			'jellicent', 'joltik', 'galvantula', 'elgyem', 'beheeyem', 'litwick', 'lampent', 'chandelure', 'golurk',
			'zweilous', 'hydreigon', 'volcarona', 'espurr', 'meowstic', 'honedge', 'doublade', 'aegislash', 'malamar',
			'phantump', 'trevenant', 'pumpkaboo', 'gourgeist', 'noibat', 'noivern', 'magikarp', 'farfetchd', 'machamp',
		];
		let team = [];

		for (let i = 0; i < 6; i++) {
			let mon = this.sampleNoReplace(pool);
			let template = this.getTemplate(mon);
			if (mon === 'pumpkaboo' || mon === 'gourgeist') {
				let forme = this.random(4);
				if (forme > 0) {
					mon = template.otherFormes[forme - 1];
					template = this.getTemplate(mon);
				}
			}
			let set = this.randomSet(template, i, {megaCount: 1});
			set.species = mon;
			if (mon === 'magikarp') {
				set.name = 'ayy lmao';
				set.item = 'powerherb';
				set.ability = 'primordialsea';
				set.moves = ['hyperbeam', 'geomancy', 'originpulse', 'aquaring', 'trickortreat'];
			} else {
				if (mon === 'golurk') {
					set.name = 'Spoopy Skilenton';
				} else if (mon === 'farfetchd') {
					set.name = 'Le Toucan of Luck';
				} else if (mon === 'machamp') {
					set.name = 'John Cena';
				} else if (mon === 'espurr') {
					set.name = 'Devourer of Souls';
				}
				set.moves[4] = 'trickortreat';
				if (set.item === 'Assault Vest') {
					set.item = 'Leftovers';
				}
				if (set.item === 'Choice Band' || set.item === 'Choice Specs') {
					set.item = 'Life Orb';
				}
			}
			team.push(set);
		}

		return team;
	},
