'use strict';

// This package loading order is important

global.modelFactory = require('./model-factory');
global.datasourceFactory = require('./datasource-factory');
global.repositoryFactory = require('./repository-factory');
global.crudControllerFactory = require('./crud-controller-factory');
global.customControllerFactory = require('./custom-controller-factory');
global.sequenceFactory = require('./sequence-factory');
