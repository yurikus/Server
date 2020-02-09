"use strict";

class Interperter {
    /* load classes */
    initializeClases() {
        for (let file in filepaths.src.classes) {
            require(filepaths.src.classes[file]);
        }
    }

    /* load responses */
    initializeResponses() {
        for (let file in filepaths.src.responses) {
            require(filepaths.src.responses[file]);
        }
    }
}

module.exports.interpreter = new Interpreter();