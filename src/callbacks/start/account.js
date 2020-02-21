"use strict";

function initialize() {
    account_f.accountServer.initialize();
}

server.addStartCallback("loadAccounts", initialize);