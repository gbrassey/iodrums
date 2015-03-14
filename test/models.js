'use strict';

process.env.NODE_ENV = 'test';
var chai = require('chai');
var should = chai.should();
var drums = require('../models/drums');
require('../app');

describe('Drums Model', function() {
	it('should create beats', function(done) {
		drums.should.contain('snare');
		done();
	});

});
