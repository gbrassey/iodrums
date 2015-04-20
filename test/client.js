'use strict';

describe('#drumEvents', function () {
	var browser,
		hihat;

	before(function (done) {
		browser = new Zombie();
		browser.visit('/', done);
	});

	after(function() {
		// browser.close();
	});

	beforeEach(function (done) {
		hihat = browser.querySelector('#hihat-audio');

		sinon.spy(console, 'log');

		done();
	});

	afterEach(function (done) {
		console.log.restore();
		done();
	});


	it('should load the homepage', function (done) {
		browser.assert.text('.jumbotron h1', 'Play the drums!');
		done();
	});

	it('should trigger socket on click', function (done) {
		browser.click('#hihat');

		expect(console.log.calledOnce).to.be.true;

		done();
	});

	it('should trigger socket on keypress', function (done) {
		// s
		browser.keydown(83);
		// h
		browser.keydown(72);
		// k
		browser.keydown(75);
		// c
		browser.keydown(67);

		expect(console.log.callCount).to.equal(4);

		done();
	});

	it('should test for audio playing, not console.log');
});
