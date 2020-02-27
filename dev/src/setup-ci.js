const fs = require('fs');

let settings = JSON.parse(readJson(__dirname + "/../../user/server.config.json"));

// Setup our custom https port for travis ci
settings.server.httpsPort = 8080;

fs.writeFile("../../user/server.config.json", json.stringify(settings, null, 2), function writeJSON(err) {
  if (err) return console.log(err);
});

function readJson(file) { //read json file with deleting all tabulators and new lines
  return (fs.readFileSync(file, 'utf8')).replace(/[\r\n\t]/g, '').replace(/\s\s+/g, '');
}