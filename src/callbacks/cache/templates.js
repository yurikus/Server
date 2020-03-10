"use strict";

function cache() {
    if (!serverConfig.rebuildCache) {
        return;
    }
    
    logger.logInfo("Caching: templates.json");

    let base = {"Categories": [], "Items": []};
    let inputDir = [
        "categories",
        "items"
    ];

    for (let path in inputDir) {
        let inputFiles = db.templates[inputDir[path]];

        for (let file in inputFiles) {
            let filePath = inputFiles[file];
            let fileData = json.parse(json.read(filePath));

            if (path == 0) {
                base.Categories.push(fileData);
            } else {
                base.Items.push(fileData);
            }
        }
    }

    json.write("user/cache/templates.json", base);
}

server.addStartCallback("cacheTemplates", cache);