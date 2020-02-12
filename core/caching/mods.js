"use strict";

const fs = require('fs');

function getModFilepath(mod) {
    return "user/mods/" + mod.author + "-" + mod.name + "-" + mod.version + "/";
}

function cache(mod, filepath) {
    if ("user" in mod.db) {
        for (let item in mod.db.user.cache) {
            filepaths.user.cache[item] = filepath + mod.db.user.cache[item];
        }
    }
}

function items(mod, filepath) {
    if ("items" in mod.db) {
        for (let item in mod.db.items) {
            filepaths.items[item] = filepath + mod.db.items[item];
        }
    }
}

function quests(mod, filepath) {
    if ("quests" in mod.db) {
        for (let item in mod.db.quests) {
            filepaths.quests[item] = filepath + mod.db.quests[item];
        }
    }
}

function traders(mod, filepath) {
    if ("traders" in mod.db) {
        for (let item in mod.db.traders) {
            filepaths.traders[item] = filepath + mod.db.traders[item];
        }
    }
}

function dialogues(mod, filepath) {
    if ("dialogues" in mod.db) {
        for (let item in mod.db.dialogues) {
            filepaths.dialogues[item] = filepath + mod.db.dialogues[item];
        }
    }
}

function weather(mod, filepath) {
    if ("weather" in mod.db) {
        for (let item in mod.db.weather) {
            filepaths.weather[item] = filepath + mod.db.weather[item];
        }
    }
}

function customization(mod, filepath) {
    if ("customization" in mod.db) {
        if ("offers" in mod.db.customization) {
            for (let item in mod.db.customization.offers) {
                filepaths.customization.offers[item] = filepath + mod.db.customization.offers[item];
            }
        }

        if ("outfits" in mod.db.customization) {
            for (let item in mod.db.customization.outfits) {
                filepaths.customization.outfits[item] = filepath + mod.db.customization.outfits[item];
            }
        }
    }
}

function hideout(mod, filepath) {
    if ("hideout" in mod.db) {
        if ("areas" in mod.db.hideout) {
            for (let item in mod.db.hideout.areas) {
                filepaths.hideout.areas[item] = filepath + mod.db.hideout.areas[item];
            }
        }

        if ("production" in mod.db.hideout) {
            for (let item in mod.db.hideout.production) {
                filepaths.hideout.production[item] = filepath + mod.db.hideout.production[item];
            }
        }

        if ("scavcase" in mod.db.hideout) {
            for (let item in mod.db.hideout.scavcase) {
                filepaths.hideout.scavcase[item] = filepath + mod.db.hideout.scavcase[item];
            }
        }
    }
}

function locations(mod, filepath) {
    if ("locations" in mod.db) {
        for (let location in mod.db.locations) {    
            if (location === "base") {
                continue;
            }
            
            // set active locale
            let activeLocation = mod.db.locations[location];

            if ("entries" in activeLocation) {
                for (let item in activeLocation.entries) {
                    filepaths.locations[location].entries[item] = filepath + activeLocation.entries[item];
                }
            }

            if ("exits" in activeLocation) {
                for (let item in activeLocation.exits) {
                    filepaths.locations[location].exits[item] = filepath + activeLocation.exits[item];
                }
            }

            if ("waves" in activeLocation) {
                for (let item in activeLocation.waves) {
                    filepaths.locations[location].waves[item] = filepath + activeLocation.waves[item];
                }
            }

            if ("bosses" in activeLocation) {
                for (let item in activeLocation.bosses) {
                    filepaths.locations[location].bosses[item] = filepath + activeLocation.bosses[item];
                }
            }

            if ("loot" in activeLocation) {
                for (let item in activeLocation.loot) {
                    filepaths.locations[location].loot[item] = filepath + activeLocation.loot[item];
                }
            }
        }
    }
}

function ragfair(mod, filepath) {
    if ("ragfair" in mod.db) {
        for (let item in mod.db.ragfair) {
            filepaths.ragfair[item] = filepath + mod.db.ragfair[item];
        }
    }
}

function templates(mod, filepath) {
    if ("templates" in mod.db) {
        if ("categories" in mod.db.templates) {
            for (let item in mod.db.templates.categories) {
                filepaths.templates.categories[item] = filepath + mod.db.templates.categories[item];
            }
        }

        if ("items" in mod.db.templates) {
            for (let item in mod.db.templates.items) {
                filepaths.templates.items[item] = filepath + mod.db.templates.items[item];
            }
        }
    }
}

function globals(mod, filepath) {
    if ("globals" in mod.db) {
        filepaths.user.cache.globals = filepath + mod.db.globals;
    }
}

