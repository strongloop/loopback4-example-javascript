'use strict';

const { decorate, metadata, param } = require('./helpers.js');
const repository = require('@loopback/repository');
const models = require('../server/models');
const datasources = require('../server/datasources');
const core = require('@loopback/core');

module.exports = function (options) {
  const { modelName, datasourceName } = options;
  const model = models[modelName.charAt(0).toUpperCase() + modelName.slice(1)];
  let classes = {};
  classes[modelName] = class extends repository.DefaultCrudRepository {
    constructor(dataSource) {
      super(model, dataSource);
    }
  };

  let RepositoryClass = classes[modelName];
  Object.defineProperty(RepositoryClass, 'name', { writable: true });
  RepositoryClass.name = modelName.charAt(0).toUpperCase() + modelName.slice(1) + 'Repository';
  Object.defineProperty(RepositoryClass, 'name', { writable: false });

  const datasource = datasources[datasourceName.charAt(0).toUpperCase() + datasourceName.slice(1) + 'Datasource'];
  RepositoryClass = decorate([
    param(0, core.inject('datasources.' + datasourceName)),
    metadata('design:paramtypes', [datasource])
  ], RepositoryClass);

  return RepositoryClass;
}
