"growth": {
		num: 74,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Special Attack by 1 stage. If the weather is Sunny Day, raises the user's Attack and Special Attack by 2 stages.",
		shortDesc: "Raises user's Attack and Sp. Atk by 1; 2 in Sun.",
		id: "growth",
		name: "Growth",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onModifyMove: function (move) {
			if (this.isWeather(['sunnyday', 'desolateland'])) move.boosts = {atk: 2, spa: 2};
		},
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {spa: 1},
		contestType: "Beautiful",
	},
