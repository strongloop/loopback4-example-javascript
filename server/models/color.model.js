"use strict";

const { decorate, metadata } = require('../../lib/helpers.js');
const repository = require("@loopback/repository");
class Color extends repository.Entity {
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
