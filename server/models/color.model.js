'use strict';

const generateModel = require('../../lib/model-generator.js');
const modelDefinition = {
  'properties': {
    // By convetion "id" property should be the id of the model
    'id': {
      'type': 'number',
      'required': true
    },
    'value': {
      'type': 'string',
      'required': true
    }
  },
  // Supporting these additional features would be a lot of additional work
  'validations': [],
  'relations': {},
  'acls': [],
  'methods': {}
}

exports.Color = generateModel('Color', modelDefinition);
