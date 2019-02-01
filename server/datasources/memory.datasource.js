'use strict';

const config = require('./memory.datasource.json');
exports.MemoryDataSource = datasourceFactory('memory', config);
