"use strict";

const fs = require("fs");
const json = require("./json.js");

function getDirList(path) {
  return fs.readdirSync(path).filter(function(file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

function getMapName(mapName) {
  if (mapName.indexOf("bigmap") != -1) {
    return "bigmap";
  } else if (mapName.indexOf("develop") != -1) {
    return "develop";
  } else if (mapName.indexOf("factory4_day") != -1) {
    return "factory4_day";
  } else if (mapName.indexOf("factory4_night") != -1) {
    return "factory4_night";
  } else if (mapName.indexOf("interchange") != -1) {
    return "interchange";
  } else if (mapName.indexOf("laboratory") != -1) {
    return "laboratory";
  } else if (mapName.indexOf("rezervbase") != -1) {
    return "rezervbase";
  } else if (mapName.indexOf("shoreline") != -1) {
    return "shoreline";
  } else if (mapName.indexOf("woods") != -1) {
    return "woods";
  } else {
    // ERROR
    return "";
  }
}

function getMapLoot() {
  let inputDir = "dev/input/maps";
  let inputFiles = fs.readdirSync(inputDir);
  let i = 0;

  for (let file of inputFiles) {
    let filePath = inputDir + file;
    let fileName = file.replace(".json", "");
    let fileData = json.parse(json.read(filePath));
    let mapName = getMapName(fileName.toLowerCase());

    console.log("Splitting: " + filePath);
    let node =
      typeof fileData["Location"] === "undefined"
        ? fileData.Loot
        : fileData.Location.Loot;

    for (let item in node) {
      let savePath = "dev/output/maps/" + mapName + "/loot/" + i++ + ".json";
      console.log("Loot." + fileName + ": " + item);
      json.write(savePath, node[item]);
    }
  }
}

function stripMapLootDuplicates() {
  let inputDir = getDirList("dev/output/maps/");

  for (let mapName of inputDir) {
    if (mapName === "hideout") {
      continue;
    }

    let dirName = "db/maps/" + mapName + "/loot/";
    let inputFiles = fs.readdirSync(dirName);
    let mapLoot = {};
    let questLoot = {};

    console.log("Checking " + mapName);

    // get all items
    for (let file of inputFiles) {
      let filePath = dirName + file;
      let fileName = file.replace(".json", "");
      let fileData = json.parse(json.read(filePath));

      // skip empty containers
      if (fileData.IsStatic && fileData.Items.length === 1) {
        continue;
      }

      mapLoot[fileName] = json.stringify(fileData.Items);

      if (fileData.Id.includes("quest_")) {
        questLoot[fileName] = json.stringify(fileData.Position);
      }
    }

    // check for items to remove
    for (let loot in mapLoot) {
      for (let file in mapLoot) {
        // don't check the same file
        if (loot === file) {
          continue;
        }

        // loot already exists
        if (mapLoot[loot] === mapLoot[file] || (loot in questLoot && file in questLoot && questLoot[loot] === questLoot[file])) {
          let target = dirName + file + ".json";

          console.log(mapName + ".duplicate: " + loot + ", " + file);
          fs.unlinkSync(target);
          delete mapLoot[file];

          if (file in questLoot) {
            delete questLoot[file];
          }
        }
      }
    }
  }
}

function renameMapLoot() {
  let inputDir = getDirList("dev/output/maps/");

  for (let mapName of inputDir) {
    if (mapName === "hideout") {
      continue;
    }

    let dirName = "dev/output/maps/" + mapName + "/loot/";
    let inputFiles = fs.readdirSync(dirName);

    console.log("Renaming " + mapName);

    for (let file in inputFiles) {
      fs.renameSync(
        dirName + inputFiles[file],
        dirName + "loot_" + file + ".json"
      );
    }
  }
}

function getMapLootCount() {
  let inputDir = "dev/input/maps/";
  let inputFiles = fs.readdirSync(inputDir);

  for (let file of inputFiles) {
    let filePath = inputDir + file;
    let fileName = file.replace(".json", "");
    let fileData = json.parse(json.read(filePath));
    let mapName = getMapName(fileName.toLowerCase());
    let count = typeof fileData["Location"] === "undefined" ? fileData.Loot.length : fileData.Location.Loot.length;
    
    console.log(mapName + ".count: " + count);
  }
}


function map() {
  getMapLoot();
  stripMapLootDuplicates();
  renameMapLoot();
  getMapLootCount();
}

map();
