"use strict";

const helpers = require('../lib/helpers.js');
const decorate = helpers.decorate;
const metadata = helpers.metadata;
const param = helpers.param;

const context = require("@loopback/context");
const rest = require("@loopback/rest");
const SequenceActions = rest.RestBindings.SequenceActions;

let MySequence = class MySequence {
  constructor(findRoute, parseParams, invoke, send, reject) {
    this.findRoute = findRoute;
    this.parseParams = parseParams;
    this.invoke = invoke;
    this.send = send;
    this.reject = reject;
  }
  async handle(context) {
    try {
      const { request, response } = context;
      const route = this.findRoute(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    }
    catch (err) {
      this.reject(context, err);
    }
  }
};

MySequence = decorate([
  param(0, context.inject(SequenceActions.FIND_ROUTE)),
  param(1, context.inject(SequenceActions.PARSE_PARAMS)),
  param(2, context.inject(SequenceActions.INVOKE_METHOD)),
  param(3, context.inject(SequenceActions.SEND)),
  param(4, context.inject(SequenceActions.REJECT)),
  metadata("design:paramtypes", [Function, Function, Function, Function, Function])
], MySequence);

module.exports = MySequence;
