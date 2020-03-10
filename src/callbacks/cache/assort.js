"use strict";

function cache() {
    if (!serverConfig.rebuildCache) {
        return;
    }

    /* assort */
    for (let trader in db.assort) {
        logger.logInfo("Caching: assort_" + trader + ".json");

        let base = {"items": [], "barter_scheme": {}, "loyal_level_items": {}};
        let inputNode = db.assort[trader];
        let inputDir = [
            "items",
            "barter_scheme",
            "loyal_level_items"
        ];

        for (let path in inputDir) {
            let inputFiles = inputNode[inputDir[path]];
            let inputNames = Object.keys(inputFiles);
            let i = 0;

            for (let file in inputFiles) {
                let filePath = inputFiles[file];
                let fileName = inputNames[i++];
                let fileData = json.parse(json.read(filePath));

                if (path == 0) {
                    base.items.push(fileData);
                } else if (path == 1) {
                    base.barter_scheme[fileName] = fileData;
                } else if (path == 2) {
                    base.loyal_level_items[fileName] = fileData;
                }
            }
        }

        json.write("user/cache/assort_" + trader + ".json", base);
    }

    /* customization */
    for (let trader in db.assort) {
        if ("customization" in db.assort[trader]) {
            logger.logInfo("Caching: customization_" + trader + ".json");

            let base = [];

            for (let file in db.assort[trader].customization) {
                base.push(json.parse(json.read(db.assort[trader].customization[file])));
            }

            json.write("user/cache/customization_" + trader + ".json", base);
        }
    }
}

server.addStartCallback("cacheAssort", cache);