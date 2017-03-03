'use strict';

exports.BattleAbilities = {
    "data": {
        id: "data",
        name: "Data",
        onAnyDamage: function (damage, target, source, effect) {
			if (effect && effect.id === 'data') {
				return false;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, move) {
			if (attacker.ability) {
				if (attacker.ability === 'vaccine') {
					this.debug('Data boost');
					return this.chainModify(1.5);
				}
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, move) {
			if (attacker.ability) {
				if (attacker.ability === 'virus') {
					this.debug('Data weaken');
					return this.chainModify(0.5);
				}
			}
		},
    },
};
