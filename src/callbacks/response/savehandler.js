"use strict";

function saveCallback(sessionID, req, resp, body, output) {
    if (settings.autosave.saveOnReceive) {
        saveHandler.saveOpenSessions();
    }
}

server.addStartCallback("savehandler", saveHandler.initialize());
server.addReceiveCallback("SAVE", saveCallback);