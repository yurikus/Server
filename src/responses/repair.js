"use strict";

require('../libs.js');

function handleRepair(url, info, sessionID) {
    return repair_f.main(info);
}

router.addStaticRoute("/client/repair/exec", handleRepair);
router.addItemRoute("Repair", repair_f.main);
