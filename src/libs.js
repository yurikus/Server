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
	global.server = (require('./server/start.js').server);

	global.locale = require('./classes/locale.js');
	global.index_f = require('./classes/index.js');
	global.keepAlive_f = require('./classes/keepAlive.js');
	global.health_f = require('./classes/health.js');
	global.offraid_f = require('./classes/offraid.js');
	global.saveHandler = require('./server/saveHandler.js');
	global.constants = require('./server/constants.js');
	global.header_f = require('./server/sendHeader.js');
	global.events_f = require('./server/events.js');
	global.dialogue_f = require('./classes/dialogue.js');
	global.notifier_f = require('./classes/notifier.js');
	global.account_f = require('./classes/account.js');
	global.profile_f = require('./classes/profile.js');
	global.bots = require('./classes/bots.js');
	global.itm_hf = require('./classes/helpfunc.js');
	global.quest_f = require('./classes/quest.js');
	global.note_f = require('./classes/notes.js');
	global.move_f = require('./classes/move.js');
	global.status_f = require('./classes/status.js');
	global.wishList_f = require('./classes/wishList.js');
	global.trade_f = require('./classes/trade.js');
	global.customization_f = require('./classes/customization.js');
	global.hideout_f = require('./classes/hideout.js');
	global.weaponBuilds_f = require('./classes/userbuilds.js');
	global.repair_f = require('./classes/repair.js');
	global.insurance_f = require('./classes/insurance.js');
	global.trader_f = require('./classes/trader.js');
	global.ragfair_f = require('./classes/ragfair.js');
	global.weather_f = require('./classes/weather.js');
	global.map_f =  require('./classes/map.js');
	global.item = require('./classes/item.js');

	if (isFirstLaunch) {
		logger.logSuccess("Finished loading game server functions... [" + String(new Date() - time) + "]");
		logger.logSuccess("[Library Loaded]");
	}
}