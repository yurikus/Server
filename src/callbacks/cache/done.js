"use strict";

function done() {
    serverConfig.rebuildCache = false;
    json.write("user/config/server.json", serverConfig);
}

server.addStartCallback("doneCaching", done);