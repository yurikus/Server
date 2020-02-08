"use strict";

require('../libs.js');

function getWeather(url, info, sessionID) {
    return weather_f.generate();
}

router.addStaticRoute("/client/weather", getWeather);