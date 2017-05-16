'use strict';
exports.BattleScripts = {
	randomCountryTeam: function (side) {
		//inser team here
	},
  //Credits to spandan for the code for metaman so i can use this for reasons
	pokemon: {
		moveUsed(move) {
			this.lastMove = this.battle.getMove(move).id;
			for (let i = 0; i < this.moveset.length; i++) {
				if (move.id === this.moveset[i].id) {
					this.lastM = this.moveset[i];
					this.lastM.disabled = false;
					this.lastM.pp = this.lastM.maxpp;
					break;
				}
			}
			this.moveThisTurn = this.lastMove;
		},
	},
};
