"use strict";

function loadPresets() {
    preset_f.itemPresets.initialize();
}

server.addStartCallback("loadPresets", loadPresets);