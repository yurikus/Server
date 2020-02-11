"use strict";

function nullArrayResponse(url, info, sessionID) {
    return '{"err":0, "errmsg":null, "data":[]}';
}

function createNotifierChannel(url, info, sessionID) {
    return '{"err":0,"errmsg":null,"data":{"notifier":{"server":"' + server.getBackendUrl() + '/","channel_id":"testChannel","url":"' + server.getBackendUrl() + '/notifierServer/get/' + sessionID + '"},"notifierServer":"' + server.getBackendUrl() + '/notifierServer/get/' + sessionID + '"}}';
}

function notify(url, info, sessionID) {
    return "NOTIFY";
}

// If we don't have anything to send, it's ok to not send anything back
// because notification requests are long-polling. In fact, we SHOULD wait
// until we actually have something to send because otherwise we'd spam the client
// and the client would abort the connection due to spam.
function sendNotification(sessionID, req, resp, data) {
    let splittedUrl = req.url.split('/');
    const sessionID = splittedUrl[splittedUrl.length - 1].split("?last_id")[0];
    server.sendTextJson(resp, await notifier_f.notifierService.notificationWaitAsync(resp, sessionID));
}

router.addStaticRoute("/client/notifier/channel/create", createNotifierChannel);
router.addDynamicRoute("/?last_id", notify);
router.addDynamicRoute("/notifierBase", nullArrayResponse);
router.addDynamicRoute("/notifierServer", notify);
router.addDynamicRoute("/push/notifier/get/", nullArrayResponse);
server.addRespondCallback("NOTIFY", sendNotification);