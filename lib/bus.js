var EventEmitter = require("events").EventEmitter;
var bus = new EventEmitter();

bus.drum = function drum (symbol, client) {
	this.emit('drum', symbol, client);
}

bus.mqttTest = function mqttTest (symbol) {
	this.emit('mqtt-test', symbol)
}

module.exports = bus;
