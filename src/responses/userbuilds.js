"use strict";

require('../libs.js');

function getHandbookUserlist(url, info, sessionID) {
    return '{"err":0,"errmsg":null,"data":' + json.stringify(weaponBuilds_f.getUserBuilds(sessionID)) + '}';
}

router.addStaticRoute("/client/handbook/builds/my/list", getHandbookUserlist);
router.addItemRoute("SaveBuild", weaponBuilds_f.saveBuild);
router.addItemRoute("RemoveBuild", weaponBuilds_f.removeBuild);