'use strict';

const path = require("path");
const {BootMixin} = require("@loopback/boot");
const {RepositoryMixin} = require("@loopback/repository");
const {RestApplication} = require("@loopback/rest");
const {ServiceMixin} = require("@loopback/service-proxy");
const restExplorer = require("@loopback/rest-explorer");
const MySequence = require("./sequence");

class Lb4Application extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options = {}) {
    super(options);

    this.route('get', '/hi', {responses: {}}, () => 'Hi!');

    this.sequence(MySequence);
    this.static('/', path.join(__dirname, '../public'));
    this.bind(restExplorer.RestExplorerBindings.CONFIG).to({
        path: '/explorer',
    });
    this.component(restExplorer.RestExplorerComponent);
    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}

module.exports = Lb4Application;
