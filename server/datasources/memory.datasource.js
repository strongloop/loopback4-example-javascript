'use strict';

const config = require('./memory.datasource.json');
const generateDataSource = require('../../lib/datasource-generator.js');
exports.MemoryDataSource = generateDataSource('memory', config);
