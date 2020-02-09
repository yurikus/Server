"use strict";

// set stdout encoding
process.stdout.setEncoding('utf8');

// load application
const interpreter = (require('./interpreter.js').interpreter);

interpreter.intializeExceptions();
interpreter.initializeClasses();
interpreter.initializeResponses();

// show server name in window
process.stdout.write(String.fromCharCode(27) + ']0;' + "JustEmuTarkov Server " + server.getVersion() + String.fromCharCode(7));
process.stdout.write('\u001B[2J\u001B[0;0f');

if (settings.autosave.saveOnExit) {
	process.on('exit', (code) => {
		saveHandler.saveOpenSessions();
	});
	process.on('SIGINT', (code) => {
		saveHandler.saveOpenSessions();
	});
}

if (settings.autosave.saveIntervalSec > 0) {
	setInterval(function() {
		saveHandler.saveOpenSessions();
		logger.logSuccess("Player progress autosaved!");
	}, settings.autosave.saveIntervalSec * 1000);
}

// start application
server.start();