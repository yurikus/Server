"use strict";

/* show name in window */
process.stdout.setEncoding('utf8');
process.stdout.write(String.fromCharCode(27) + ']0;' + "JustEmuTarkov Server" + String.fromCharCode(7));

/* load server components */
require('./interpreter.js');
server.start();