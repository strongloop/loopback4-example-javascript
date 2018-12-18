// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";

const application = require('./server');

if (require.main === module) {
  const config = {
    rest: {
      port: +process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };

  application.start(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
