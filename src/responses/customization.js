"use strict";

function getCustomization(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": customization_f.getCustomization()});
}

function getCustomizationStorage(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": customization_f.getStorage(sessionID)});
}

router.addStaticRoute("/client/customization", getCustomization);
router.addStaticRoute("/client/trading/customization/storage", getCustomizationStorage);
item_f.itemServer.addRoute("CustomizationWear", customization_f.wearClothing);
item_f.itemServer.addRoute("CustomizationBuy", customization_f.buyClothing);