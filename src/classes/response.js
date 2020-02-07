"use strict";

require('../libs.js');

// static routes
router.addStaticRoute("/", showIndex);
router.addStaticRoute("/inv", showInventoryChecker);
router.addStaticRoute("/favicon.ico", nullResponse);
router.addStaticRoute("/client/friend/list", getFriendList);
router.addStaticRoute("/client/languages", getLocale);
router.addStaticRoute("/client/items", getItems);
router.addStaticRoute("/client/globals", getGlobals);
router.addStaticRoute("/client/game/profile/list", getProfileData);
router.addStaticRoute("/client/game/profile/select", selectProfile);
router.addStaticRoute("/client/profile/status", getProfileStatus);
router.addStaticRoute("/client/weather", getWeather);
router.addStaticRoute("/client/locations", getLocations);
router.addStaticRoute("/client/handbook/templates", getTemplates);
router.addStaticRoute("/client/quest/list", getQuests);
router.addStaticRoute("/client/game/bot/generate", getBots);
router.addStaticRoute("/client/trading/api/getTradersList", getTraderList);
router.addStaticRoute("/client/server/list", getServer);
router.addStaticRoute("/client/ragfair/search", searchRagfair);
router.addStaticRoute("/client/ragfair/find", searchRagfair);
router.addStaticRoute("/client/chatServer/list", getChatServerList);
router.addStaticRoute("/client/game/profile/nickname/change", changeNickname);
router.addStaticRoute("/client/game/profile/voice/change", changeVoice);
router.addStaticRoute("/client/repair/exec", handleRepair);
router.addStaticRoute("/client/game/keepalive", handleKeepAlive);
router.addStaticRoute("/client/game/version/validate", validateGameVersion);
router.addStaticRoute("/client/game/config", getGameConfig);
router.addStaticRoute("/client/customization", getCustomization);
router.addStaticRoute("/client/trading/customization/storage", getCustomizationStorage);
router.addStaticRoute("/client/hideout/production/recipes", getHideoutRecipes);
router.addStaticRoute("/client/hideout/settings", getHideoutSettings);
router.addStaticRoute("/client/hideout/areas", getHideoutAreas);
router.addStaticRoute("/client/hideout/production/scavcase/recipes", getScavDatacaseRecipes);
router.addStaticRoute("/client/handbook/builds/my/list", getHandbookUserlist);
router.addStaticRoute("/client/notifier/channel/create", createNotifierChannel);
router.addStaticRoute("/client/game/profile/nickname/reserved", getReservedNickname);
router.addStaticRoute("/client/game/profile/nickname/validate", validateNickname);
router.addStaticRoute("/client/game/profile/create", createProfile);
router.addStaticRoute("/client/insurance/items/list/cost", getInsuranceCost);
router.addStaticRoute("/client/game/logout", nullResponse);
router.addStaticRoute("/client/match/exit", nullResponse);
router.addStaticRoute("/client/game/profile/savage/regenerate", regenerateScav);
router.addStaticRoute("/client/mail/dialog/list", getMailDialogList);
router.addStaticRoute("/client/mail/dialog/view", getMailDialogView);
router.addStaticRoute("/client/mail/dialog/info", getMailDialogInfo);
router.addStaticRoute("/client/mail/dialog/remove", removeDialog);
router.addStaticRoute("/client/mail/dialog/pin", pinDialog);
router.addStaticRoute("/client/mail/dialog/unpin", unpinDialog);
router.addStaticRoute("/client/mail/dialog/read", setRead);
router.addStaticRoute("/client/mail/dialog/getAllAttachments", getAllAttachments);
router.addStaticRoute("/client/friend/request/list/outbox", nullArrayResponse);
router.addStaticRoute("/client/friend/request/list/inbox", nullArrayResponse);

// EmuTarkov-Launcher
router.addStaticRoute("/launcher/profile/login", loginUser);

/// EmuLib
router.addStaticRoute("/OfflineRaidSave", saveProgress);
router.addStaticRoute("/player/health/events", updateHealth);

