global.expect = require('chai').expect;
global.Zombie = require('zombie');
global.sinon  = require('sinon');

process.env.NODE_ENV = 'test';

require('../bin/www');

Zombie.localhost('iod.gbrasey.com', 3000);


Zombie.prototype.keydown = function(keyCode) {
	var event = this.window.document.createEvent('HTMLEvents');
	event.initEvent('keydown', true, true);
	event.which = keyCode;
	this.window.document.dispatchEvent(event);
};
