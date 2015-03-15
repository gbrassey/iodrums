'use strict';

var bus = require('../lib/bus'),
	mqttClient = require('../lib/mqttClient');

var socket = function(server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {
		console.log('connected socket')

		socket.on('drum', function(symbol) {
			socket.broadcast.emit('drum', symbol);
		});

		socket.on('mqtt-test', function() {
			bus.mqttTest('snare');
		});
	});

	bus.on('drum', function(symbol) {
		io.emit('drum', symbol);
	});

	return io;

}

module.exports = socket;
