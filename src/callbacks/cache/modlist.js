"use strict"

function cache() {
    if (serverConfig.rebuildCache) {
        logger.logInfo("Caching: mods.json");    
        json.write("user/cache/mods.json", settings.mods.list);
    }
}

server.addStartCallback("cacheModlist", cache);