"use strict";

class ItemPresets {
    initialize() {
        this.globals = staticdata_f.getGlobals();
        const presets = Object.values(this.globals.ItemPresets);
        const reverse = {};

        for (const p of presets) {
            let tpl = p._items[0]._tpl;

            if (!(tpl in reverse)) {
                reverse[tpl] = [];
            }

            reverse[tpl].push(p._id);
        }

        this.lookup = reverse;
    }

    isPreset(id) {
        return id in this.globals.ItemPresets;
    }

    hasPreset(templateId) {
        return templateId in this.lookup;
    }

    getPresets(templateId) {
        if (!this.hasPreset(templateId)) {
            return [];
        }

        const presets = [];
        const ids = this.lookup[templateId];

        for (const id of ids) {
            presets.push(this.globals.ItemPresets[id]);
        }

        return presets;
    }

    getStandardPreset(templateId) {
        if (!this.hasPreset(templateId)) {
            return false;
        }

        const allPresets = this.getPresets(templateId);

        for (const p of allPresets) {
            if ("_encyclopedia" in p) {
                return p;
            }
        }

        return allPresets[0];
    }

    getBaseItemTpl(presetId) {
        if (this.isPreset(presetId)) {
            let preset = this.globals.ItemPresets[presetId];

            for (let item of preset._items) {
                if (preset._parent === item._id) {
                    return item._tpl;
                }
            }
        }

        return "";
    }
}

module.exports.itemPresets = new ItemPresets();