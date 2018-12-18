// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";

const helpers = require('../../lib/helpers.js');
const decorate = helpers.decorate;
const metadata = helpers.metadata;
const param = helpers.param;

const repository = require("@loopback/repository");
const models = require("../models");
const datasources = require("../datasources");
const core = require("@loopback/core");

let ColorRepository = class ColorRepository extends repository.DefaultCrudRepository {
  constructor(dataSource) {
    super(models.Color, dataSource);
  }
};

ColorRepository = decorate([
  param(0, core.inject('datasources.memory')),
  metadata("design:paramtypes", [datasources.MemoryDataSource])
], ColorRepository);

exports.ColorRepository = ColorRepository;
