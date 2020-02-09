"use strict";

function getItems(url, info, sessionID) {
    return json.stringify(items);
}

function getGlobals(url, info, sessionID) {
    let globals = globalSettings;
    globals.data.time = Date.now() / 1000;
    return json.stringify(globals);
}

function getTemplates(url, info, sessionID) {
    return json.read(filepaths.user.cache.templates);
}

router.addStaticRoute("/client/items", getItems);
router.addStaticRoute("/client/globals", getGlobals);
router.addStaticRoute("/client/handbook/templates", getTemplates);