function profile(mod, filepath) {
    if ("profile" in mod.db) {
        if ("character" in mod.db.profile) {
            for (let item in mod.db.profile.character) {
                filepaths.profile.character[item] = filepath + mod.db.profile.character[item];
            }
        }
        
        if ("storage" in mod.db.profile) {
            filepaths.profile.storage = filepath + mod.db.profile.storage;
        }
    
        if ("userbuilds" in mod.db.profile) {
            filepaths.profile.userbuilds = filepath + mod.db.profile.userbuilds;
        }
    }
}

function assort(mod, filepath) {
    if ("assort" in mod.db) {
        for (let assort in mod.db.assort) {
            let activeAssort = mod.db.assort[assort];
    
            // assort items
            if ("items" in activeAssort) {
                for (let item in activeAssort.items) {
                    filepaths.assort[assort].items[item] = filepath + activeAssort.items[item];
                }
            }
    
            // assort barter_scheme
            if ("barter_scheme" in activeAssort) {
                for (let item in activeAssort.barter_scheme) {
                    filepaths.assort[assort].barter_scheme[item] = filepath + activeAssort.barter_scheme[item];
                }
            }
    
            // assort loyal_level_items
            if ("loyal_level_items" in activeAssort) {
                for (let item in activeAssort.loyal_level_items) {
                    filepaths.assort[assort].loyal_level_items[item] = filepath + activeAssort.loyal_level_items[item];
                }
            }
        }
    }
}

function locales(mod, filepath) {
    if ("locales" in mod.db) {
        for (let locale in mod.db.locales) {
            let activeLocale = mod.db.locales[locale];
    
            // set static locale data
            if ("name" in activeLocale) {
                filepaths.locales[locale].name = filepath + activeLocale.name;
            }
    
            if ("menu" in activeLocale) {
                filepaths.locales[locale].menu = filepath + activeLocale.menu;
            }
    
            if ("interface" in activeLocale) {
                filepaths.locales[locale].interface = filepath + activeLocale.interface;
            }
    
            if ("error" in activeLocale) {
                filepaths.locales[locale].error = filepath + activeLocale.error;
            }
    
            // locale banners
            if ("banners" in activeLocale) {
                for (let item in activeLocale.banners) {
                    filepaths.locales[locale].banners[item] = filepath + activeLocale.banners[item];
                }
            }
    
            // locale handbook
            if ("handbook" in activeLocale) {
                for (let item in activeLocale.handbook) {
                    filepaths.locales[locale].handbook[item] = filepath + activeLocale.handbook[item];
                }
            }
    
            // locale locations
            if ("locations" in activeLocale) {
                for (let item in activeLocale.locations) {
                    filepaths.locales[locale].locations[item] = filepath + activeLocale.locations[item];
                }
            }
    
            // locale mail
            if ("mail" in activeLocale) {
                for (let item in activeLocale.mail) {
                    filepaths.locales[locale].mail[item] = filepath + activeLocale.mail[item];
                }
            }
    
            // locale preset
            if ("preset" in activeLocale) {
                for (let item in activeLocale.preset) {
                    filepaths.locales[locale].preset[item] = filepath + activeLocale.preset[item];
                }
            }
    
            // locale quest
            if ("quest" in activeLocale) {
                for (let item in activeLocale.quest) {
                    filepaths.locales[locale].quest[item] = filepath + activeLocale.quest[item];
                }
            }
    
            // locale season
            if ("season" in activeLocale) {
                for (let item in activeLocale.season) {
                    filepaths.locales[locale].season[item] = filepath + activeLocale.season[item];
                }
            }
    
            // locale templates
            if ("templates" in activeLocale) {
                for (let item in activeLocale.templates) {
                    filepaths.locales[locale].templates[item] =filepath + activeLocale.templates[item];
                }
            }
    
            // locale trading
            if ("trading" in activeLocale) {
                for (let item in activeLocale.trading) {
                    filepaths.locales[locale].trading[item] = filepath + activeLocale.trading[item];
                }
            }
        }
    }
}

