'use strict';

const { decorate, metadata, param } = require('./helpers.js');
const rest = require('@loopback/rest');
const context = require('@loopback/context');

module.exports = function (specifications, operations) {

  const paths = Object.keys(specifications);
  const controllerClasses = {};
  const decorationProperties = [];

  paths.forEach(path => {
    const methods = Object.keys(specifications[path]);
    methods.forEach(method => {
      const decorationProperty = [path];
      const specs = specifications[path][method];
      const controllerName = specs['x-controller-name'];
      const operationName = specs['x-operation-name'];

      if (!(controllerName in controllerClasses)) {
        // Create the basic class
        controllerClasses[controllerName] = class {
          constructor(req) {
            this.req = req;
          }
        }
      }

      // Add the class methods dynamically
      controllerClasses[controllerName].prototype[operationName] = operations[operationName];
      decorationProperty.push(method);
      decorationProperty.push(operationName);
      decorationProperties.push(decorationProperty);
    });
  });

  const controllerName = Object.keys(controllerClasses)[0];
  let ControllerClass = controllerClasses[controllerName];

  Object.defineProperty(ControllerClass, 'name', { writable: true });
  ControllerClass.name = controllerName;
  Object.defineProperty(ControllerClass, 'name', { writable: false });

  decorationProperties.forEach(decorationProperty => {
    const path = decorationProperty[0];
    const method = decorationProperty[1];
    const operation = decorationProperty[2];

    decorate([
      rest[method](path, {
        responses: specifications[path][method].responses
      }),
      metadata('design:type', Function),
      metadata('design:paramtypes', []),
      metadata('design:returntype', Object)
    ], ControllerClass.prototype, operation, null);
  });

  ControllerClass = decorate([
      param(0, context.inject(rest.RestBindings.Http.REQUEST)),
      metadata('design:paramtypes', [Object])
  ], ControllerClass);

  return ControllerClass;
};
