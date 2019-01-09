"use strict";

const helpers = require('../../lib/helpers.js');
const decorate = helpers.decorate;
const metadata = helpers.metadata;
const param = helpers.param;

const core = require("@loopback/core");
const repository = require("@loopback/repository");
const config = require("./memory.datasource.json");

let MemoryDataSource = class MemoryDataSource extends repository.juggler.DataSource {
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
