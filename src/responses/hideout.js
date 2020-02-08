"use strict";

require('../libs.js');

function getHideoutRecipes(url, info, sessionID) {
    return json.read(filepaths.user.cache.hideout_production);
}

function getHideoutSettings(url, info, sessionID) {
    return json.read(filepaths.hideout.settings);
}

function getHideoutAreas(url, info, sessionID) {
    return json.read(filepaths.user.cache.hideout_areas);
}

function getScavDatacaseRecipes(url, info, sessionID) {
    return json.read(filepaths.user.cache.hideout_scavcase);
}

router.addStaticRoute("/client/hideout/production/recipes", getHideoutRecipes);
router.addStaticRoute("/client/hideout/settings", getHideoutSettings);
router.addStaticRoute("/client/hideout/areas", getHideoutAreas);
router.addStaticRoute("/client/hideout/production/scavcase/recipes", getScavDatacaseRecipes);
router.addItemRoute("HideoutUpgrade", hideout_f.hideoutUpgrade);
router.addItemRoute("HideoutUpgradeComplete", hideout_f.hideoutUpgradeComplete);
router.addItemRoute("HideoutContinuousProductionStart", hideout_f.hideoutContinuousProductionStart);
router.addItemRoute("HideoutSingleProductionStart", hideout_f.hideoutSingleProductionStart);
router.addItemRoute("HideoutScavCaseProductionStart", hideout_f.hideoutScavCaseProductionStart);
router.addItemRoute("HideoutTakeProduction", hideout_f.hideoutTakeProduction);
router.addItemRoute("HideoutPutItemsInAreaSlots", hideout_f.hideoutPutItemsInAreaSlots);
router.addItemRoute("HideoutTakeItemsFromAreaSlots", hideout_f.hideoutTakeItemsFromAreaSlots);
router.addItemRoute("HideoutToggleArea", hideout_f.hideoutToggleArea);