var EventEmitter = require("events").EventEmitter;
var bus = new EventEmitter();

bus.drum = function drum (topic, drumSymbol) {
	this.emit('drum', drumSymbol);
}

module.exports = bus;
