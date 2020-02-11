"use strict";

const fs = require('fs');

function cache(mod) {
    if ("user" in mod.db) {
        for (let item in mod.db.user.cache) {
            filepaths.user.cache[item] = mod.db.user.cache[item];
        }
    }
}

function items(mod) {
    if ("items" in mod.db) {
        for (let item in mod.db.items) {
            filepaths.items[item] = mod.db.items[item];
        }
    }
}

function quests(mod) {
    if ("quests" in mod.db) {
        for (let item in mod.db.quests) {
            filepaths.quests[item] = mod.db.quests[item];
        }
    }
}

function traders(mod) {
    if ("traders" in mod.db) {
        for (let item in mod.db.traders) {
            filepaths.traders[item] = mod.db.traders[item];
            filepaths.user.prodb.traders[item] = "user/prodb/__REPLACEME__/traders/" + item + ".json";
        }
    }
}

function dialogues(mod) {
    if ("dialogues" in mod.db) {
        for (let item in mod.db.dialogues) {
            filepaths.dialogues[item] = mod.db.dialogues[item];
        }
    }
}

function weather(mod) {
    if ("weather" in mod.db) {
        for (let item in mod.db.weather) {
            filepaths.weather[item] = mod.db.weather[item];
        }
    }
}

function customization(mod) {
    if ("customization" in mod.db) {
        if ("offers" in mod.db.customization) {
            for (let item in mod.db.customization.offers) {
                filepaths.customization.offers[item] = mod.db.customization.offers[item];
            }
        }

        if ("outfits" in mod.db.customization) {
            for (let item in mod.db.customization.outfits) {
                filepaths.customization.outfits[item] = mod.db.customization.outfits[item];
            }
        }
    }
}

function hideout(mod) {
    if ("hideout" in mod.db) {
        if ("areas" in mod.db.hideout) {
            for (let item in mod.db.hideout.areas) {
                filepaths.hideout.areas[item] = mod.db.hideout.areas[item];
            }
        }

        if ("production" in mod.db.hideout) {
            for (let item in mod.db.hideout.production) {
                filepaths.hideout.production[item] = mod.db.hideout.production[item];
            }
        }

        if ("scavcase" in mod.db.hideout) {
            for (let item in mod.db.hideout.scavcase) {
                filepaths.hideout.scavcase[item] = mod.db.hideout.scavcase[item];
            }
        }
    }
}

function locations(mod) {
    if ("locations" in mod.db) {
        for (let location in mod.db.locations) {    
            if (location === "base") {
                continue;
            }
            
            // set active locale
            let activeLocation = mod.db.locations[location];

            if ("entries" in activeLocation) {
                for (let item in activeLocation.entries) {
                    filepaths.locations[location].entries[item] = activeLocation.entries[item];
                }
            }

            if ("exits" in activeLocation) {
                for (let item in activeLocation.exits) {
                    filepaths.locations[location].exits[item] = activeLocation.exits[item];
                }
            }

            if ("waves" in activeLocation) {
                for (let item in activeLocation.waves) {
                    filepaths.locations[location].waves[item] = activeLocation.waves[item];
                }
            }

            if ("bosses" in activeLocation) {
                for (let item in activeLocation.bosses) {
                    filepaths.locations[location].bosses[item] = activeLocation.bosses[item];
                }
            }

            if ("loot" in activeLocation) {
                for (let item in activeLocation.loot) {
                    filepaths.locations[location].loot[item] = activeLocation.loot[item];
                }
            }
        }
    }
}

function ragfair(mod) {
    if ("ragfair" in mod.db) {
        for (let item in mod.db.ragfair) {
            filepaths.ragfair[item] = mod.db.ragfair[item];
        }
    }
}

function templates(mod) {
    if ("templates" in mod.db) {
        if ("categories" in mod.db.templates) {
            for (let item in mod.db.templates.categories) {
                filepaths.templates.categories[item] = mod.db.templates.categories[item];
            }
        }

        if ("items" in mod.db.templates) {
            for (let item in mod.db.templates.items) {
                filepaths.templates.items[item] = mod.db.templates.items[item];
            }
        }
    }
}

function globals(mod) {
    if ("globals" in mod.db) {
        filepaths.user.cache.globals = mod.db.globals;
    }
}

function profile(mod) {
    if ("profile" in mod.db) {
        if ("character" in mod.db.profile) {
            for (let item in mod.db.profile.character) {
                filepaths.profile.character[item] = mod.db.profile.character[item];
            }
        }
        
        if ("storage" in mod.db.profile) {
            filepaths.profile.storage = mod.db.profile.storage;
        }
    
        if ("userbuilds" in mod.db.profile) {
            filepaths.profile.userbuilds = mod.db.profile.userbuilds;
        }
    }
}

