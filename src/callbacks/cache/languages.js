"use strict";

function cache() {
    if (!serverConfig.rebuildCache) {
        return;
    }
    
    let base = [];

    for (let file in db.locales) {
        let fileData = json.parse(json.read(db.locales[file][file]));
        base.push(fileData);
    }

    json.write("user/cache/languages.json", base);
}

server.addStartCallback("cacheLanguages", cache);