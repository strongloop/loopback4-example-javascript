'use strict';

const generateSequence = require('../lib/sequence-generator.js');
module.exports = generateSequence({
  name: 'MySequence',
  handler: async function (context) {
    try {
      const { request, response } = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
});