function assort(mod) {
    if ("assort" in mod.db) {
        for (let assort in mod.db.assort) {
            // create assort
            if (!(assort in filepaths.assort)) {
                filepaths.assort[assort] = mod.db.assort[assort];
                continue;
            }
            
            // set active assort
            let activeAssort = mod.db.assort[assort];
    
            // assort items
            if ("items" in activeAssort) {
                for (let item in activeAssort.items) {
                    filepaths.assort[assort].items[item] = activeAssort.items[item];
                }
            }
    
            // assort barter_scheme
            if ("barter_scheme" in activeAssort) {
                for (let item in activeAssort.barter_scheme) {
                    filepaths.assort[assort].barter_scheme[item] = activeAssort.barter_scheme[item];
                }
            }
    
            // assort loyal_level_items
            if ("loyal_level_items" in activeAssort) {
                for (let item in activeAssort.loyal_level_items) {
                    filepaths.assort[assort].loyal_level_items[item] = activeAssort.loyal_level_items[item];
                }
            }
        }
    }
}

function locales(mod) {
    if ("locales" in mod.db) {
        for (let locale in mod.db.locales) {
            // create locale
            if (!(locale in filepaths.locales)) {
                filepaths.locales[locale] = mod.db.locales[locale];
                continue;
            }
            
            // set active locale
            let activeLocale = mod.db.locales[locale];
    
            // set static locale data
            if ("name" in activeLocale) {
                filepaths.locales[locale].name = activeLocale.name;
            }
    
            if ("menu" in activeLocale) {
                filepaths.locales[locale].menu = activeLocale.menu;
            }
    
            if ("interface" in activeLocale) {
                filepaths.locales[locale].interface = activeLocale.interface;
            }
    
            if ("error" in activeLocale) {
                filepaths.locales[locale].error = activeLocale.error;
            }
    
            // locale banners
            if ("banners" in activeLocale) {
                for (let item in activeLocale.banners) {
                    filepaths.locales[locale].banners[item] = activeLocale.banners[item];
                }
            }
    
            // locale handbook
            if ("handbook" in activeLocale) {
                for (let item in activeLocale.handbook) {
                    filepaths.locales[locale].handbook[item] = activeLocale.handbook[item];
                }
            }
    
            // locale locations
            if ("locations" in activeLocale) {
                for (let item in activeLocale.locations) {
                    filepaths.locales[locale].locations[item] = activeLocale.locations[item];
                }
            }
    
            // locale mail
            if ("mail" in activeLocale) {
                for (let item in activeLocale.mail) {
                    filepaths.locales[locale].mail[item] = activeLocale.mail[item];
                }
            }
    
            // locale preset
            if ("preset" in activeLocale) {
                for (let item in activeLocale.preset) {
                    filepaths.locales[locale].preset[item] = activeLocale.preset[item];
                }
            }
    
            // locale quest
            if ("quest" in activeLocale) {
                for (let item in activeLocale.quest) {
                    filepaths.locales[locale].quest[item] = activeLocale.quest[item];
                }
            }
    
            // locale season
            if ("season" in activeLocale) {
                for (let item in activeLocale.season) {
                    filepaths.locales[locale].season[item] = activeLocale.season[item];
                }
            }
    
            // locale templates
            if ("templates" in activeLocale) {
                for (let item in activeLocale.templates) {
                    filepaths.locales[locale].templates[item] = activeLocale.templates[item];
                }
            }
    
            // locale trading
            if ("trading" in activeLocale) {
                for (let item in activeLocale.trading) {
                    filepaths.locales[locale].trading[item] = activeLocale.trading[item];
                }
            }
        }
    }
}

