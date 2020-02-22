"use strict";

let customization = undefined;

function initialize() {
	customization = json.parse(json.read(db.user.cache.customization));
}

function getCustomization() {
	return customization;
}

function getPath(sessionID) {
	let path = db.user.profiles.storage;
	return path.replace("__REPLACEME__", sessionID);
}

function wearClothing(pmcData, body, sessionID) {
	for (let i = 0; i < body.suites.length; i++) {
		let suite = customization.data[body.suites[i]];

		// this parent reffers to Lower Node
		if (suite._parent == "5cd944d01388ce000a659df9") {
			pmcData.Customization.Feet = suite._props.Feet;
		}

		// this parent reffers to Upper Node
		if (suite._parent == "5cd944ca1388ce03a44dc2a4") {
			pmcData.Customization.Body = suite._props.Body;
			pmcData.Customization.Hands = suite._props.Hands;
		}
	}

	return item_f.itemServer.getOutput();
}

function buyClothing(pmcData, body, sessionID) {
	let output = item_f.itemServer.getOutput();
	let assort = trader_f.traderServer.getAllCustomization();
	let storage = json.parse(json.read(getPath(sessionID)));
	let itemsToPay = [];

    /* find items to pay */
    for (let outfit of assort) {
		if (outfit.suiteId === body.offer) {
			console.log("found");

        	for (let item of outfit.requirements.itemRequirements) {
                itemsToPay.push({
                    "id": item._tpl,
                    "count": item.count
                });
			}

			break;
        }
	}

	if (itemsToPay.length > 0) {
		if (!itm_hf.payMoney(pmcData, {"scheme_items": itemsToPay, "tid": body.tid}, sessionID)) {
			logger.LogError("no money found");
			return "";
		}
	}

	for (let offer of assort) {
		if (body.offer == offer.suiteId) {
			storage.data.suites.push(offer.suiteId);
		}
	}

	json.write(getPath(sessionID), storage);
	return output;
}

module.exports.initialize = initialize;
module.exports.getCustomization = getCustomization;
module.exports.getPath = getPath;
module.exports.wearClothing = wearClothing;
module.exports.buyClothing = buyClothing;