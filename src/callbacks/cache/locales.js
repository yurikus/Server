"use strict";

function cache() {
    if (!serverConfig.rebuildCache) {
        return;
    }
    
    for (let locale in db.locales) {
        let base = {"interface": {}, "enum": [], "error": {}, "mail": {}, "quest": {}, "preset": {}, "handbook": {}, "season": {}, "templates": {}, "locations": {}, "banners": {}, "trading": {}}
        let inputNode = db.locales[locale];
        let inputDir = [
            "mail",
            "quest",
            "preset",
            "handbook",
            "season",
            "templates",
            "locations",
            "banners",
            "trading",
        ];

        logger.logInfo("Caching: locale_" + locale + ".json");

        base.interface = json.parse(json.read(inputNode.interface));
        base.error = json.parse(json.read(inputNode.error));

        for (let path in inputDir) {
            let inputFiles = inputNode[inputDir[path]];
            let inputNames = Object.keys(inputFiles);
            let i = 0;

            for (let file in inputFiles) {
                let filePath = inputFiles[file];
                let fileData = json.parse(json.read(filePath));
                let fileName = inputNames[i++];

                if (path == 0) {
                    base.mail[fileName] = fileData;
                } else if (path == 1) {
                    base.quest[fileName] = fileData;
                } else if (path == 2) {
                    base.preset[fileName] = fileData;
                } else if (path == 3) {
                    base.handbook[fileName] = fileData;
                } else if (path == 4) {
                    base.season[fileName] = fileData;
                } else if (path == 5) {
                    base.templates[fileName] = fileData;
                } else if (path == 6) {
                    base.locations[fileName] = fileData;
                } else if (path == 7) {
                    base.banners[fileName] = fileData;
                } else if (path == 8) {
                    base.trading[fileName] = fileData;
                }
            }
        }

        json.write("user/cache/locale_" + locale + ".json", base);
    }
}

server.addStartCallback("cacheLocales", cache);