function bots(mod) {
    if ("bots" in mod.db) {
        for (let bot in mod.db.bots) {
            // users shouldn't modify the bots base
            if (bot === "base") {
                continue;
            }
            
            // set active locale
            let activeBot = mod.db.bots[bot];
    
            // set static locale data
            if ("appearance" in activeBot) {
                if ("body" in activeBot.appearance) {
                    for (let item in activeBot.appearance.body) {
                        filepaths.bots[bot].appearance.body[item] = activeBot.appearance.body[item];
                    }
                }
    
                if ("feet" in activeBot.appearance) {
                    for (let item in activeBot.appearance.feet) {
                        filepaths.bots[bot].appearance.feet[item] = activeBot.appearance.feet[item];
                    }
                }
    
                if ("hands" in activeBot.appearance) {
                    for (let item in activeBot.appearance.hands) {
                        filepaths.bots[bot].appearance.hands[item] = activeBot.appearance.hands[item];
                    }
                }
    
                if ("head" in activeBot.appearance) {
                    for (let item in activeBot.appearance.head) {
                        filepaths.bots[bot].appearance.head[item] = activeBot.appearance.head[item];
                    }
                }
    
                if ("voice" in activeBot.appearance) {
                    for (let item in activeBot.appearance.voice) {
                        filepaths.bots[bot].appearance.voice[item] = activeBot.appearance.voice[item];
                    }
                }
            }
    
            if ("experience" in activeBot) {
                for (let item in activeBot.experience) {
                    filepaths.bots[bot].experience[item] = activeBot.experience[item];
                }
            }
    
            if ("health" in activeBot) {
                for (let item in activeBot.health) {
                    filepaths.bots[bot].experience[item] = activeBot.health[item];
                }
            }
    
            if ("inventory" in activeBot) {
                for (let item in activeBot.inventory) {
                    filepaths.bots[bot].inventory[item] = activeBot.inventory[item];
                }
            }
    
            if ("names" in activeBot) {
                for (let item in activeBot.names) {
                    filepaths.bots[bot].names[item] = activeBot.names[item];
                }
            }
        }
    }
}

function loadorder(mod) {
    let loadorder = json.parse(json.read("user/cache/loadorder.json"));

    if ("callback" in mod.src) {
        for (let item in loadorder.callback) {
            loadorder.callback[item] = mod.src.callback[item];
        }
    }

    if ("classes" in mod.src) {
        for (let item in loadorder.classes) {
            loadorder.classes[item] = mod.src.classes[item];
        }
    }

    if ("responses" in mod.src) {
        for (let item in loadorder.responses) {
            loadorder.responses[item] = mod.src.responses[item];
        }
    }

    json.write("user/cache/loadorder.json", loadorder);
}

function detectMissing() {
    if (!fs.existsSync("user/mods/")) {
        return;
    }

    let dir = "user/mods/";
    let mods = utility.getDirList(dir);

    for (let mod of mods) {
        if (!fs.existsSync(dir + mod + "/mod.config.json")) {
            logger.logError("Mod " + mod + " is missing mod.config.json");
            logger.logError("Forcing server shutdown...");
            process.exit(1);
        }

        let config = json.parse(json.read(dir + mod + "/mod.config.json"));
        let found = false;

        for (let installed of settings.mods.list) {
            if (installed.name === config.name) {
                found = true;
                break;
            }
        }

        if (found) {
            continue;
        }

        logger.logWarning("Mod " + mod + " not installed, adding it to the modlist");
        settings.mods.list.push({"name": config.name, "author": config.author, "version": config.releases[0].version, "enabled": true});
        settings.server.rebuildCache = true;
        json.write("user/server.config.json", settings);
    }
}

function isRebuildRequired() {
    let modList = settings.mods.list;

    if (!fs.existsSync("user/cache/mods.json")) {
        return true;
    }

    let cachedList = json.parse(json.read("user/cache/mods.json"));

    if (modList.length !== cachedList.length) {
        return true;
    }

    for (let mod in modList) {
        if (modList[mod].name !== cachedList[mod].name) {
            return true;
        }
            
        if (modList[mod].version !== cachedList[mod].version) {
            return true;
        }
        
        if (modList[mod].enabled !== cachedList[mod].enabled) {
            return true;
        }
    }

    return false;
}

function load() {
    let modList = settings.mods.list;

    for (let element of modList) {
        // skip mod
        if (!element.enabled) {
            logger.logWarning("Skipping mod " + element.author + "-" + element.name + " v" + element.version);
            continue;
        }

        // apply mod
        let mod = json.parse(json.read("user/mods/" + element.author + "-" + element.name + "/mod.config.json"))

        logger.logInfo("Loading mod " + element.author + "-" + element.name + " v" + element.version);
        
        cache(mod);
        items(mod);
        quests(mod);
        traders(mod);
        dialogues(mod);
        weather(mod);
        customization(mod);
        hideout(mod);
        locations(mod);
        ragfair(mod);
        templates(mod);
        globals(mod);
        profile(mod);
        assort(mod);
        locales(mod);
        bots(mod);
        loadorder(mod);
    }
}

module.exports.detectMissing = detectMissing;
module.exports.isRebuildRequired = isRebuildRequired;
module.exports.load = load;