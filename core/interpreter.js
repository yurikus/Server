"use strict";

class Interpreter {
    constructor() {
        global.utility = require('./util/utility.js');
        global.logger = (require('./util/logger.js').logger);
        global.json = require('./util/json.js');

        this.initializeExceptions();
        this.initializeClasses();
        this.initializeResponses();
    }

    /* load classes */
    initializeClasses() {
        /*
        for (let file in filepaths.src.classes) {
            require(filepaths.src.classes[file]);
        }
        */

        // setup server
        global.settings = json.parse(json.read("user/server.config.json"));

        // setup routes
        global.filepaths = json.parse(json.read("db/cache/filepaths.json"));
        global.mods = require('./caching/_mods.js');
        global.route = require('./caching/_route.js');
        route.all();

        // setup cache
        global.cache = require('./caching/_cache.js');
        cache.all();

        // global data
        global.items = json.parse(json.read(filepaths.user.cache.items));
        global.quests = json.parse(json.read(filepaths.user.cache.quests));
        global.globalSettings = json.parse(json.read(filepaths.globals));
        global.customizationOutfits = json.parse(json.read(filepaths.user.cache.customization_outfits));
        global.customizationOffers = json.parse(json.read(filepaths.user.cache.customization_offers));
        global.templates = json.parse(json.read(filepaths.user.cache.templates));

        // server logic
        global.router = (require('./router.js').router);
        global.saveHandler = require('./server/saveHandler.js');
        global["header_f"] = require('./server/sendHeader.js');
        global["events_f"] = require('./server/events.js');
        global["notifier_f"] = require('./server/notifier.js');

        // game logic
        global["item_f"] = require('../src/classes/item.js');
        global["locale_f"] = require('../src/classes/locale.js');
        global["keepAlive_f"] = require('../src/classes/keepAlive.js');
        global["health_f"] = require('../src/classes/health.js');
        global["offraid_f"] = require('../src/classes/offraid.js');
        global["dialogue_f"] = require('../src/classes/dialogue.js');
        global["account_f"] = require('../src/classes/account.js');
        global["profile_f"] = require('../src/classes/profile.js');
        global["bots_f"] = require('../src/classes/bots.js');
        global["itm_hf"] = require('../src/classes/helpfunc.js');
        global["quest_f"] = require('../src/classes/quest.js');
        global["note_f"] = require('../src/classes/notes.js');
        global["move_f"] = require('../src/classes/move.js');
        global["status_f"] = require('../src/classes/status.js');
        global["wishList_f"] = require('../src/classes/wishList.js');
        global["trade_f"] = require('../src/classes/trade.js');
        global["customization_f"] = require('../src/classes/customization.js');
        global["hideout_f"] = require('../src/classes/hideout.js');
        global["weaponBuilds_f"] = require('../src/classes/userbuilds.js');
        global["repair_f"] = require('../src/classes/repair.js');
        global["insurance_f"] = require('../src/classes/insurance.js');
        global["trader_f"] = require('../src/classes/trader.js');
        global["ragfair_f"] = require('../src/classes/ragfair.js');
        global["weather_f"] = require('../src/classes/weather.js');
        global["map_f"] =  require('../src/classes/map.js');
    }

    /* load responses */
    initializeResponses() {
        if (router === typeof "undefined") {
            return;
        }

        for (let file in filepaths.src.responses) {
            require(filepaths.src.responses[file]);
        }
    }

    initializeExceptions() {
        process.on('uncaughtException', (error, promise) => {
            if (logger === typeof "undefined") {
                return;
            }

            logger.logError("Trace:");
            logger.logData(error);
        });
    }
}

module.exports.interpreter = new Interpreter();