function bots(mod, filepath) {
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
                        filepaths.bots[bot].appearance.body[item] = filepath + activeBot.appearance.body[item];
                    }
                }
    
                if ("feet" in activeBot.appearance) {
                    for (let item in activeBot.appearance.feet) {
                        filepaths.bots[bot].appearance.feet[item] = filepath + activeBot.appearance.feet[item];
                    }
                }
    
                if ("hands" in activeBot.appearance) {
                    for (let item in activeBot.appearance.hands) {
                        filepaths.bots[bot].appearance.hands[item] = filepath + activeBot.appearance.hands[item];
                    }
                }
    
                if ("head" in activeBot.appearance) {
                    for (let item in activeBot.appearance.head) {
                        filepaths.bots[bot].appearance.head[item] = filepath + activeBot.appearance.head[item];
                    }
                }
    
                if ("voice" in activeBot.appearance) {
                    for (let item in activeBot.appearance.voice) {
                        filepaths.bots[bot].appearance.voice[item] = filepath + activeBot.appearance.voice[item];
                    }
                }
            }
    
            if ("experience" in activeBot) {
                for (let item in activeBot.experience) {
                    filepaths.bots[bot].experience[item] = filepath + activeBot.experience[item];
                }
            }
    
            if ("health" in activeBot) {
                for (let item in activeBot.health) {
                    filepaths.bots[bot].experience[item] = filepath + activeBot.health[item];
                }
            }
    
            if ("inventory" in activeBot) {
                for (let item in activeBot.inventory) {
                    filepaths.bots[bot].inventory[item] = filepath + activeBot.inventory[item];
                }
            }
    
            if ("names" in activeBot) {
                for (let item in activeBot.names) {
                    filepaths.bots[bot].names[item] = filepath + activeBot.names[item];
                }
            }
        }
    }
}

function loadorder(mod, filepath) {
    let loadorder = json.parse(json.read("user/cache/loadorder.json"));

    if ("callback" in mod.src) {
        for (let item in loadorder.callback) {
            loadorder.callback[item] = filepath + mod.src.callback[item];
        }
    }

    if ("classes" in mod.src) {
        for (let item in loadorder.classes) {
            loadorder.classes[item] = filepath + mod.src.classes[item];
        }
    }

    if ("responses" in mod.src) {
        for (let item in loadorder.responses) {
            loadorder.responses[item] = filepath + mod.src.responses[item];
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
        /* check if config exists */
        if (!fs.existsSync(dir + mod + "/mod.config.json")) {
            logger.logError("Mod " + mod + " is missing mod.config.json");
            logger.logError("Forcing server shutdown...");
            process.exit(1);
        }

        let config = json.parse(json.read(dir + mod + "/mod.config.json"));
        let found = false;

        /* check folder naming convention */
        if (!fs.existsSync(getModFilepath(config) + "mod.config.json")) {
            logger.logError("Mod " + mod + " uses incorrect folder naming convention");
            logger.logError("Forcing server shutdown...");
            process.exit(1);
        }

        /* check for legacy mods */
        if ("files" in config) {
            logger.logError("Mod " + mod + " uses deprecated filepath routing");
            logger.logError("Forcing server shutdown...");
            process.exit(1);
        }

        /* check if mod is already in the list */
        for (let installed of settings.mods.list) {
            if (installed.name === config.name) {
                found = true;
                break;
            }
        }

        /* add mod to the list */
        if (!found) {
            logger.logWarning("Mod " + mod + " not installed, adding it to the modlist");
            settings.mods.list.push({"name": config.name, "author": config.author, "version": config.version, "enabled": true});
            settings.server.rebuildCache = true;
            json.write("user/server.config.json", settings);
        }
    }
}

function isRebuildRequired() {
    if (!fs.existsSync("user/cache/mods.json")) {
        return true;
    }

    let modlist = settings.mods.list;
    let cachedlist = json.parse(json.read("user/cache/mods.json"));

    if (modlist.length !== cachedlist.length) {
        return true;
    }

    for (let mod in modlist) {
        if (modlist[mod].name !== cachedlist[mod].name) {
            return true;
        }
        
        if (modlist[mod].author !== cachedlist[mod].author) {
            return true;
        }

        if (modlist[mod].version !== cachedlist[mod].version) {
            return true;
        }
        
        if (modlist[mod].enabled !== cachedlist[mod].enabled) {
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
            logger.logWarning("Skipping mod " + element.author + "-" + element.name + "-" + element.version);
            continue;
        }

        // apply mod
        let filepath = getModFilepath(element);
        let mod = json.parse(json.read(filepath + "mod.config.json"));

        logger.logInfo("Loading mod " + mod.author + "-" + mod.name + "-" + mod.version);
        
        cache(mod, filepath);
        items(mod, filepath);
        quests(mod, filepath);
        traders(mod, filepath);
        dialogues(mod, filepath);
        weather(mod, filepath);
        customization(mod, filepath);
        hideout(mod, filepath);
        locations(mod, filepath);
        ragfair(mod, filepath);
        templates(mod, filepath);
        globals(mod, filepath);
        profile(mod, filepath);
        assort(mod, filepath);
        locales(mod, filepath);
        bots(mod, filepath);
        loadorder(mod, filepath);
    }
}

module.exports.detectMissing = detectMissing;
module.exports.isRebuildRequired = isRebuildRequired;
module.exports.load = load;
