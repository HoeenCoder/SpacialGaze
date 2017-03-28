'use strict';

exports.BattleAbilities = {
	waggish: {
		id: "waggish",
		name: "Waggish",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (move && move.category === 'Status') {
				return priority - 20;
			}
		},
		onModifyMove: function (move) {
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 0.01;
			}
		},
	},
	poseidon: {
		id: "poseidon",
		name: "Poseidon",
		onStart: function (source) {
			this.setWeather('desolateland');
		},
		onAnySetWeather: function (target, source, weather) {
			if (this.getWeather().id === 'desolateland' && !(weather.id in {
				desolateland: 1,
				primordialsea: 1,
				deltastream: 1,
			})) return false;
		},
		onEnd: function (pokemon) {
			if (this.weatherData.source !== pokemon) return;
			for (let i = 0; i < this.sides.length; i++) {
				for (let j = 0; j < this.sides[i].active.length; j++) {
					let target = this.sides[i].active[j];
					if (target === pokemon) continue;
					if (target && target.hp && target.hasAbility('desolateland')) {
						this.weatherData.source = target;
						return;
					}
				}
			}
			this.clearWeather();
		},
	},
	server: {
		id: "server",
		name: "Server",
		onHit: function (target, source, move) {
			if (target !== source) {
				let stats = ['atk', 'def', 'spa', 'spd', 'spe'];
				this.add('-boost', target, stats[Math.floor(Math.random() * stats.length)], -3, '[from] ability: Server');
			}
		},
		onStart: function (target) {
			this.add('-start', target, 'ability: Server');
			this.add('raw', '<span style="font-family: monospace;">./spacialgaze>node app.js<br/>NEW GLOBAL: global<br/>NEW CHATROOM: lobby<br/>NEW CHATROOM: staff<br/>Fool 1 now listening on 0.0.0.0:8000<br/>Test your server at http://localhost:8000<br/>_</span>');
		},
	},
	primalsurge: {
		name: 'Primal Surge',
		id: 'primalsurge',
		onBeforeMovePriority: 9,
		onBeforeMove: function (pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		effect: {
			duration: 2,
		},
	},
};
