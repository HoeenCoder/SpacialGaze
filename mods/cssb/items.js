'use strict';
// VXN
"wondergummi": {
  id: "wondergummi",
	name: "Wonder Gummi",
	spritenum: 538,
	naturalGift: {
    basePower: 200,
		type: "???",
  },
    onUpdate: function (pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem: function (item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat: function (pokemon) {
      let result = this.random(2);
				if (result === 0) {
          this.add('message', pokemon, '\'s belly felt full!');
          this.heal(pokemon.maxhp / 2);
          this.add('message', pokemon, '\'s IQ rose!');
  this.boost({spd:2});
  this.boost({def:2});
} else {
  
}
},
  num: -1,
  gen: -1,
  desc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
},
