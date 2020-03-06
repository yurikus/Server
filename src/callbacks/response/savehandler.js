"use strict";

function saveCallback(sessionID, req, resp, body, output) {
    if (gameplayConfig.saveOnReceive) {
        saveHandler.saveOpenSessions();
    }
}

server.addReceiveCallback("SAVE", saveCallback);