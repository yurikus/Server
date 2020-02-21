"use strict";

const fs = require('fs');

function getModFilepath(mod) {
    return "user/mods/" + mod.author + "-" + mod.name + "-" + mod.version + "/";
}

function scanRecursiveMod(filepath, baseNode, modNode) {
    if (typeof modNode === "object") {
        for (let node in modNode) {
            baseNode[node] = scanRecursiveMod(filepath, baseNode[node], modNode[node]);
        }
    }

    if (typeof modNode === "string") {
        baseNode = filepath + modNode;
    }

    return baseNode;
}

function loadMod(mod, filepath) {
    logger.logInfo("Loading mod " + mod.author + "-" + mod.name + "-" + mod.version);

    let loadorder = json.parse(json.read("user/cache/loadorder.json"));

    db = scanRecursiveMod(filepath, db, mod.db);
    loadorder = scanRecursiveMod(filepath, loadorder, mod.src);

    json.write("user/cache/loadorder.json", loadorder);
}

function detectChangedMods() {
    let changed = false;

    for (let mod of settings.mods.list) {
        if (!fs.existsSync(getModFilepath(mod) + "mod.config.json")) {
            changed = true;
            break;
        }

        let config = json.parse(json.read(getModFilepath(mod) + "mod.config.json"));

        if (mod.name !== config.name || mod.author !== config.author || mod.version !== config.version) {
            changed = true;
            break;
        }
    }

    if (changed) {
        settings.mods.list = [];
    }

    return changed;
}

function detectMissingMods() {
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

        /* check if mod is already in the list */
        for (let installed of settings.mods.list) {
            if (installed.name === config.name) {
                logger.logWarning("Mod " + mod + " has already been added; skipping mod");
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
        /* check against cached list */
        if (modlist[mod].name !== cachedlist[mod].name
        || modlist[mod].author !== cachedlist[mod].author
        || modlist[mod].version !== cachedlist[mod].version
        || modlist[mod].enabled !== cachedlist[mod].enabled) {
            return true;
        }
    }

    return false;
}

function loadAllMods() {
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
        loadMod(mod, filepath);
    }
}

function flush() {
    db = {};
    res = {};
}

function dump() {
    json.write("user/cache/db.json", db);
    json.write("user/cache/res.json", res);
}

function scanRecursiveRoute(filepath) {
    let baseNode = {};
    let directories = utility.getDirList(filepath);
    let files = fs.readdirSync(filepath);

    // remove all directories from files
    for (let directory of directories) {
        for (let file in files) {
            if (files[file] === directory) {
                files.splice(file, 1);
            }
        }
    }

    // make sure to remove the file extention
    for (let node in files) {
        let fileName = files[node].split('.').slice(0, -1).join('.');
        baseNode[fileName] = filepath + files[node];
    }

    // deep tree search
    for (let node of directories) {
        baseNode[node] = scanRecursiveRoute(filepath + node + "/");
    }

    return baseNode;
}

function routeAll() {
    db = scanRecursiveRoute("db/");
    res = scanRecursiveRoute("res/");
}

function others() {
    db.globals = "db/globals.json";
    db.hideout.settings = "db/hideout/settings.json";

    db.ragfair = {
        "offer": "db/ragfair/offer.json",
        "search": "db/ragfair/search.json"
    }

    db.user = {
        "config": "user/server.config.json",
        "events_schedule": "user/events/schedule.json",
        "profiles": {
            "list": "user/profiles/list.json",
            "character": "user/profiles/__REPLACEME__/character.json",
            "dialogue": "user/profiles/__REPLACEME__/dialogue.json",
            "storage": "user/profiles/__REPLACEME__/storage.json",
            "userbuilds": "user/profiles/__REPLACEME__/userbuilds.json"
        },
        "cache": {
            "items": "user/cache/items.json",
            "quests": "user/cache/quests.json",
            "locations": "user/cache/locations.json",
            "languages": "user/cache/languages.json",
            "customization": "user/cache/customization.json",
            "hideout_areas": "user/cache/hideout_areas.json",
            "hideout_production": "user/cache/hideout_production.json",
            "hideout_scavcase": "user/cache/hideout_scavcase.json",
            "weather": "user/cache/weather.json",
            "templates": "user/cache/templates.json",
            "mods": "user/cache/mods.json"
        }
    };

    for (let trader of utility.getDirList("db/assort/")) {
        db.user.cache["assort_" + trader] = "user/cache/assort_" + trader + ".json";

        if (fs.existsSync("db/assort/" + trader + "/customization/")) {
            db.user.cache["customization_" + trader] = "user/cache/customization_" + trader + ".json";
        }
    }

    for (let locale of utility.getDirList("db/locales/")) {
        db.user.cache["locale_" + locale] = "user/cache/locale_" + locale + ".json";
    }
}

function loadorder() {
    logger.logInfo("Routing: loadorder");
    json.write("user/cache/loadorder.json", json.parse(json.read("src/loadorder.json")));
}

function route() {
    flush();

    routeAll();
    others();
    loadorder();
}

function all() {
    detectMissingMods();

    /* check if loadorder is missing */
    if (!fs.existsSync("user/cache/loadorder.json")) {
        logger.logWarning("Loadorder mismatch");
        settings.server.rebuildCache = true;
    }

    /* detect if existing mods changed */
    if (detectChangedMods()) {
        logger.logWarning("Mod mismatch");
        settings.server.rebuildCache = true;
    }

    /* check if db need rebuid */
    if (isRebuildRequired()) {
        logger.logWarning("Modlist mismatch");
        settings.server.rebuildCache = true;
    }

    /* rebuild db */
    if (settings.server.rebuildCache || !fs.existsSync("user/cache/db.json")) {
        logger.logWarning("Force rebuilding routes");
        
        route();
        loadAllMods();
        dump();

        return;
    }

    db = json.parse(json.read("user/cache/db.json"));
    res = json.parse(json.read("user/cache/res.json"));
}

module.exports.all = all;