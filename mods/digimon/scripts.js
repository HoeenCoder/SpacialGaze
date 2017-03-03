/* * * * * * * * * * * * * * * * * * *
 *  Digimon Showdown                 *
 *  Created By:                      *
 *  Insist + Ashley the Pikachu      *
 * * * * * * * * * * * * * * * * * * */

'use strict';

exports.BattleScripts = {
    randomDigimonTeam: function (side) {
        let team = [];
        var variant = (this.random(2) === 1);
        var sets = {
            "Botamon": {
                species: "Botamon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Poyomon": {
                species: "Poyomon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Punimon": {
                species: "Punimon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Yuramon": {
                species: "Yuramon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Koromon": {
                species: "Koromon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Tokomon": {
                species: "Tokomon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Tsunomon": {
                species: "Tsunomon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
            "Tanemon": {
                species: "Tanemon",
                ability: "Data",
                moves: ['bubble'],
                nature: "Serious",
            },
        };
        let pool = Object.keys(sets);
        for (let i = 0; i < 6; i++) {
            let name = this.sampleNoReplace(pool);
            let set = sets[name];
            set.name = name;
            set.level = 100;
            set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
            team.push(set);
        }

        return team;
    },
};
