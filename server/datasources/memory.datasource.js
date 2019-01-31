'use strict';

const generateDataSource = require('../../lib/datasource-generator.js');
const config = require('./memory.datasource.json');
exports.MemoryDataSource = generateDataSource('memory', config);
