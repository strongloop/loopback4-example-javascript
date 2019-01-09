"use strict";
const helpers = require('../../lib/helpers.js');
const decorate = helpers.decorate;
const metadata = helpers.metadata;
const param = helpers.param;

const repository = require("@loopback/repository");
const rest = require("@loopback/rest");
const models = require("../models");
const repositories = require("../repositories");
let ColorController = class ColorController {
  constructor(colorRepository) {
    this.colorRepository = colorRepository;
  }
  async create(color) {
    return await this.colorRepository.create(color);
  }
  async count(where) {
    return await this.colorRepository.count(where);
  }
  async find(filter) {
    return await this.colorRepository.find(filter);
  }
  async updateAll(color, where) {
    return await this.colorRepository.updateAll(color, where);
  }
  async findById(id) {
    return await this.colorRepository.findById(id);
  }
  async updateById(id, color) {
    await this.colorRepository.updateById(id, color);
  }
  async replaceById(id, color) {
    await this.colorRepository.replaceById(id, color);
  }
  async deleteById(id) {
    await this.colorRepository.deleteById(id);
  }
};

decorate([
  rest.post('/colors', {
    responses: {
      '200': {
        description: 'Color model instance',
        content: { 'application/json': { schema: { 'x-ts-type': models.Color } } },
      },
    },
  }),
  param(0, rest.requestBody()),
  metadata("design:type", Function),
  metadata("design:paramtypes", [models.Color]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "create", null);

decorate([
  rest.get('/colors/count', {
    responses: {
      '200': {
        description: 'Color model count',
        content: { 'application/json': { schema: repository.CountSchema } },
      },
    },
  }),
  param(0, rest.param.query.object('where', rest.getWhereSchemaFor(models.Color))),
  metadata("design:type", Function),
  metadata("design:paramtypes", [Object]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "count", null);

decorate([
  rest.get('/colors', {
    responses: {
      '200': {
        description: 'Array of Color model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': models.Color } },
          },
        },
      },
    },
  }),
  param(0, rest.param.query.object('filter', rest.getFilterSchemaFor(models.Color))),
  metadata("design:type", Function),
  metadata("design:paramtypes", [Object]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "find", null);

decorate([
  rest.patch('/colors', {
    responses: {
      '200': {
        description: 'Color PATCH success count',
        content: { 'application/json': { schema: repository.CountSchema } },
      },
    },
  }),
  param(0, rest.requestBody()),
  param(1, rest.param.query.object('where', rest.getWhereSchemaFor(models.Color))),
  metadata("design:type", Function),
  metadata("design:paramtypes", [models.Color, Object]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "updateAll", null);

decorate([
  rest.get('/colors/{id}', {
    responses: {
      '200': {
        description: 'Color model instance',
        content: { 'application/json': { schema: { 'x-ts-type': models.Color } } },
      },
    },
  }),
  param(0, rest.param.path.number('id')),
  metadata("design:type", Function),
  metadata("design:paramtypes", [Number]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "findById", null);

decorate([
  rest.patch('/colors/{id}', {
    responses: {
      '204': {
        description: 'Color PATCH success',
      },
    },
  }),
  param(0, rest.param.path.number('id')),
  param(1, rest.requestBody()),
  metadata("design:type", Function),
  metadata("design:paramtypes", [Number, models.Color]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "updateById", null);

decorate([
  rest.put('/colors/{id}', {
    responses: {
      '204': {
        description: 'Color PUT success',
      },
    },
  }),
  param(0, rest.param.path.number('id')),
  param(1, rest.requestBody()),
  metadata("design:type", Function),
  metadata("design:paramtypes", [Number, models.Color]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "replaceById", null);

decorate([
  rest.del('/colors/{id}', {
    responses: {
      '204': {
        description: 'Color DELETE success',
      },
    },
  }),
  param(0, rest.param.path.number('id')),
  metadata("design:type", Function),
  metadata("design:paramtypes", [Number]),
  metadata("design:returntype", Promise)
], ColorController.prototype, "deleteById", null);

ColorController = decorate([
  param(0, repository.repository(repositories.ColorRepository)),
  metadata("design:paramtypes", [repositories.ColorRepository])
], ColorController);

exports.ColorController = ColorController;
