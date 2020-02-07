"use strict";

require('../libs.js');

function getImage(url, info, sessionID) {
    return "IMAGE";
}

router.addDynamicRoute(".jpg", getImage);
router.addDynamicRoute(".png", getImage);