"use strict";

require('../libs.js');

function getQuests(url, info, sessionID) {
    return json.stringify(quests);
}

router.addStaticRoute("/client/quest/list", getQuests);
router.addItemRoute("QuestAccept", quest_f.acceptQuest);
router.addItemRoute("QuestComplete", quest_f.completeQuest);
router.addItemRoute("QuestHandover", quest_f.handoverQuest);