"use strict";

require('../libs.js');

function nullResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":null}';
}

function updateHealth(url, info, sessionID) {
    health_f.healthServer.updateHealth(info, sessionID);
    return nullResponse;
}

router.addStaticRoute("/player/health/events", updateHealth);
router.addItemRoute("Eat", health_f.healthServer.offraidEat);
router.addItemRoute("Heal", health_f.healthServer.offraidHeal);