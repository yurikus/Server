/* offraid.js
 * contains responses for the offraid class
 * dependencies: EmuLib.dll
 */

"use strict";

require('../libs.js');

function nullResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":null}';
}

function saveProgress(url, info, sessionID) {
    offraid_f.saveProgress(info, sessionID);
    return nullResponse;
}

router.addStaticRoute("/OfflineRaidSave", saveProgress);