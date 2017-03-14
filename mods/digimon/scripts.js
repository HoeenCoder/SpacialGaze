/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Digimon Showdown                                     *
 *  Created By:                                          *
 *  Insist + Ashley the Pikachu + Stellation + AlfaStorm *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Poyomon": {
                species: "Poyomon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Punimon": {
                species: "Punimon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Yuramon": {
                species: "Yuramon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Koromon": {
                species: "Koromon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Tokomon": {
                species: "Tokomon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Tsunomon": {
                species: "Tsunomon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Tanemon": {
                species: "Tanemon",
                ability: "Data",
                moves: ['bubble'],
                signatureMove: "Protect",
                nature: "Serious",
            },
            "Agumon": {
                species: "Agumon",
                ability: "Vaccine",
                moves: ['firetower', 'spitfire', 'redinferno', 'magmabomb', 'heatlaser', 'musclecharge', 'sonicjab', 'protect'],
                baseSignatureMove: "pepperbreath",
                signatureMove: "Pepper Breath",
                nature: "Serious",
            },
            "Gabumon": {
                species: "Gabumon",
                ability: "Data",
                moves: ['firetower', 'heatlaser', 'tremar', 'warcry', 'sonicjab', 'dynamitekick', 'megatonpunch', 'protect'],
                baseSignatureMove: "blueblaster",
                signatureMove: "Blue Blaster",
                nature: "Serious",
            },
            "Patamon": {
                species: "Patamon",
                ability: "Data",
                moves: ['warcry', 'sonicjab', 'dynamitekick', 'busterdrive', 'spinningshot', 'windcutter', 'confusedstorm'],
                baseSignatureMove: "boombubble",
                signatureMove: "Boom Bubble",
                nature: "Serious",
            },
        };
        //Generate the team randomly.
        let pool = Object.keys(sets);
        for (let i = 0; i < 6; i++) {
            let name = this.sampleNoReplace(pool);
            let set = sets[name];
            set.level = 100;
            set.name = name;
            let sigItems = ['Small Recovery', 'Medium Recovery', 'Large Recovery', 'Super Recovery Floppy', 'MP Floppy', 'Medium MP Floppy', 'Large MP Floppy', 'Various', 'Protection', 'Omnipotent', 'Double Floppy', 'Restore Floppy', 'Super Restore Floppy', 'Offense Disk', 'Defense Disk', 'Hi Speed Disk', 'Super Defense Disk', 'Super Offense Disk', 'Super Speed Disk', 'Omnipotent Disk'];
            let choosenItems = [];
            for (let h = 0; h < 4; h++) {
                let itemChoosen = sigItems[Math.floor(Math.random() * sigItems.length)];
                let rejected = false;
                if (choosenItems.length !== 0) {
                    for (let k = 0; k < choosenItems.length; k++) {
                        if (choosenItems[k] === itemChoosen) rejected = true;
                    }
                }
                if (!rejected) {
                    choosenItems.push(itemChoosen);
                }
                else {
                    h--;
                }
                if (h === 3 && choosenItems.length !== 4) h--;
            }
            set.moves = set.moves.concat(choosenItems);
            team.push(set);
        }
        return team;
    },
};
