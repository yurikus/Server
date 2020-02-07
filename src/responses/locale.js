"use strict";

require('../libs.js');

function getLocale(url, info, sessionID) {
    return locale.getLanguages();
}

function getMenuLocale(url, info, sessionID) {
    return locale.getMenu(url.replace("/client/menu/locale/", ''));
}

function getGlobalLocale(url, info, sessionID) {
    return locale.getGlobal(url.replace("/client/locale/", ''));
}

router.addStaticRoute("/client/languages", getLocale);
router.addDynamicRoute("/client/menu/locale/", getMenuLocale);
router.addDynamicRoute("/client/locale/", getGlobalLocale);