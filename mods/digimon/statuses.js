'use strict';
exports.BattleStatuses = {
	panic: {
		// this is a volatile status
		onStart: function (target, source, sourceEffect) {
			this.add('-start', target, 'panic');
			this.effectData.time = 4;
		},
		onEnd: function (target) {
			this.add('-end', target, 'panic');
		},
		onBeforeMovePriority: 4,
		onBeforeMove: function (pokemon) {
			pokemon.volatiles.panic.time--;
			if (!pokemon.volatiles.panic.time) {
				pokemon.removeVolatile('panic');
				return;
			}
			this.add('-activate', pokemon, 'panic');
			this.useMove('panicattack', pokemon);
			return false;
		},
	},
};
