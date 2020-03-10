"use strict";

function getLocale(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": locale_f.localeServer.getLanguages()});
}

function getMenuLocale(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": locale_f.localeServer.getMenu(url.replace("/client/menu/locale/", ""))});
}

function getGlobalLocale(url, info, sessionID) {
    return json.stringify({"err": 0, "errmsg": null, "data": locale_f.localeServer.getGlobal(url.replace("/client/locale/", ""))});
}

router.addStaticRoute("/client/languages", getLocale);
router.addDynamicRoute("/client/menu/locale/", getMenuLocale);
router.addDynamicRoute("/client/locale/", getGlobalLocale);