"use strict";

require('../libs.js');

function getCustomization(info) {
    return json.stringify(customizationOutfits);
}

function getCustomizationStorage(url, info, sessionID) {
    return json.read(customization_f.getPath(sessionID));
}

router.addStaticRoute("/client/customization", getCustomization);
router.addStaticRoute("/client/trading/customization/storage", getCustomizationStorage);
router.addItemRoute("CustomizationWear", customization_f.wearClothing);
router.addItemRoute("CustomizationBuy", customization_f.buyClothing);