require('babel-register')();
const { JSDOM } = require('jsdom');
var exposedProperties = ['window', 'navigator', 'document'];

import app from 'ampersand-app';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import _ from 'lodash';
import xhr from 'xhr';

require('es6-promise').polyfill();

global.navigator = {
  userAgent: 'node.js'
};

chai.use(sinonChai);

global.chai = chai;
global.expect = chai.expect;
global._ = global._ || _;

var fakeServer = _.assign({}, sinon.fakeServer, {
  create: function() {
    xhr.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    return sinon.fakeServer.create.call(fakeServer);
  }
});

var useFakeXMLHttpRequest = sinon.useFakeXMLHttpRequest.bind(sinon);

global.sinon = {
  stub: function() {
    throw new Error('call this.sinon.stub instead');
  },

  spy: function() {
    throw new Error('call this.sinon.spy instead');
  },

  useFakeXMLHttpRequest, fakeServer
};

beforeEach(function() {
  this.sinon = sinon.sandbox.create();
});

afterEach(function() {
  this.sinon.restore();
});

var context = require.context('../spec', true, /.+[_.-]spec\.jsx?$/);

context.keys().forEach(context);
module.exports = context;
