"use strict";

require('../libs.js');

class ItemServer {
    constructor() {
        this.output = "";
    }

    getOutput() {
        if (this.output === "") {
            this.resetOutput();
        }

        return this.output;
    }

    setOutput(data) {
        this.output = data;
    }

    resetOutput() {
        this.output = {"err":0, "errmsg":null, "data":{"items":{"new":[], "change":[], "del":[]}, "badRequest":[], "quests":[], "ragFairOffers":[], "builds":[], "currentSalesSums":{}}};
    }
}

module.exports.item = new ItemServer();