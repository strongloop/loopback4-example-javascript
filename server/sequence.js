'use strict';

const { decorate, metadata, param } = require('../lib/helpers.js');
const context = require("@loopback/context");
const rest = require("@loopback/rest");
const SequenceActions = rest.RestBindings.SequenceActions;

class MySequence {
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
  function (target, key) { context.inject(SequenceActions.FIND_ROUTE)(target, key, 0); },
  function (target, key) { context.inject(SequenceActions.PARSE_PARAMS)(target, key, 1); },
  function (target, key) { context.inject(SequenceActions.INVOKE_METHOD)(target, key, 2); },
  function (target, key) { context.inject(SequenceActions.SEND)(target, key, 3); },
  function (target, key) { context.inject(SequenceActions.REJECT)(target, key, 4); },
  metadata("design:paramtypes", [Function, Function, Function, Function, Function])
], MySequence);

module.exports = MySequence;
