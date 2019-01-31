'use strict';

const generateCrudController = require('../../lib/crud-controller-generator.js');
exports.ColorController = generateCrudController('color');
