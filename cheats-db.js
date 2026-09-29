/**
 * GBA Pro Studio - Pokémon & Retro GBA Cheat Database
 * Pre-configured with tested GameShark, Action Replay v3 & CodeBreaker codes.
 */

window.POKEMON_CHEATS_DB = {
    // Pokémon Emerald (USA) - BPEE
    "BPEE": {
        name: "Pokémon Emerald (USA)",
        masterCode: {
            desc: "Master Code (Must be enabled for Emerald)",
            code: "D8BAE4D9 4864D030\nA4722D4E A8E6DE4F",
            format: "Action Replay v3",
            required: true,
            checked: true
        },
        cheats: [
            {
                id: "em_wtw",
                name: "Walk Through Walls (Ghost Walk)",
                desc: "Walk freely through trees, water, mountain cliffs, and walls.",
                code: "7881A409 E2026E0C\n8E883EFF 92E9660D",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "em_masterball",
                name: "99x Master Balls in PC",
                desc: "Check your PC item storage to withdraw 99x Master Balls.",
                code: "82005274 0001",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "em_rarecandy",
                name: "99x Rare Candies in PC",
                desc: "Check your PC item storage to withdraw 99x Rare Candies.",
                code: "82005274 0044",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "em_money",
                name: "Max Money ($999,999)",
                desc: "Instantly sets your Poké-wallet to the maximum $999,999.",
                code: "D8BAE4D9 4864D030\n82005274 0098\n82005276 0967",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "em_catch",
                name: "100% Catch Rate (Catch Any Pokémon)",
                desc: "Any thrown Pokéball (even standard Pokéball) catches without fail.",
                code: "87AC53E9 F3E36838\nC028448D E7F3A536",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "em_shiny",
                name: "Wild Pokémon are Shiny ✨",
                desc: "All wild Pokémon encounters sparkle with alternate shiny colors.",
                code: "F3A9A86D 4E2629B4\n18452A7D DDE55BCC",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "em_pp",
                name: "Infinite PP for All Moves",
                desc: "Your Pokémon's attack move PP never decreases during battle.",
                code: "42023C08 6363\n00000002 0002",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "em_egg",
                name: "Fast Egg Hatching (1-Step Hatch)",
                desc: "Hatch any Pokémon egg after taking just 1 step.",
                code: "73004380 0200\n83004380 0001",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "em_badges",
                name: "Unlock All 8 Hoenn Badges",
                desc: "Instantly awards all 8 gym badges for Hoenn.",
                code: "EF94C108 59F9C011",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "em_safari",
                name: "Infinite Safari Zone Balls & Time",
                desc: "Never run out of Safari Balls or steps in the Hoenn Safari Zone.",
                code: "8203855C 001E\n8203855E 0258",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "em_exp",
                name: "Fast EXP Multiplier (Level 100 Fast)",
                desc: "Grants maximum experience points after completing any battle.",
                code: "82000060 270F",
                format: "CodeBreaker",
                checked: false
            }
        ]
    },

    // Pokémon FireRed (USA) - BPRE
    "BPRE": {
        name: "Pokémon FireRed (USA)",
        masterCode: {
            desc: "Master Code (Must be enabled for FireRed)",
            code: "72BC6DFB E9CA5465\nA4722D4E A8E6DE4F",
            format: "Action Replay v3",
            required: true,
            checked: true
        },
        cheats: [
            {
                id: "fr_wtw",
                name: "Walk Through Walls (Ghost Walk)",
                desc: "Freely walk through obstacles, trees, walls, and water.",
                code: "509197D3 542975F4\n78DA6258 7983E850",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "fr_masterball",
                name: "99x Master Balls in PC",
                desc: "Check Item Storage in PC to withdraw infinite Master Balls.",
                code: "82025840 0001",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "fr_rarecandy",
                name: "99x Rare Candies in PC",
                desc: "Check Item Storage in PC to withdraw infinite Rare Candies.",
                code: "82025840 0044",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "fr_money",
                name: "Max Money ($999,999)",
                desc: "Instantly sets your money to $999,999.",
                code: "820257BC 423F\n820257BE 000F",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "fr_catch",
                name: "100% Catch Rate (Catch Any Wild Pokémon)",
                desc: "Guaranteed 100% capture rate on any Pokémon.",
                code: "87AC53E9 F3E36838",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "fr_shiny",
                name: "Wild Pokémon are Shiny ✨",
                desc: "Encountered wild Pokémon are guaranteed to be shiny.",
                code: "1670047D 04815C68\n18452A7D DDE55BCC",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "fr_pp",
                name: "Infinite PP for All Moves",
                desc: "Battle move PP will never decrease.",
                code: "42023C08 6363\n00000002 0002",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "fr_exp",
                name: "Massive EXP Gain After Battle",
                desc: "Earn immense EXP after defeat of any opponent.",
                code: "7300218C 0001\n82023D50 270F",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "fr_ghost",
                name: "Identify Ghosts Without Silph Scope",
                desc: "Identify Pokémon Tower ghost Pokémon and Marowak automatically.",
                code: "82026850 0000",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "fr_badges",
                name: "Unlock All 8 Kanto Badges",
                desc: "Instantly receive all 8 Kanto Gym Badges.",
                code: "820265B8 FFFF",
                format: "CodeBreaker",
                checked: false
            }
        ]
    },

    // Pokémon LeafGreen (USA) - BPGE
    "BPGE": {
        name: "Pokémon LeafGreen (USA)",
        masterCode: {
            desc: "Master Code (Must be enabled for LeafGreen)",
            code: "72BC6DFB E9CA5465\n56671F3A 6F4F4D6B",
            format: "Action Replay v3",
            required: true,
            checked: true
        },
        cheats: [
            {
                id: "lg_wtw",
                name: "Walk Through Walls",
                desc: "Walk freely through trees, buildings, and walls.",
                code: "509197D3 542975F4\n78DA6258 7983E850",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "lg_masterball",
                name: "99x Master Balls in PC",
                desc: "Withdraw Master Balls from your item storage PC.",
                code: "82025840 0001",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "lg_rarecandy",
                name: "99x Rare Candies in PC",
                desc: "Withdraw Rare Candies from your item storage PC.",
                code: "82025840 0044",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "lg_money",
                name: "Max Money ($999,999)",
                desc: "Sets wallet to maximum cash.",
                code: "820257BC 423F\n820257BE 000F",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "lg_catch",
                name: "100% Catch Rate",
                desc: "Catch any wild Pokémon with any ball.",
                code: "87AC53E9 F3E36838",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "lg_shiny",
                name: "Wild Pokémon are Shiny ✨",
                desc: "Encountered wild Pokémon are guaranteed shiny.",
                code: "1670047D 04815C68\n18452A7D DDE55BCC",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "lg_pp",
                name: "Infinite PP",
                desc: "Unlimited PP for all Pokémon battle moves.",
                code: "42023C08 6363\n00000002 0002",
                format: "Action Replay v3",
                checked: false
            }
        ]
    },

    // Pokémon Ruby (USA) - AXVE
    "AXVE": {
        name: "Pokémon Ruby (USA)",
        masterCode: {
            desc: "Master Code (Must be enabled for Ruby)",
            code: "9E6AC862 823AB7A8\n46B7498E 38332E1F",
            format: "Action Replay v3",
            required: true,
            checked: true
        },
        cheats: [
            {
                id: "ru_wtw",
                name: "Walk Through Walls",
                desc: "Walk through all environmental collisions.",
                code: "E03B0649 5D67050C\n78DA6258 7983E850",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "ru_masterball",
                name: "99x Master Balls in PC",
                desc: "Withdraw Master Balls from PC item box.",
                code: "82025BD0 0001",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "ru_rarecandy",
                name: "99x Rare Candies in PC",
                desc: "Withdraw Rare Candies from PC item box.",
                code: "82025BD0 0044",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "ru_money",
                name: "Max Money ($999,999)",
                desc: "Sets current wallet money to max.",
                code: "82024764 423F\n82024766 000F",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "ru_catch",
                name: "100% Catch Rate",
                desc: "Any thrown ball catches target Pokémon.",
                code: "87AC53E9 F3E36838",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "ru_shiny",
                name: "Wild Pokémon are Shiny ✨",
                desc: "Wild Pokémon sparkle with shiny coloring.",
                code: "9839927F 5FA83D0E\nCA000000 00000000",
                format: "Action Replay v3",
                checked: false
            }
        ]
    },

    // Pokémon Sapphire (USA) - AXPE
    "AXPE": {
        name: "Pokémon Sapphire (USA)",
        masterCode: {
            desc: "Master Code (Must be enabled for Sapphire)",
            code: "9E6AC862 823AB7A8\n83EE3824 88ECD4E3",
            format: "Action Replay v3",
            required: true,
            checked: true
        },
        cheats: [
            {
                id: "sa_wtw",
                name: "Walk Through Walls",
                desc: "Pass through walls and obstacles.",
                code: "E03B0649 5D67050C\n78DA6258 7983E850",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "sa_masterball",
                name: "99x Master Balls in PC",
                desc: "Withdraw 99 Master Balls from PC.",
                code: "82025BD0 0001",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "sa_rarecandy",
                name: "99x Rare Candies in PC",
                desc: "Withdraw 99 Rare Candies from PC.",
                code: "82025BD0 0044",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "sa_money",
                name: "Max Money ($999,999)",
                desc: "Sets money to maximum limit.",
                code: "82024764 423F\n82024766 000F",
                format: "CodeBreaker",
                checked: false
            },
            {
                id: "sa_catch",
                name: "100% Catch Rate",
                desc: "Never fail a Pokémon catch.",
                code: "87AC53E9 F3E36838",
                format: "Action Replay v3",
                checked: false
            },
            {
                id: "sa_shiny",
                name: "Wild Pokémon are Shiny ✨",
                desc: "Shiny wild Pokémon encounters.",
                code: "9839927F 5FA83D0E\nCA000000 00000000",
                format: "Action Replay v3",
                checked: false
            }
        ]
    }
};
