"use strict";

function getItems(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": items});
}

function getGlobals(url, info, sessionID) {
    globals.time = Math.round(Date.now() / 1000);
    return json.stringify({"err": 0, "errmsg": null, "data": globals});
}

function getTemplates(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": templates});
}

router.addStaticRoute("/client/items", getItems);
router.addStaticRoute("/client/globals", getGlobals);
router.addStaticRoute("/client/handbook/templates", getTemplates);