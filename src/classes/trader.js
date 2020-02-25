"use strict";

/* TraderServer class maintains list of traders for each sessionID in memory. */
class TraderServer {
    constructor() {
        this.traders = {};
        this.assorts = {};
        this.customization = {};

        this.initializeTraders();
    }

    /* Load all the traders into memory. */
    initializeTraders() {
        logger.logWarning("Loading traders into RAM...");

        for (let id in db.traders) {
            this.traders[id] = json.parse(json.read(db.traders[id]));
        }
    }

    initializeCustomization() {
        logger.logWarning("Loading customization into RAM...");

        for (let id in db.traders) {
            if ("customization_" + id in db.user.cache) {
                this.customization[id] = json.parse(json.read(db.user.cache["customization_" + id]));
            }
        }
    }

    getTrader(id) {
        return {err: 0, errmsg: "", data: this.traders[id]};
    }

    getAllTraders(sessionID) {
        let pmcData = profile_f.profileServer.getPmcProfile(sessionID);
        let traders = [];

        for (let traderId in this.traders) {
            let trader = this.traders[traderId];

            trader.loyalty.currentLevel = pmcData.TraderStandings[traderId].currentLevel;
            trader.loyalty.currentStanding = pmcData.TraderStandings[traderId].currentStanding;
            trader.loyalty.currentSalesSum = pmcData.TraderStandings[traderId].currentSalesSum;
            traders.push(trader);
        }

        return {err: 0, errmsg: null, data: traders};
    }

    lvlUp(id, sessionID) {
        let pmcData = profile_f.profileServer.getPmcProfile(sessionID);
        let loyaltyLevels = this.traders[id].loyalty.loyaltyLevels;

        // level up player
        let checkedExp = 0;

        for (let level in globals.data.config.exp.level.exp_table) {
            if (pmcData.Info.Experience < checkedExp) {
                break;
            }

            pmcData.Info.Level = parseInt(level);
            checkedExp += globals.data.config.exp.level.exp_table[level].exp;
        }

        // level up traders
        let targetLevel = 0;
        
        for (let level in loyaltyLevels) {
            // level reached
            if ((loyaltyLevels[level].minLevel <= pmcData.Info.Level
            && loyaltyLevels[level].minSalesSum <= pmcData.TraderStandings[id].currentSalesSum
            && loyaltyLevels[level].minStanding <= pmcData.TraderStandings[id].currentStanding)
            && targetLevel < 4) {
                targetLevel++;
                continue;
            }

            pmcData.TraderStandings[id].currentLevel = targetLevel;
            break;
        }

        // set assort
        this.generateAssort(id);
    }

    getAssort(traderId) {
        if (!("traderId" in this.assorts)) {
            this.generateAssort(traderId);
        }
        
        return this.assorts[traderId];
    }

    generateAssort(traderId) {
        if (traderId === "579dc571d53a0658a154fbec") {
            logger.logWarning("generating fence");
            this.generateFence();
            return;
        }

        let base = json.parse(json.read(db.user.cache["assort_" + traderId]));

        // 1 is min level, 4 is max level
        if (traderId !== "579dc571d53a0658a154fbec") {
            let keys = Object.keys(base.data.loyal_level_items);
            let level = this.traders[traderId].loyalty.currentLevel;

            for (let i = 1; i < 4; i++) {
                for (let key of keys) {
                    if (base.data.loyal_level_items[key] > level) {
                        base = this.removeItemFromAssort(base, key);
                    }
                }
            }
        }

        this.assorts[traderId] = base;
    }

    generateFence() {
        let base = json.parse(json.read("db/cache/assort.json"));
        let names = Object.keys(db.assort["579dc571d53a0658a154fbec"].loyal_level_items);
        let added = [];

        for (let i = 0; i < settings.gameplay.trading.fenceAssortSize; i++) {
            let id = names[utility.getRandomInt(0, names.length - 1)];

            if (added.includes(id)) {
                i--;
                continue;
            }

            added.push(id);
            base.data.items.push(json.parse(json.read(db.assort["579dc571d53a0658a154fbec"].items[id])));
            base.data.barter_scheme[id] = json.parse(json.read(db.assort["579dc571d53a0658a154fbec"].barter_scheme[id]));
            base.data.loyal_level_items[id] = json.parse(json.read(db.assort["579dc571d53a0658a154fbec"].loyal_level_items[id]));
        }

        this.assorts['579dc571d53a0658a154fbec'] = base;
    }

