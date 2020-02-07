"use strict";

require('../libs.js');

function getBots(url, info, sessionID) {
    return json.stringify(bots.generate(info));
}

router.addStaticRoute("/client/game/bot/generate", getBots);