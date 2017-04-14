'use strict';

exports.BattleAbilities = {
	//Ashley the Pikachu
	primalsurge: {
		name: 'Primal Surge',
		id: 'primalsurge',
		onStart: function (source) {
			this.setTerrain('primalsurge');
		},
		onModifySpe: function (spe) {
			return this.chainModify(2);
		},
	},
};
