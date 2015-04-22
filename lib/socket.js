'use strict';

var bus = require('../lib/bus');

var socket = function(server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {
		console.log('connected socket')

		socket.on('drum', function(symbol) {
			bus.drum(symbol, { socketIO: true});
			socket.broadcast.emit('drum', symbol);
		});

		socket.on('mqtt-test', function() {
			bus.mqttTest('snare');
		});
	});

	bus.on('drum', function(symbol, client) {
		if (!client
			|| (client && !client.hasOwnProperty('socketIO'))) {
			io.emit('drum', symbol);
		}
	});

	return io;

}

module.exports = socket;
