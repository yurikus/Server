"use strict";

require('../libs.js');

function nullArrayResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":[]}';
}

function createNotifierChannel(url, info, sessionID) {
    return '{"err":0,"errmsg":null,"data":{"notifier":{"server":"https://' + server.getIp() + '/","channel_id":"testChannel","url":"https://' + server.getIp() + '/notifierServer/get/' + sessionID + '"},"notifierServer":"https://' + server.getIp() + '/notifierServer/get/' + sessionID + '"}}';
}

function handleNotifierCustomLink(url, info, sessionID) {
    return 'NOTIFY';
}

function notify(url, info) {
    return "NOTIFY";
}

router.addStaticRoute("/client/notifier/channel/create", createNotifierChannel);
router.addDynamicRoute("/?last_id", handleNotifierCustomLink);
router.addDynamicRoute("/notifierBase", nullArrayResponse);
router.addDynamicRoute("/notifierServer", notify);
router.addDynamicRoute("/push/notifier/get/", nullArrayResponse);