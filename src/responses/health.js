"use strict";

function updateHealth(url, info, sessionID) {
    health_f.healthServer.updateHealth(info, sessionID);
    return json.stringify({"err": 0, "errmsg": null, "data": null});
}

function offraidEat(pmcData, body, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": health_f.healthServer.offraidEat(pmcData, body, sessionID)});
}

function offraidHeal(pmcData, body, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": health_f.healthServer.offraidHeal(pmcData, body, sessionID)});
}

router.addStaticRoute("/player/health/events", updateHealth);
item_f.itemServer.addRoute("Eat", offraidEat);
item_f.itemServer.addRoute("Heal", offraidHeal);