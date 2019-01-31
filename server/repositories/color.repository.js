'use strict';

const generateRepository = require('../../lib/repository-generator.js');
exports.ColorRepository = generateRepository({
  modelName: 'color',
  datasourceName: 'memory'
});
