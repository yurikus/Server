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

        /* add item routes handler */
        this.staticRoutes["/client/game/profile/items/moving"] = this.handleItemRoute;
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

    /* handle item routes */
    handleItemRoute(url, info, sessionID) {
        console.log(this.itemRoutes);
        let output = "";

        // handle all items
        for (let i = 0; i < info.data.length; i++) {
            console.log(this.itemRoutes);

            let body = info.data[i];
            let pmcData = profile_f.profileServer.getPmcProfile(sessionID);

            if (typeof this.itemRoutes[body.Action] !== "undefined") {
                return this.itemRoutes[body.Action](pmcData, body, sessionID);
            }

            logger.logError("[UNHANDLED ACTION] " + body.Action);
        }

        // return items
        if (output === "OK") {
            return json.stringify(getOutput());
        }

        if (output !== "") {
            return json.stringify(output);
        }

        return output;
    }

    getResponse(req, body, sessionID) {
        console.log(this.itemRoutes);

        let output = "";
        let url = req.url;
        let info = {};
    
        /* parse body */
        if (body !== "") {
            info = json.parse(body);
        }
    
        /* remove retry from URL */
        if (url.indexOf("?retry=") !== -1) {
            url = url.split("?retry=")[0];
        }
        
        /* route request */
        if (typeof this.staticRoutes[url] !== "undefined") {
            output = this.staticRoutes[url](url, info, sessionID);
        } else {
            for (let key in this.dynamicRoutes) {
                if (url.indexOf(key) !== -1) {
                    output = this.dynamicRoutes[key](url, info, sessionID);
                }
            }
        }
    
        /* route doesn't exist */
        if (output === "") {
            logger.logError("[UNHANDLED][" + url + "] request data: " + json.stringify(info));
            output = '{"err":404, "errmsg":"UNHANDLED RESPONSE: ' + url + '", "data":null}';
        }
    
        /* load files from game cache */
        if (typeof info.crc !== "undefined") {
            let crctest = json.parse(output);
    
            if (typeof crctest.crc !== "undefined" && output.crc === crctest.crc) {
                logger.logWarning("[Loading from game cache files]");
                output = nullResponse(url, info, sessionID);
            }
        }
    
        return output;
    }
}

module.exports.router = new Router();