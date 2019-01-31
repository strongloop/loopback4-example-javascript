'use strict';

const { decorate, metadata, param } = require('../../lib/helpers.js');
const core = require("@loopback/core");
const repository = require("@loopback/repository");
const config = require("./memory.datasource.json");

class MemoryDataSource extends repository.juggler.DataSource {
  constructor(dsConfig = config) {
    super(dsConfig);
  }
};

MemoryDataSource.dataSourceName = 'memory';

MemoryDataSource = decorate([
  param(0, core.inject('datasources.config.memory', { optional: true })),
  metadata("design:paramtypes", [Object])
], MemoryDataSource);

exports.MemoryDataSource = MemoryDataSource;
