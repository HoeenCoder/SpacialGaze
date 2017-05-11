"use strict";

exports.BattleMovedex = {
	"growth": {
		accuracy: true,
		inherit: true,
		pp: 20,
		onModifyMove: function(move) {
			switch (this.random(7)) {
				case 0:
					move.category = 'Special';
					move.type = 'Poison';
					move.basePower = 80;
					move.onTryHit = function() {
						this.add('-message', "Spore Party!");
					};
					move.onHit = function(target, source) {
						let result = this.random(3);
						if (result === 0) {
							target.trySetStatus('psn', source);
						} else if (result === 1) {
							target.trySetStatus('par', source);
						} else {
							target.trySetStatus('slp', source);
						}
					};
					break;
				case 1:
					move.category = 'Physical';
					move.type = 'Grass';
					move.basePower = 95;
					move.onTryHit = function() {
						this.add('-message', "Pollen Bomb!");
					};
					move.onHit = function(target, source) {
						target.addVolatile('flinch');
					};
					break;
				case 2:
					move.onTryHit = function() {
						this.add('-message', "???");
					};
					move.weather = 'Hail';
					move.onHit = function(target, source) {};
					break;
				case 3:
					move.onTryHit = function() {
						this.add('-message', "Oh look the sun, and you got sunburned.");
					};
					move.weather = 'SunnyDay';
					move.onHit = function(target, source) {
						source.Status('brn');
						target.Status('brn');
					};
					break;
				case 4:
					move.onTryHit = function() {
						this.add('-message', "Mushroom Samba!");
					};
					move.onHit = function(target, source) {
						target.addVolatile('confusion');
						target.addVolatile('torment');
					};
					break;
				case 5:
					move.category = 'Special';
					move.type = 'Dark';
					move.ohko = true;
					move.onTryHit = function() {
						this.add('-message', "The god of plants came to devour the Opponent! Oh, and you as well...");
					};
					move.onHit = function(pokemon) {
						pokemon.faint();
					};
					break;
				case 6:
					move.onTryHit = function() {
						this.add('-message', "April showers bring May flowers...");
					};
					move.weather = 'RainDance';
					move.onHit = function(target, source) {};
					break;
				case 7:
					move.onTryHit = function() {
						this.add('-message', "You planted your roots!");
					};
					move.onHit = function(target, source) {
						source.addVolatile('ingrain');
					};
					break;
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {
			spa: 1,
		},
		contestType: "Beautiful",
	},
};
