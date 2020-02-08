"use strict";

require('../libs.js');

let output = "";

function getOutput() {
    if (output === "") {
        resetOutput();
    }

    return output;
}

function setOutput(data) {
    output = data;
}

function resetOutput() {
    output = JSON.parse('{"err":0, "errmsg":null, "data":{"items":{"new":[], "change":[], "del":[]}, "badRequest":[], "quests":[], "ragFairOffers":[], "builds":[], "currentSalesSums, {} }}');
}

module.exports.getOutput = getOutput;
module.exports.setOutput = setOutput;
module.exports.resetOutput = resetOutput;