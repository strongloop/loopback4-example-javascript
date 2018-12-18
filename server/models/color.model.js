// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";

const helpers = require('../../lib/helpers.js');
const decorate = helpers.decorate;
const metadata = helpers.metadata;

const repository = require("@loopback/repository");
let Color = class Color extends repository.Entity {
  constructor(data) {
    super(data);
  }
};

decorate([
  repository.property({
    type: 'number',
    id: true,
  }),
  metadata("design:type", Number)
], Color.prototype, "id", void 0);

decorate([
  repository.property({
    type: 'string',
  }),
  metadata("design:type", String)
], Color.prototype, "value", void 0);

Color = decorate([
  repository.model(),
  metadata("design:paramtypes", [Object])
], Color);

exports.Color = Color;
