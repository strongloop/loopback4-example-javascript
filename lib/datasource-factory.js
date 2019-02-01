'use strict';

const { decorate, metadata, param } = require('./helpers.js');
const core = require('@loopback/core');
const repository = require('@loopback/repository');

module.exports = function (dataSourceName, config) {
  let classes = {};
  classes[dataSourceName] = class extends repository.juggler.DataSource {
    constructor(dsConfig = config) {
      super(dsConfig);
    }
  };

  let DataSourceClass = classes[dataSourceName];
  DataSourceClass.dataSourceName = dataSourceName;
  Object.defineProperty(DataSourceClass, 'name', { writable: true });
  DataSourceClass.name = dataSourceName.charAt(0).toUpperCase() + dataSourceName.slice(1) + 'DataSource';
  Object.defineProperty(DataSourceClass, 'name', { writable: false });

  DataSourceClass = decorate([
    param(0, core.inject('datasources.config.' + dataSourceName, { optional: true })),
    metadata("design:paramtypes", [Object])
  ], DataSourceClass);

  return DataSourceClass;
}
