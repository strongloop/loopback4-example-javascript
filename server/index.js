// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";

const Lb4Application = require("./application");

async function start(options = {}) {
  const app = new Lb4Application(options);
  await app.boot();
  await app.start();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Explorer available at ${url}/explorer/`);
  console.log(`Try ${url}/ping`);
  return app;
}

exports.start = start;
