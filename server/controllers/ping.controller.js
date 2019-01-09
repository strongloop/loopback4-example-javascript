"use strict";

const helpers = require('../../lib/helpers.js');
const decorate = helpers.decorate;
const metadata = helpers.metadata;
const param = helpers.param;

const rest = require("@loopback/rest");
const context = require("@loopback/context");

const PING_RESPONSE = {
  description: 'Ping Response',
  content: {
    'application/json': {
        schema: {
          type: 'object',
          properties: {
            greeting: { type: 'string' },
            date: { type: 'string' },
            url: { type: 'string' },
            headers: {
              type: 'object',
              properties: {
                'Content-Type': { type: 'string' },
              },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

let PingController = class PingController {
  constructor(req) {
    this.req = req;
  }

  ping() {
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
};

decorate([
  rest.get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  }),
  metadata("design:type", Function),
  metadata("design:paramtypes", []),
  metadata("design:returntype", Object)
], PingController.prototype, "ping", null);

PingController = decorate([
    param(0, context.inject(rest.RestBindings.Http.REQUEST)),
    metadata("design:paramtypes", [Object])
], PingController);

exports.PingController = PingController;
