'use strict';

const generateBasicController = require('../../lib/basic-controller-generator.js');

const operations = {
  ping: function ping() {
    return {
      greeting: 'Ping from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  },

  pang: function pang() {
    return {
      greeting: 'Pang from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  },

  pong: function pong() {
    return {
      greeting: 'Pong from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
};

const specifications = {
  '/ping': {
    'get': {
      'x-controller-name': 'PingController',
      'x-operation-name': 'ping',
      'responses': {
        '200': {
          'description': 'GET Ping Response',
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'properties': {
                  'greeting': {
                    'type': 'string'
                  },
                  'date': {
                    'type': 'string'
                  },
                  'url': {
                    'type': 'string'
                  },
                  'headers': {
                    'type': 'object',
                    'properties': {
                      'Content-Type': {
                        'type': 'string'
                      }
                    },
                    'additionalProperties': true
                  }
                }
              }
            }
          }
        }
      }
    },
    'post': {
      'x-controller-name': 'PingController',
      'x-operation-name': 'pang',
      'responses': {
        '200': {
          'description': 'POST Ping Response',
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'properties': {
                  'greeting': {
                    'type': 'string'
                  },
                  'date': {
                    'type': 'string'
                  },
                  'url': {
                    'type': 'string'
                  },
                  'headers': {
                    'type': 'object',
                    'properties': {
                      'Content-Type': {
                        'type': 'string'
                      }
                    },
                    'additionalProperties': true
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/pong': {
    'get': {
      'x-controller-name': 'PingController',
      'x-operation-name': 'pong',
      'responses': {
        '200': {
          'description': 'GET Pong Response',
          'content': {
            'application/json': {
              'schema': {
                'type': 'object',
                'properties': {
                  'greeting': {
                    'type': 'string'
                  },
                  'date': {
                    'type': 'string'
                  },
                  'url': {
                    'type': 'string'
                  },
                  'headers': {
                    'type': 'object',
                    'properties': {
                      'Content-Type': {
                        'type': 'string'
                      }
                    },
                    'additionalProperties': true
                  }
                }
              }
            }
          }
        }
      }
    },
  }
}

exports.PingPongController = generateBasicController(specifications, operations);
