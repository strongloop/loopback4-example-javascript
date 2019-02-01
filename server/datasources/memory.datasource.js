'use strict';

const datasourceFactory = require('../../lib/datasource-factory');
const config = require('./memory.datasource.json');
exports.MemoryDataSource = datasourceFactory('memory', config);
