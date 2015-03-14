'use strict';

process.env.NODE_ENV = 'test';
var app = require('../app.js');
var request = require('supertest');
var agent = request.agent(app);

describe('GET /', function() {
	it('should get the homepage', function(done) {
		agent
			.get('/')
			.send()
			.expect(200, done);
  });
});
describe('POST /client', function() {
	it('should get the client page', function(done) {
  	agent
			.get('/client')
			.send()
			.expect(200, done);
	});
});
describe('GET /server', function() {
	it('should get the server', function(done) {
		agent
			.get('/server')
			.send()
			.expect(200, done);
	});
});
