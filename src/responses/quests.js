"use strict";

const questsCache = json.read(filepaths.user.cache.quests);

function getQuests(url, info, sessionID) {
    return questsCache;
}

router.addStaticRoute("/client/quest/list", getQuests);
item_f.itemServer.addRoute("QuestAccept", quest_f.acceptQuest);
item_f.itemServer.addRoute("QuestComplete", quest_f.completeQuest);
item_f.itemServer.addRoute("QuestHandover", quest_f.handoverQuest);