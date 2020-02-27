const fs = require('fs');

let settings = JSON.parse(readJson(__dirname + "/../../user/server.config.json"));

// Setup our custom https port for travis ci
settings.server.httpsPort = 8080;

console.log(settings.server.httpsPort);

fs.writeFileSync(__dirname + "/../../user/server.config.json", JSON.stringify(settings), 'utf8');

console.log('Modified output...');
console.log(settings);
console.log(JSON.parse(readJson(__dirname + "/../../user/server.config.json")));

function readJson(file) { //read json file with deleting all tabulators and new lines
  return (fs.readFileSync(file, 'utf8')).replace(/[\r\n\t]/g, '').replace(/\s\s+/g, '');
}