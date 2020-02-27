let settings = JSON.parse(readJson(__dirname + "/../../user/server.config.json"));

// Setup our custom https port for travis ci
settings.server.httpsPort = 8080;

fs.writeFile("../../user/server.config.json", json.stringify(settings, null, 2), function writeJSON(err) {
  if (err) return console.log(err);
});
