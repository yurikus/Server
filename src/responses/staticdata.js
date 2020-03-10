"use strict";

function getItems(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": staticdata_f.getItems()});
}

function getGlobals(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": staticdata_f.getGlobals()});
}

function getTemplates(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": staticdata_f.getTemplates()});
}

router.addStaticRoute("/client/items", getItems);
router.addStaticRoute("/client/globals", getGlobals);
router.addStaticRoute("/client/handbook/templates", getTemplates);