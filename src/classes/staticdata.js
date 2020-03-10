"use strict";

let items = undefined;
let globals = undefined;
let templates = undefined;

function initialize() {
    global.tplLookup = itm_hf.createLookup();
    global.gameplayConfig = json.parse(json.read(db.user.configs.gameplay));
    
    items = json.parse(json.read(db.user.cache.items));
    globals = json.parse(json.read(db.globals));
    templates = json.parse(json.read(db.user.cache.templates));
}

function getItems() {
    return items;
}

function getGlobals() {
    globals.time = Math.round(Date.now() / 1000);
    return globals;
}

function getTemplates() {
    return templates;
}

module.exports.initialize = initialize;
module.exports.getItems = getItems;
module.exports.getGlobals = getGlobals;
module.exports.getTemplates = getTemplates;