// dynamic routes
router.addDynamicRoute("/api/location", getMap);
router.addDynamicRoute(".jpg", getImage);
router.addDynamicRoute(".png", getImage);
router.addDynamicRoute("/?last_id", handleNotifierCustomLink);
router.addDynamicRoute("/client/trading/api/getUserAssortPrice/trader/", getProfilePurchases);
router.addDynamicRoute("/client/trading/api/getTrader/", getTrader);
router.addDynamicRoute("/client/trading/api/getTraderAssort/", getAssort);
router.addDynamicRoute("/client/trading/customization/", getCustomizationOffers);
router.addDynamicRoute("/client/menu/locale/", getMenuLocale);
router.addDynamicRoute("/client/locale/", getGlobalLocale);
router.addDynamicRoute("/notifierBase", nullArrayResponse);
router.addDynamicRoute("/notifierServer", notify);
router.addDynamicRoute("/push/notifier/get/", nullArrayResponse);

// item routs
router.addItemRoute("SaveBuild", weaponBuilds_f.saveBuild);
router.addItemRoute("RemoveBuild", weaponBuilds_f.removeBuild);
router.addItemRoute("HideoutUpgrade", hideout_f.hideoutUpgrade);
router.addItemRoute("HideoutUpgradeComplete", hideout_f.hideoutUpgradeComplete);
router.addItemRoute("HideoutContinuousProductionStart", hideout_f.hideoutContinuousProductionStart);
router.addItemRoute("HideoutSingleProductionStart", hideout_f.hideoutSingleProductionStart);
router.addItemRoute("HideoutScavCaseProductionStart", hideout_f.hideoutScavCaseProductionStart);
router.addItemRoute("HideoutTakeProduction", hideout_f.hideoutTakeProduction);
router.addItemRoute("HideoutPutItemsInAreaSlots", hideout_f.hideoutPutItemsInAreaSlots);
router.addItemRoute("HideoutTakeItemsFromAreaSlots", hideout_f.hideoutTakeItemsFromAreaSlots);
router.addItemRoute("HideoutToggleArea", hideout_f.hideoutToggleArea);
router.addItemRoute("QuestAccept", quest_f.acceptQuest);
router.addItemRoute("QuestComplete", quest_f.completeQuest);
router.addItemRoute("QuestHandover", quest_f.handoverQuest);
router.addItemRoute("AddNote", note_f.addNote);
router.addItemRoute("EditNote", note_f.editNode);
router.addItemRoute("DeleteNote", note_f.deleteNote);
router.addItemRoute("Move", move_f.moveItem);
router.addItemRoute("Remove", move_f.discardItem);
router.addItemRoute("Split", move_f.splitItem);
router.addItemRoute("Merge", move_f.mergeItem);
router.addItemRoute("Fold", status_f.foldItem);
router.addItemRoute("Toggle", status_f.toggleItem);
router.addItemRoute("Tag", status_f.tagItem);
router.addItemRoute("Bind", status_f.bindItem);
router.addItemRoute("Examine", status_f.examineItem);
router.addItemRoute("ReadEncyclopedia", status_f.readEncyclopedia);
router.addItemRoute("Eat", health_f.healthServer.offraidEat);
router.addItemRoute("Heal", health_f.healthServer.offraidHeal);
router.addItemRoute("Transfer", move_f.transferItem);
router.addItemRoute("Swap", move_f.swapItem);
router.addItemRoute("AddToWishList", wishList_f.addToWishList);
router.addItemRoute("RemoveFromWishList", wishList_f.removeFromWishList);
router.addItemRoute("TradingConfirm", trade_f.confirmTrading);
router.addItemRoute("RagFairBuyOffer", trade_f.confirmRagfairTrading);
router.addItemRoute("CustomizationWear", customization_f.wearClothing);
router.addItemRoute("CustomizationBuy", customization_f.buyClothing);
router.addItemRoute("Repair", repair_f.main);
router.addItemRoute("Insure", insurance_f.insure);

function nullResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":null}';
}

function nullArrayResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":[]}';
}

function showIndex(url, info, sessionID) {
    return index_f.index();
}

function showInventoryChecker(url, info, sessionID) {
    return index_f.inventory();
}

function notify(url, info) {
    return "NOTIFY";
}

