"use strict";

require('../libs.js');

function getLocations(url, info, sessionID) {
    return map_f.mapServer.generateAll();
}

function getMap(url, info, sessionID) {
    return "MAP";
}

router.addStaticRoute("/client/locations", getLocations);
router.addDynamicRoute("/api/location", getMap);