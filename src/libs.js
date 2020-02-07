module.exports = function(isFirstLaunch = false, time = 0) {		
	global.json = require('./classes/json.js');
	global.utility = require('./classes/utility.js');
	global.logger = require('./classes/logger.js');
	global.router = (require('./server/router.js').router);

	if (isFirstLaunch) {
		logger.start();
		logger.logSuccess("Main require() files loaded... [" + String(new Date() - time) + "]");
	}	

	// setup server
	global.settings = json.parse(json.read("user/server.config.json"));
	global.ended_at = 0;
	global.ip = settings.server.ip;

	if (isFirstLaunch) {
		logger.logSuccess("Main variables setted properly... [" + String(new Date() - time) + "]");
	}

	// setup routes
	global.filepaths = json.parse(json.read("db/cache/filepaths.json"));
	global.mods = require('./caching/_mods.js');
	global.route = require('./caching/_route.js');
	route.all();

	if (isFirstLaunch) {
		logger.logSuccess("Files routed... [" + String(new Date() - time) + "]");
	}

	// setup cache
	global.cache = require('./caching/_cache.js');
	cache.all();

	if (isFirstLaunch) {
		logger.logSuccess("Files cached... [" + String(new Date() - time) + "]");
	}

	// global data
	global.items = json.parse(json.read(filepaths.user.cache.items));
	global.weather = json.parse(json.read(filepaths.user.cache.weather));
	global.quests = json.parse(json.read(filepaths.user.cache.quests));
	global.globalSettings = json.parse(json.read(filepaths.user.cache.globals));
	global.customizationOutfits = json.parse(json.read(filepaths.user.cache.customization_outfits));
	global.customizationOffers = json.parse(json.read(filepaths.user.cache.customization_offers));
	global.templates = json.parse(json.read(filepaths.user.cache.templates));

	if (isFirstLaunch) {
		logger.logSuccess("Finished loading json files... [" + String(new Date() - time) + "]");
	}

	// load logic
	global.locale = require('./classes/_locale.js');
	global.index_f = require('./classes/_homeCredits.js');
	global.keepAlive_f = require('./classes/_keepAlive.js');
	global.health_f = require('./classes/_health.js');
	global.offraid_f = require('./classes/_offraid.js');
	global.server = require('./server/_start.js');
	global.saveHandler = require('./server/_saveHandler.js');
	global.constants = require('./server/_constants.js');
	global.header_f = require('./server/_sendHeader.js');
	global.events_f = require('./server/_events.js');
	global.dialogue_f = require('./classes/_dialogue.js');
	global.notifier_f = require('./classes/_notifier.js');
	global.account_f = require('./classes/_account.js');
	global.profile_f = require('./classes/_profile.js');
	global.bots = require('./classes/_bots.js');
	global.itm_hf = require('./classes/helpFunctions.js');
	global.quest_f = require('./classes/_quest.js');
	global.note_f = require('./classes/_notes.js');
	global.move_f = require('./classes/_move.js');
	global.status_f = require('./classes/_status.js');
	global.wishList_f = require('./classes/_wishList.js');
	global.trade_f = require('./classes/_trade.js');
	global.customization_f = require('./classes/_customization.js');
	global.hideout_f = require('./classes/_hideout.js');
	global.weaponBuilds_f = require('./classes/_weaponBuilds.js');
	global.repair_f = require('./classes/_repair.js');
	global.insurance_f = require('./classes/_insurance.js');
	global.trader_f = require('./classes/_trader.js');
	global.ragfair_f = require('./classes/_ragfair.js');
	global.weather_f = require('./classes/_weather.js');
	global.map_f =  require('./classes/_map.js');
	global.item = require('./classes/_item.js');

	// load routes
    router.initializeRoutes();

	if (isFirstLaunch) {
		logger.logSuccess("Finished loading game server functions... [" + String(new Date() - time) + "]");
		logger.logSuccess("[Library Loaded]");
	}
}