"use strict";

// remove the labs keycard at the end of raid in labs
function removeLabKeyCard(offraidData) {
    if (offraidData.profile.Info.EntryPoint !== "Laboratory") {
        return;
    }

    for (let item of offraidData.profile.Inventory.items) {
        if (item._tpl === "5c94bbff86f7747ee735c08f" && item.slotId !== "Hideout") {
            move_f.removeItemFromProfile(offraidData.profile, item._id);
            break;
        }
    }
}

/* adds SpawnedInSession property to items found in a raid */
function markFoundItems(pmcData, offraidData, isPlayerScav) {
    // mark items found in raid
    for (let offraidItem of offraidData.Inventory.items) {
        let found = false;

        // mark new items for PMC, mark all items for scavs
        if (!isPlayerScav) {
            for (let item of pmcData.Inventory.items) {
                if (offraidItem._id === item._id) {
                    found = true;
                    break;
                }
            }

            if (found) {
                continue;
            }
        }

        // mark item found in raid
        if (offraidItem.hasOwnProperty("upd")) {
            offraidItem.upd["SpawnedInSession"] = true;
        } else {
            offraidItem["upd"] = {"SpawnedInSession": true};
        }
    }

    return offraidData;
}

function setInventory(pmcData, offraidData) {
    move_f.removeItemFromProfile(pmcData, pmcData.Inventory.equipment);
    move_f.removeItemFromProfile(pmcData, pmcData.Inventory.questRaidItems);
    move_f.removeItemFromProfile(pmcData, pmcData.Inventory.questStashItems);

    for (let item of offraidData.Inventory.items) {
        pmcData.Inventory.items.push(item);
    }

    return pmcData;
}

function deleteInventory(pmcData, sessionID) {
    let toDelete = [];

    for (let item of pmcData.Inventory.items) {
        // remove normal item
        if (item.parentId === pmcData.Inventory.equipment
        && item.slotId !== "SecuredContainer"
        && item.slotId !== "Scabbard"
        && item.slotId !== "Pockets") {
            toDelete.push(item._id);
        }

        // remove pocket insides
        if (item.slotId === "Pockets") {
            for (let pocket of pmcData.Inventory.items) {
                if (pocket.parentId === item._id) {
                    toDelete.push(pocket._id);
                }
            }
        }
    }

    // delete items
    for (let item of toDelete) {
        move_f.removeItemFromProfile(pmcData, item);
    }

    return pmcData;
}

function getPlayerGear(items) {
    // Player Slots we care about
    const inventorySlots = [
        'FirstPrimaryWeapon',
        'SecondPrimaryWeapon',
        'Holster',
        'Headwear',
        'Earpiece',
        'Eyewear',
        'FaceCover',
        'ArmorVest',
        'TacticalVest',
        'Backpack',
        'pocket1',
        'pocket2',
        'pocket3',
        'pocket4',
    ];

    let inventoryItems = [];

    // Get an array of root player items
    for (let item of items) {
        if (inventorySlots.includes(item.slotId)) {
            inventoryItems.push(item);
        }
    }

    // Loop through these items and get all of their children
    let newItems = inventoryItems;
    while (newItems.length > 0) {
        let foundItems = [];
        
        for (let item of newItems) {
            // Find children of this item
            for (let newItem of items) {
                if (newItem.parentId === item._id) {
                    foundItems.push(newItem);
                }
            }
        }

        // Add these new found items to our list of inventory items
        inventoryItems = [
            ...inventoryItems,
            ...foundItems,
        ];

        // Now find the children of these items
        newItems = foundItems;
    }

    return inventoryItems;
}

function saveProgress(offraidData, sessionID) {
    if (!settings.gameplay.inraid.saveLootEnabled) {
        return;
    }

    let pmcData = profile_f.profileServer.getPmcProfile(sessionID);
    let scavData = profile_f.profileServer.getScavProfile(sessionID);
    const isPlayerScav = offraidData.isPlayerScav;
    const isDead = offraidData.exit !== "survived" && offraidData.exit !== "runner";
    const preRaidGear = isPlayerScav ? [] : getPlayerGear(pmcData.Inventory.items);

    // set pmc data
    if (!isPlayerScav) {
        pmcData.Info.Level = offraidData.profile.Info.Level;
        pmcData.Skills = offraidData.profile.Skills;
        pmcData.Stats = offraidData.profile.Stats;
        pmcData.Encyclopedia = offraidData.profile.Encyclopedia;
        pmcData.ConditionCounters = offraidData.profile.ConditionCounters;
        pmcData.Quests = offraidData.profile.Quests;
        
        // For some reason, offraidData seems to drop the latest insured items.
        // It makes more sense to use pmcData's insured items as the source of truth.
        offraidData.profile.InsuredItems = pmcData.InsuredItems;

        // add experience points
        pmcData.Info.Experience += pmcData.Stats.TotalSessionExperience;
        pmcData.Stats.TotalSessionExperience = 0;

        // level 69 cap to prevent visual bug occuring at level 70
        if (pmcData.Info.Experience > 13129881) {
            pmcData.Info.Experience = 13129881;
        }

        // set player health now
        health_f.healthServer.applyHealth(pmcData, sessionID);

        // Remove the Lab card
        removeLabKeyCard(offraidData);
    }

    // mark found items and replace item ID's
    offraidData.profile = markFoundItems(pmcData, offraidData.profile, isPlayerScav);
    offraidData.profile.Inventory.items = itm_hf.replaceIDs(offraidData.profile, offraidData.profile.Inventory.items);

    // set profile equipment to the raid equipment
    if (isPlayerScav) {
        scavData = setInventory(scavData, offraidData.profile);
        return;
    } else {
        pmcData = setInventory(pmcData, offraidData.profile);
    }

    // remove inventory if player died and send insurance items
    insurance_f.insuranceServer.storeLostGear(pmcData, offraidData, preRaidGear, sessionID);

    if (isDead) {
        insurance_f.insuranceServer.storeDeadGear(pmcData, sessionID);
        pmcData = deleteInventory(pmcData, sessionID);
    }

    insurance_f.insuranceServer.sendInsuredItems(pmcData, sessionID);
}

module.exports.saveProgress = saveProgress;