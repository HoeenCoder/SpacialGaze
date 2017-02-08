'use strict';
exports.BattleScripts = {
	init: function () {
		for(let i in this.data.Learnsets) {
			this.modData('Learnsets', i).learnset.metronome = ['7M'];
		}
	},
};
