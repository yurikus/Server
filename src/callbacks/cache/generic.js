"use strict";

function genericCacher(cacheName, filepathNode) {
    logger.logInfo("Caching: " + cacheName);

    let base = undefined;
    let inputFiles = filepathNode;

    switch (cacheName) {
        case "quests.json":
        case "traders.json":
        case "hideout_areas.json":
        case "hideout_production.json":
        case "hideout_scavcase.json":
        case "weather.json":
            base = [];
        break;

        case "items.json":
        case "customization.json":
            base = {};
        break;
    }

    for (let file in inputFiles) {
        let filePath = inputFiles[file];
        let fileData = json.parse(json.read(filePath));
        let fileName = "";

        switch (cacheName) {
            case "quests.json":
            case "traders.json":
            case "hideout_areas.json":
            case "hideout_production.json":
            case "hideout_scavcase.json":
            case "weather.json":
                base.push(fileData);
            break;

            case "items.json":
                fileName = fileData._id;
                base[fileName] = fileData;
            break;

            case "customization.json":
                fileName = file;
                base[fileName] = fileData;
            break;
        }
    }

    json.write("user/cache/" + cacheName, base);
}

function cache() {
    if (serverConfig.rebuildCache) {
        genericCacher("items.json", db.items);
        genericCacher("quests.json", db.quests);
        genericCacher("customization.json", db.customization);
        genericCacher("hideout_areas.json", db.hideout.areas);
        genericCacher("hideout_production.json", db.hideout.production);
        genericCacher("hideout_scavcase.json", db.hideout.scavcase);
        genericCacher("weather.json", db.weather);   
    }
}

server.addStartCallback("cacheGeneric", cache);