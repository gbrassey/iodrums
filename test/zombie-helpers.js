'use strict';

Zombie.prototype.keydown = function(keyCode) {
	var event = this.window.document.createEvent('HTMLEvents');
	event.initEvent('keypress', true, true);
	event.which = keyCode;
	this.window.document.dispatchEvent(event);
};