    removeItemFromAssort(assort, id) {
        let toDo = [id];

        // delete assort keys
        delete assort.data.barter_scheme[id];
        delete assort.data.loyal_level_items[id];

        // find and delete all related items
        if (toDo[0] !== undefined && toDo[0] !== null && toDo[0] !== "undefined") {
            let ids_toremove = findAndReturnChildren(assort, toDo[0]);

            for (let i in ids_toremove) {
                for (let a in assort.data.items) {
                    if (assort.data.items[a]._id === ids_toremove[i]) {
                        assort.data.items.splice(a, 1);
                    }
                }
            }

            return assort;
        }

        logger.logError("assort item id is not valid");
        return "";
    }

    getCustomization(traderId) {
        if (!("traderId" in this.customization) && "customization_" + traderId in db.user.cache) {
            this.customization[traderId] = json.parse(json.read(db.user.cache["customization_" + traderId]));
        }
        
        return this.customization[traderId];
    }

    getAllCustomization() {
        let output = [];

        for (let traderId in this.customization) {
            output = output.concat(this.getCustomization(traderId));
        }

        return output;
    }
}

function findAndReturnChildren(object, itemID) {
        let list = [];
		
		// If trader assort
		if ("data" in object) {
			for (let childitem of object.data.items) {
				if (childitem.parentId === itemID) {
					list.push(findAndReturnChildren(object, childitem._id));
				}
			}
		}
		// If PMC inventory
		else if ("Inventory" in object) {
			for (let childItem of object.Inventory.items) {
				if(childItem.parentId === itemID) {
					list.push(findAndReturnChildren(object, childItem._id));
				}
			}
		}
		// Else throw error
		else {
			console.log("findAndReturnChildren( ) error thrown, not trader assort or PMC inventory.");
			return "";
		}

        list.push(itemID); // it's required
        return list;
}

function getPurchasesData(tmpTraderInfo, sessionID) {
    let pmcData = profile_f.profileServer.getPmcProfile(sessionID);
    let currency = itm_hf.getCurrency(trader_f.traderServer.getTrader(tmpTraderInfo, sessionID).data.currency);
    let output = {};

    // get sellable items
    for (let item of pmcData.Inventory.items) {
        if (item._id !== pmcData.Inventory.equipment
        && item._id !== pmcData.Inventory.stash
        && item._id !== pmcData.Inventory.questRaidItems
        && item._id !== pmcData.Inventory.questStashItems
        && !itm_hf.isNotSellable(item._tpl)) {
		let allIDs = findAndReturnChildren(pmcData, item._id);
		let totalprice = 0;

		// Recursive loop to go through a nested multidimentional array of all the children IDs + item ID
		allIDs.forEach(function each(elem) {
			if (Array.isArray(elem)) {
				elem.forEach(each);
			}
			else {
				for (let childItem of pmcData.Inventory.items) {
					if(childItem._id === elem) {
						// calculate normal price and count
						let price = (items.data[childItem._tpl]._props.CreditsPrice >= 1 ? items.data[childItem._tpl]._props.CreditsPrice : 1);
						let count = (typeof childItem.upd !== "undefined" ? (typeof childItem.upd.StackObjectsCount !== "undefined" ? childItem.upd.StackObjectsCount : 1) : 1);

						// uses profile information to get the level of the dogtag and multiplies
						if ("upd" in childItem && "Dogtag" in childItem.upd && itm_hf.isDogtag(childItem._tpl)) {
							price *= childItem.upd.Dogtag.Level;
						}

						// get real price
						price = price * count * settings.gameplay.trading.sellMultiplier;
						price = itm_hf.fromRUB(price, currency);
						price = (price > 0 && price !== "NaN" ? price : 1);
						
						// total price of the item
						totalprice += price;			
					}
				}
			}
		});
		output[item._id] = [[{"_tpl": currency, "count": totalprice.toFixed(0)}]];
	}
    }

    return output;
}

module.exports.traderServer = new TraderServer();
module.exports.getPurchasesData = getPurchasesData;
