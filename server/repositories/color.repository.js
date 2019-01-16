"use strict";

const { decorate, metadata, param } = require('../../lib/helpers.js');
const repository = require("@loopback/repository");
const models = require("../models");
const datasources = require("../datasources");
const core = require("@loopback/core");

class ColorRepository extends repository.DefaultCrudRepository {
  constructor(dataSource) {
    super(models.Color, dataSource);
  }
};

ColorRepository = decorate([
  param(0, core.inject('datasources.memory')),
  metadata("design:paramtypes", [datasources.MemoryDataSource])
], ColorRepository);

exports.ColorRepository = ColorRepository;
