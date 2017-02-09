"use strict";

exports.BattleAbilities = {

// Ashley the Pikachu
	primalsurge: {
		shortDesc: "On switch-in, this Pokemon gets a 2x Speed boost on Electric Terrain.",
		onStart: function (source) {
			this.addPseudoWeather('electricterrain', source);
		},
		id: "primalsurge",
		name: "Primal Surge",
		rating: 4,
    onModifySpe: function () {
			if (this.isPseudoWeather(['electricterrain'])) {
				return this.chainModify(2);
			}
		},
	},
  };
