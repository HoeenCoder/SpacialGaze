"use strict";

exports.BattleScripts = {
	runMegaEvo: function (pokemon) {
		let template = this.getTemplate(pokemon.canMegaEvo);
		let side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		let foeActive = side.foe.active;
		for (let i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		if (pokemon.illusion) {
			pokemon.ability = ''; // Don't allow Illusion to wear off
			this.add('-mega', pokemon, pokemon.illusion.template.baseSpecies, template.requiredItem);
		} else {
			this.add('detailschange', pokemon, pokemon.details);
			this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
		}
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;

		this.runEvent('AfterMega', pokemon);
		return true;
	},
};
