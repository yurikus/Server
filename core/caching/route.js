"use strict";

const fs = require('fs');
const mods = require('./mods.js');

function flush() {
    filepaths = {};
}

function dump() {
    json.write("user/cache/filepaths.json", filepaths);
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
    console.log(filepaths);
}

function images() {
    logger.logInfo("Routing: images");

    let inputDir = [
        "res/banners/",
        "res/handbook/",
        "res/hideout/",
        "res/quest/",
        "res/trader/",
    ];

    for (let path in inputDir) {
        let inputFiles = fs.readdirSync(inputDir[path]);
        
        for (let file in inputFiles) {
            let filePath = inputDir[path] + inputFiles[file];
            let fileName = inputFiles[file].replace(".png", "").replace(".jpg", "");

            if (path == 0) {
                filepaths.images.banners[fileName] = filePath;
            } else if (path == 1) {
                filepaths.images.handbook[fileName] = filePath;
            } else if (path == 2) {
                filepaths.images.hideout[fileName] = filePath;
            } else if (path == 3) {
                filepaths.images.quest[fileName] = filePath;
            } else if (path == 4) {
                filepaths.images.trader[fileName] = filePath;
            }
        }
    }
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