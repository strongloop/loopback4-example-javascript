'use strict';

const { decorate, metadata, param } = require('./helpers.js');
const repository = require('@loopback/repository');

module.exports = function (modelName, modelDefinition) {
  let classes = {};

  classes[modelName] = class extends repository.Entity {
    constructor(data) {
      super(data);
    }
  };

  let Model = classes[modelName];
  Object.defineProperty(Model, 'name', { writable: true });
  Model.name = modelName;
  Object.defineProperty(Model, 'name', { writable: false });

  // More to be added later
  const typeMap = {
    'string': String,
    'number': Number
  };

  const modelProperties = modelDefinition.properties;
  Object.keys(modelProperties).forEach(key => {
    const property = modelProperties[key];
    let repositoryProperties = {
      type: property.type
    };
    if (key === 'id') {
      repositoryProperties.id = true;
    }
    decorate([
      repository.property(repositoryProperties),
      metadata('design:type', typeMap[property.type])
    ], Model.prototype, key, void 0);

  });

  Model = decorate([
    repository.model(),
    metadata('design:paramtypes', [Object])
  ], Model);

  return Model;
}
