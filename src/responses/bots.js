"use strict";

function getBots(url, info, sessionID) {
    return json.stringify(bots_f.generate(info));
}

router.addStaticRoute("/client/game/bot/generate", getBots);