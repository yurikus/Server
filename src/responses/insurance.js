"use strict";

require('../libs.js');

function getInsuranceCost(url, info, sessionID) {
    return insurance_f.cost(info, sessionID);
}

router.addStaticRoute("/client/insurance/items/list/cost", getInsuranceCost);
router.addItemRoute("Insure", insurance_f.insure);