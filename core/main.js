"use strict";

/* show name in window */
process.stdout.setEncoding('utf8');
process.title = "JRT Server";

/* load server components */
require('./interpreter.js');
watermark.show();
server.start();