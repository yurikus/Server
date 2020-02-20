"use strict";

const fs = require('fs');
const mods = require('./mods.js');

function flush() {
    filepaths = json.parse(json.read("db/cache/filepaths.json"));
}

function dump() {
    json.write("user/cache/filepaths.json", filepaths);
}

function scanRecursive(filepath, baseNode) {
    let directories = utility.getDirList(filepath);
    let files = fs.readdirSync(filepath);

    // deep tree search
    for (let node in directories) {
        baseNode[node] = scanRecursive(filepath + directories[node] + "/", baseNode[node]);
    }

    // remove all directories from files
    for (directory of directories) {
        for (file in files) {
            if (files[file] === directory) {
                files.splice(file, 1);
            }
        }
    }

    // make sure to remove the file extention
    for (let node in files) {
        let splitted = node.split(".");
        let fileName = node.replace(splitted[splitted.length - 1], "");
        baseNode[fileName] = filepath + files[node];
    }

    return baseNode;
}

function routeAll() {
    filepaths = scanRecursive("db/", filepaths);
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

    let assortList = utility.getDirList("db/assort/");

    for (let assort in assortList) {
        filepaths.user.cache["assort_" + assortList[assort]] = "user/cache/assort_" + assortList[assort] + ".json";
        filepaths.user.cache["customization_" + assortList[assort]] = "user/cache/customization_" + assortList[assort] + ".json";
    }
}

function loadorder() {
    logger.logInfo("Routing: loadorder");
    json.write("user/cache/loadorder.json", json.parse(json.read("src/loadorder.json")));
}

function route() {
    flush();

    routeAll();
    images();
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
}

module.exports.all = all;