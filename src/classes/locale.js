"use strict";

class LocaleServer {
    constructor() {
        this.languages = [];
        this.menus = [];
        this.globals = [];
    }

    initialize() {
        logger.logWarning("Loading locales into RAM...");

        for (let locale in db.locales) {
            this.languages.push(json.parse(json.read(db.locales[locale][locale]))); 
            this.menus[locale] = json.parse(json.read(db.locales[locale].menu));
            this.globals[locale] = json.parse(json.read(db.user.cache["locale_" + locale]));
        }
    }

    getLanguages() {
        return this.languages;
    }

    getMenu(locale = "en") {
        return this.menus[locale];
    }

    getGlobal(locale = "en") {
        return this.globals[locale];
    }
}

module.exports.localeServer = new LocaleServer();