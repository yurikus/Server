"use strict";

function done() {
    serverConfig.rebuildCache = false;
    json.write("user/server.config.json", settings);
}

server.addStartCallback("doneCaching", done);