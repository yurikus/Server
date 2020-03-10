"use strict";

function getRecipes(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": hideout_f.getProduction()});
}

function getSettings(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": hideout_f.getSettings()});
}

function getAreas(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": hideout_f.getAreas()});
}

function getScavDatacaseRecipes(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": hideout_f.getScavcase()});
}

router.addStaticRoute("/client/hideout/production/recipes", getRecipes);
router.addStaticRoute("/client/hideout/settings", getSettings);
router.addStaticRoute("/client/hideout/areas", getAreas);
router.addStaticRoute("/client/hideout/production/scavcase/recipes", getScavDatacaseRecipes);
item_f.itemServer.addRoute("HideoutUpgrade", hideout_f.upgrade);
item_f.itemServer.addRoute("HideoutUpgradeComplete", hideout_f.upgradeComplete);
item_f.itemServer.addRoute("HideoutContinuousProductionStart", hideout_f.continuousProductionStart);
item_f.itemServer.addRoute("HideoutSingleProductionStart", hideout_f.singleProductionStart);
item_f.itemServer.addRoute("HideoutScavCaseProductionStart", hideout_f.scavCaseProductionStart);
item_f.itemServer.addRoute("HideoutTakeProduction", hideout_f.takeProduction);
item_f.itemServer.addRoute("HideoutPutItemsInAreaSlots", hideout_f.putItemsInAreaSlots);
item_f.itemServer.addRoute("HideoutTakeItemsFromAreaSlots", hideout_f.takeItemsFromAreaSlots);
item_f.itemServer.addRoute("HideoutToggleArea", hideout_f.toggleArea);