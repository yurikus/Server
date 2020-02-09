"use strict";

class Interpreter {
    constructor() {
        global.utility = require('./util/utility.js');
        global.logger = (require('./util/logger.js').logger);
        global.json = require('./util/json.js');

        this.loadorder = json.parse(json.read("src/loadorder.json"));
        this.initializeExceptions();
        this.initializeClasses();
        this.initializeResponses();
    }

    /* load classes */
    initializeClasses() {
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

        /* core logic */
        global.router = (require('./router.js').router);
        global.saveHandler = require('./server/saveHandler.js');
        global["header_f"] = require('./server/sendHeader.js');
        global["events_f"] = require('./server/events.js');
        global["notifier_f"] = require('./server/notifier.js');

        /* external logic */
        for (let name in this.loadorder.classes) {
            logger.logInfo("Interpreter: class " + name);
            global[name] = require("../" + this.loadorder.classes[name]);
        }
    }

    /* load responses */
    initializeResponses() {
        for (let name in this.loadorder.responses) {
            logger.logInfo("Interpreter: response " + name);
            require("../" + this.loadorder.responses[name]);
        }
    }

    /* load exception handler */
    initializeExceptions() {
        process.on('uncaughtException', (error, promise) => {
            logger.logError("Trace:");
            logger.logData(error);
        });
    }
}

module.exports.interpreter = new Interpreter();