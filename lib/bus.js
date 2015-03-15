var EventEmitter = require("events").EventEmitter;
var bus = new EventEmitter();

bus.drum = function drum (topic, symbol) {
	this.emit('drum', symbol);
}

bus.mqttTest = function mqttTest (symbol) {
	this.emit('mqtt-test', symbol)
}

module.exports = bus;
