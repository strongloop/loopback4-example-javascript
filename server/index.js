'use strict';

// Load the LB4 JavaScript API
require('../lib/lb4');

const Lb4Application = require("./application");
async function start(options = {}) {
  const app = new Lb4Application(options);
  await app.boot();
  await app.start();
  if (!options.silent) {
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Explorer available at ${url}/explorer/`);
    console.log(`Try ${url}/ping`);
  }
  return app;
}

exports.start = start;