function getGameConfig(url, info, sessionID) {
    let backendUrl = "https://" + ip;
    return '{"err":0, "errmsg":null, "data":{"queued":false, "banTime":0, "hash":"BAN0", "lang":"en", "aid":' + sessionID + ', "token":"token_' + sessionID + '", "taxonomy":"341", "activeProfileId":"user' + sessionID + 'pmc", "nickname":"user", "backend":{"Trading":"' + backendUrl + '", "Messaging":"' + backendUrl + '", "Main":"' + backendUrl + '", "RagFair":"' + backendUrl + '"}, "totalInGame":0}}';
}

function getFriendList(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":{"Friends":[], "Ignore":[], "InIgnoreList":[]}}';
}

function handleItems(url, info, sessionID) {
    return item.moving(info, sessionID);
}

function getLocale(url, info, sessionID) {
    return locale.getLanguages();
}

function loginUser(url, info, sessionID) {
    return account_f.accountServer.findID(info);
}

function getInsuranceCost(url, info, sessionID) {
    return insurance_f.cost(info, sessionID);
}

function getItems(url, info, sessionID) {
    return json.stringify(items);
}

function getGlobals(url, info, sessionID) {
    let globals = globalSettings;
    globals.data.time = Date.now() / 1000;
    return json.stringify(globals);
}

function getProfileData(url, info, sessionID) {
    let output = {err: 0, errmsg: null, data: []};

    if (!account_f.accountServer.isWiped(sessionID)) {
        output.data.push(profile_f.profileServer.getPmcProfile(sessionID));
        output.data.push(profile_f.profileServer.getScavProfile(sessionID));
    }

    return json.stringify(output);
}

function regenerateScav(url, info, sessionID) {
    return json.stringify({err: 0, errmsg: null, data: [profile_f.profileServer.generateScav(sessionID)]});
}

function selectProfile(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":{"status":"ok", "notifier":{"server":"https://' + ip + '/", "channel_id":"testChannel"}}}';
}

function getProfileStatus(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":[{"profileid":"scav' + sessionID + '", "status":"Free", "sid":"", "ip":"", "port":0}, {"profileid":"pmc' + sessionID + '", "status":"Free", "sid":"", "ip":"", "port":0}]}';
}

function getWeather(url, info, sessionID) {
    return weather_f.generate();
}

function getLocations(url, info, sessionID) {
    return map_f.mapServer.generateAll();
}

function getTemplates(url, info, sessionID) {
    return json.read(filepaths.user.cache.templates);
}

function getQuests(url, info, sessionID) {
    return json.stringify(quests);
}

function getBots(url, info, sessionID) {
    return json.stringify(bots.generate(info));
}

function getTraderList(url, info, sessionID) {
    return json.stringify(trader_f.traderServer.getAllTraders(sessionID));
}

function getServer(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":[{"ip":"' + ip + '", "port":"' + 443 + '"}]}';
}

function searchRagfair(url, info, sessionID) {
    return ragfair_f.getOffers(info);
}

function getChatServerList(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":[{"_id":"5ae20a0dcb1c13123084756f", "RegistrationId":20, "DateTime":' + Math.floor(new Date() / 1000) + ', "IsDeveloper":true, "Regions":["EUR"], "VersionId":"bgkidft87ddd", "Ip":"", "Port":0, "Chats":[{"_id":"0", "Members":0}]}]}';
}

function changeNickname(url, info, sessionID) {
    return profile_f.profileServer.changeNickname(info, sessionID);
}

function changeVoice(url, info, sessionID) {
    profile_f.profileServer.changeVoice(info, sessionID);
    return nullResponse(url, info, sessionID);
}

function handleRepair(url, info, sessionID) {
    return repair_f.main(info);
}

function handleKeepAlive(url, info, sessionID) {
    keepAlive_f.main(sessionID);
    return '{"err":0, "errmsg":null, "data":{"msg":"OK"}}';
}

function validateGameVersion(url, info, sessionID) {
    constants.setVersion(info.version.major);
    return nullResponse(url, info, sessionID);
}

function getCustomization(info) {
    return json.stringify(customizationOutfits);
}

