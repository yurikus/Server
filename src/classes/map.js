"use strict";

/* MapServer class maintains list of maps in memory. */
class MapServer {
    constructor() {
        this.maps = {};
        this.initializeMaps();
    }

    /* Load all the maps into memory. */
    initializeMaps() {
        logger.logWarning("Loading maps into RAM...");

        this.maps = {};
        let keys = Object.keys(filepaths.maps);

        for (let mapName of keys) {
            let node = filepaths.maps[mapName];
            let map = json.parse(json.read(node.base));

            // set infill locations
            for (let entry in node.entries) {
                map.SpawnAreas.push(json.parse(json.read(node.entries[entry])));
            }

            // set exfill locations
            for (let exit in node.exits) {
                map.exits.push(json.parse(json.read(node.exits[exit])));
            }

            // set scav locations
            for (let wave in node.waves) {
                map.waves.push(json.parse(json.read(node.waves[wave])));
            }

            // set boss locations
            for (let spawn in node.bosses) {
                map.BossLocationSpawn.push(json.parse(json.read(node.bosses[spawn])));
            }

            this.maps[mapName] = map;
        }
    }

    /* generates a random map preset to use for local session */
    generate(mapName) {
        let data = this.maps[mapName];
        let mapLoots = [];
        let dynLoots = [];

        // Regroup loots by Id
        let staticLoots = new Map();
        let dynamicLoots = new Map();
        let allLoots = filepaths.maps[mapName].loot;
        let keys = Object.keys(allLoots);
        let n = keys.length;
        while (n --> 0) { // loop on all possible loots
            let loot = json.parse(json.read(allLoots[keys[n]]));
            let map = loot.IsStatic ? staticLoots : dynamicLoots;
            if (!map.has(loot.Id)) {
                map.set(loot.Id, []);
            }
            map.get(loot.Id).push(loot);
        }

        // First, add all static loots
        for (let inst of staticLoots.values()) {
            let rand = utility.getRandomInt(0, inst.length - 1);
            mapLoots.push(inst[rand]);
        }

        // Fill up the rest with dynamic loots
        let lootCount = settings.gameplay.maploot[mapName] - mapLoots.length;
        if (lootCount > 0) {
            for (let inst of dynamicLoots.values()) {
                let rand = utility.getRandomInt(0, inst.length - 1);
                dynLoots.push(inst[rand]);
            }
            if (dynLoots.length > lootCount) {
                // shuffle and take lootCount
                let tmp, j, i = dynLoots.length;
                while (i --> 1) {
                    j = utility.getRandomInt(0, i);
                    tmp = dynLoots[i];
                    dynLoots[i] = dynLoots[j];
                    dynLoots[j] = tmp;
                }
                dynLoots.splice(0, dynLoots.length - lootCount);
            }
        }

        data.Loot = mapLoots.concat(dynLoots);
        logger.logSuccess("Loot count = " + data.Loot.length);
        return data;
    }

    /* get a map with generated loot data */
    get(map) {
        let mapName = map.toLowerCase().replace(" ", "");
        return json.stringify(this.generate(mapName));
    }

    /* get all maps without loot data */
    generateAll() {
        let base = json.parse(json.read("db/cache/locations.json"));
        let data = {};

        // use right id's
        for (let mapName in this.maps) {
            data[this.maps[mapName]._Id] = this.maps[mapName];
        }

        base.data.locations = data;
        return json.stringify(base);
    }
}

module.exports.mapServer = new MapServer();