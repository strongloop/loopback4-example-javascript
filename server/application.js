"use strict";

const boot = require("@loopback/boot");
const restExplorer = require("@loopback/rest-explorer");
const repository = require("@loopback/repository");
const rest = require("@loopback/rest");
const serviceProxy = require("@loopback/service-proxy");
const path = require("path");
const MySequence = require("./sequence");

class Lb4Application extends boot.BootMixin(serviceProxy.ServiceMixin(repository.RepositoryMixin(rest.RestApplication))) {
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
