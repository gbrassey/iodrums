'use strict';

var bus = require('../lib/bus');

var socket = function(server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {
		console.log('connected socket')

		socket.on('drum', function(symbol) {
			socket.broadcast.emit('drum', symbol);
		});

	});

	bus.on('drum', function(name) {
		io.emit('drum', name);
	});

	return io;

}

module.exports = socket;
