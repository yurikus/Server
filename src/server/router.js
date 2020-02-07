/* router.js
 * responsible for sending the correct data
 * TODO: fix issue where itemRoutes is set to underfined on /handle/items/
 */

"use strict";

const logger = require("../classes/logger");

class Router {
    constructor() {
        this.staticRoutes = {};
        this.dynamicRoutes = {};
        this.itemRoutes = {};
    }

    /* load routes */
    initializeRoutes() {
        this.staticRoutes = {};
        this.dynamicRoutes = {};
        this.itemRoutes = {};

        for (let response in filepaths.src.responses) {
            require(filepaths.src.responses[response]);
        }
    }

    /* sets static routes to check for */
    addStaticRoute(route, callback) {
        this.staticRoutes[route] = callback;
    }

    /* sets dynamic routes to check for */
    addDynamicRoute(route, callback) {
        this.dynamicRoutes[route] = callback;
    }

    /* sets item routs to check for */
    addItemRoute(route, callback) {
        this.itemRoutes[route] = callback;
    }

    handleItemRoutes(info, sessionID) {
        let output = "";
        
        for (let body of info.data) {
            let pmcData = profile_f.profileServer.getPmcProfile(sessionID);

            if (body.Action in this.itemRoutes) {
                output = this.itemRoutes[body.Action](pmcData, body, sessionID);
            } else {
                logger.logError("[UNHANDLED ACTION] " + body.Action);
            }
        }

        if (output === "OK") {
            output = json.stringify(item_f.getOutput());
        }

        if (output !== "") {
            output = json.stringify(output);
        }

        return output;
    }

    getResponse(req, body, sessionID) {
        let output = "";
        let url = req.url;
        let info = {};
    
        /* parse body */
        if (body !== "") {
            info = json.parse(body);
        }
    
        /* remove retry from URL */
        if (url.includes("?retry=")) {
            url = url.split("?retry=")[0];
        }
        
        /* route request */
        if (url in this.staticRoutes) {
            if (url === "/client/game/profile/items/moving") {
                output = this.handleItemRoutes(info, sessionID);
            } else {
                output = this.staticRoutes[url](url, info, sessionID);
            }
        } else {
            for (let key in this.dynamicRoutes) {
                if (url.includes(key)) {
                    output = this.dynamicRoutes[key](url, info, sessionID);
                }
            }
        }
    
        /* load files from game cache */
        if ("crc" in info) {
            let crctest = json.parse(output);
    
            if ("crc" in crctest && output.crc === crctest.crc) {
                logger.logWarning("[Loading from game cache files]");
                output = nullResponse(url, info, sessionID);
            }
        }

        /* route doesn't exist or response is not properly set up */
        if (output === "") {
            logger.logError("[UNHANDLED][" + url + "] request data: " + json.stringify(info));
            output = '{"err":404, "errmsg":"UNHANDLED RESPONSE: ' + url + '", "data":null}';
        }
    
        return output;
    }
}

module.exports.router = new Router();