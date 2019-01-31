'use strict';

const { decorate, metadata, param } = require('../lib/helpers.js');
const context = require("@loopback/context");
const rest = require("@loopback/rest");
const SequenceActions = rest.RestBindings.SequenceActions;

module.exports = function (options) {
  const { name: sequenceName, handler } = options;
  let classes = {};
  classes[sequenceName] = class {
    constructor(findRoute, parseParams, invoke, send, reject) {
      this.findRoute = findRoute;
      this.parseParams = parseParams;
      this.invoke = invoke;
      this.send = send;
      this.reject = reject;
    }
    async handle(context) {
      const sequence = {
        findRoute: this.findRoute,
        parseParams: this.parseParams,
        invoke: this.invoke,
        send: this.send,
        reject: this.reject
      };
      try {
        if (handler) {
          handler.call(sequence, context);
        } else {
          const { request, response } = context;
          const route = this.findRoute(request);
          const args = await this.parseParams(request, route);
          const result = await this.invoke(route, args);
          this.send(response, result);
        }
      }
      catch (err) {
        this.reject(context, err);
      }
    }
  };

  let SequenceClass = classes[sequenceName];
  SequenceClass.sequenceName = sequenceName;
  Object.defineProperty(SequenceClass, 'name', { writable: true });
  SequenceClass.name = sequenceName;
  Object.defineProperty(SequenceClass, 'name', { writable: false });

  SequenceClass = decorate([
    param(0, context.inject(SequenceActions.FIND_ROUTE)),
    param(1, context.inject(SequenceActions.PARSE_PARAMS)),
    param(2, context.inject(SequenceActions.INVOKE_METHOD)),
    param(3, context.inject(SequenceActions.SEND)),
    param(4, context.inject(SequenceActions.REJECT)),
    metadata('design:paramtypes', [Function, Function, Function, Function, Function])
  ], SequenceClass);

  return SequenceClass;
}
