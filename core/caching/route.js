"use strict";

const fs = require('fs');
const mods = require('./mods.js');

function flush() {
    filepaths = {};
    res = {};
}

function dump() {
    json.write("user/cache/filepaths.json", filepaths);
    json.write("user/cache/res.json", res);
}

function scanRecursive(filepath) {
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
        baseNode[node] = scanRecursive(filepath + node + "/");
    }

    return baseNode;
}

function routeAll() {
    filepaths = scanRecursive("db/");
    res = scanRecursive("res/");

    console.log(filepaths);
    console.log(res);
}

function others() {
    filepaths.globals = "db/globals.json";
    filepaths.hideout.settings = "db/hideout/settings.json";

    filepaths.ragfair = {
        "offer": "db/ragfair/offer.json",
        "search": "db/ragfair/search.json"
    }

    filepaths.user = {
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
            "Hideout_areas": "user/cache/hideout_areas.json",
            "hideout_production": "user/cache/hideout_production.json",
            "hideout_scavcase": "user/cache/hideout_scavcase.json",
            "weather": "user/cache/weather.json",
            "templates": "user/cache/templates.json",
            "mods": "user/cache/mods.json"
        }
    };

    for (let assort of utility.getDirList("db/assort/")) {
        filepaths.user.cache["assort_" + assort] = "user/cache/assort_" + assort + ".json";
        filepaths.user.cache["customization_" + assort] = "user/cache/customization_" + assort + ".json";
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
    mods.detectMissing();

    /* check if loadorder is missing */
    if (!fs.existsSync("user/cache/loadorder.json")) {
        logger.logWarning("Loadorder mismatch");
        settings.server.rebuildCache = true;
    }

    /* detect if existing mods changed */
    if (mods.detectChanged()) {
        logger.logWarning("Mod mismatch");
        settings.server.rebuildCache = true;
    }

    /* check if filepaths need rebuid */
    if (mods.isRebuildRequired()) {
        logger.logWarning("Modlist mismatch");
        settings.server.rebuildCache = true;
    }

    /* rebuild filepaths */
    if (settings.server.rebuildCache || !fs.existsSync("user/cache/filepaths.json")) {
        logger.logWarning("Force rebuilding routes");
        
        route();
        mods.load();
        dump();
        return;
    }

    filepaths = json.parse(json.read("user/cache/filepaths.json"));
    res = json.parse(json.read("user/cache/res.json"));
}

module.exports.all = all;