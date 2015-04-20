'use strict';

var drums = require('../models/drums');

describe('Drums Model', function() {
	it('should create beats', function(done) {
		expect(drums).to.be.instanceof(Array);
		expect(drums[0].name).to.equal('snare');
		done();
	});

});
