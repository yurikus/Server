"use strict";

require('../libs.js');

function nullResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":null}';
}

function showIndex(url, info, sessionID) {
    return index_f.index();
}

function showInventoryChecker(url, info, sessionID) {
    return index_f.inventory(sessionID);
}

router.addStaticRoute("/", showIndex);
router.addStaticRoute("/inv", showInventoryChecker);
router.addStaticRoute("/favicon.ico", nullResponse);