"use strict";

function getLocations(url, info, sessionID) {
    return location_f.locationServer.generateAll();
}

function getLocation(url, info, sessionID) {
    return "LOCATION";
}

function sendLocation(sessionID, req, resp, body) {
    server.sendTextJson(resp, location_f.locationServer.get(req.url.replace("/api/location/", "")));
}

router.addStaticRoute("/client/locations", getLocations);
router.addDynamicRoute("/api/location", getLocation);
server.addRespondCallback("LOCATION", sendLocation);