function getCustomizationOffers(url, info, sessionID) {
    let tmpOffers = [];
    let offers = customizationOffers;
    let splittedUrl = url.split('/');

    for (let offer of offers.data) {
        if (offer.tid === splittedUrl[splittedUrl.length - 2]) {
            tmpOffers.push(offer);
        }
    }

    offers.data = tmpOffers;
    return json.stringify(offers);
}

function getCustomizationStorage(url, info, sessionID) {
    return json.read(customization_f.getPath(sessionID));
}

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

function getHandbookUserlist(url, info, sessionID) {
    return '{"err":0,"errmsg":null,"data":' + json.stringify(weaponBuilds_f.getUserBuilds(sessionID)) + '}';
}

function createNotifierChannel(url, info, sessionID) {
    return '{"err":0,"errmsg":null,"data":{"notifier":{"server":"https://' + ip + '/","channel_id":"testChannel","url":"https://' + ip + '/notifierServer/get/' + sessionID + '"},"notifierServer":"https://' + ip + '/notifierServer/get/' + sessionID + '"}}';
}

function getReservedNickname(url, info, sessionID) {
    return '{"err":0,"errmsg":null,"data":"' + account_f.accountServer.getReservedNickname(sessionID) + '"}';
}

function validateNickname(url, info, sessionID) {
    // todo: validate nickname properly
    return '{"err":0,"errmsg":null,"data":{"status":"ok"}}';
}

function createProfile(url, info, sessionID) {
    profile_f.profileServer.createProfile(info, sessionID);
    return '{"err":0,"errmsg":null,"data":{"uid":"pmc' + sessionID + '"}}';
}

function getMailDialogList(url, info, sessionID) {
    return dialogue_f.dialogueServer.generateDialogueList(sessionID);
}

function getMailDialogView(url, info, sessionID) {
    return dialogue_f.dialogueServer.generateDialogueView(info.dialogId, sessionID);
}

function getMailDialogInfo(url, info, sessionID) {
    let data = dialogue_f.dialogueServer.getDialogueInfo(info.dialogId, sessionID);
    return '{"err":0,"errmsg":null,"data":' + json.stringify(data) + '}';
}

function removeDialog(url, info, sessionID) {
    dialogue_f.dialogueServer.removeDialogue(info.dialogId, sessionID);
    return nullArrayResponse;
}

function pinDialog(url, info, sessionID) {
    dialogue_f.dialogueServer.setDialoguePin(info.dialogId, true, sessionID);
    return nullArrayResponse;
}

function unpinDialog(url, info, sessionID) {
    dialogue_f.dialogueServer.setDialoguePin(info.dialogId, false, sessionID);
    return nullArrayResponse;
}

function setRead(url, info, sessionID) {
    dialogue_f.dialogueServer.setRead(info.dialogs, sessionID);
    return nullArrayResponse;
}

function saveProgress(url, info, sessionID) {
    offraid_f.saveProgress(info, sessionID);
    return nullResponse;
}

function updateHealth(url, info, sessionID) {
    health_f.healthServer.updateHealth(info, sessionID);
    return nullResponse;
}

function getAllAttachments(url, info, sessionID) {
    let data = dialogue_f.dialogueServer.getAllAttachments(info.dialogId, sessionID);
    return '{"err":0,"errmsg":null,"data":' + json.stringify(data) + '}';
}

function getMap(url, info, sessionID) {
    return "MAP";
}

function getImage(url, info, sessionID) {
    return "IMAGE";
}

function handleNotifierCustomLink(url, info, sessionID) {
    return 'NOTIFY';
}

function getProfilePurchases(url, info, sessionID) {
    // let's grab the traderId from the url
    return profile_f.getPurchasesData(url.substr(url.lastIndexOf('/') + 1), sessionID);
}

function getTrader(url, info, sessionID) {
    return json.stringify(trader_f.traderServer.getTrader(url.replace("/client/trading/api/getTrader/", ''), sessionID));
}

function getAssort(url, info, sessionID) {
    return json.stringify(trader_f.traderServer.getAssort(url.replace("/client/trading/api/getTraderAssort/", '')));
}

function getMenuLocale(url, info, sessionID) {
    return locale.getMenu(url.replace("/client/menu/locale/", ''));
}

function getGlobalLocale(url, info, sessionID) {
    return locale.getGlobal(url.replace("/client/locale/", ''));
}