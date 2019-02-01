'use strict';

const repositoryFactory = require('../../lib/repository-factory');
exports.ColorRepository = repositoryFactory({
  modelName: 'color',
  datasourceName: 'memory'
});
