"use strict";

function nullResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":null}';
}

function updateHealth(url, info, sessionID) {
    health_f.healthServer.updateHealth(info, sessionID);
    return nullResponse;
}

router.addStaticRoute("/player/health/events", updateHealth);
item_f.itemServer.addRoute("Eat", health_f.healthServer.offraidEat);
item_f.itemServer.addRoute("Heal", health_f.healthServer.offraidHeal);