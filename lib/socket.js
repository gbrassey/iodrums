'use strict';

var bus = require('../lib/bus');

var socket = function(server) {

	var io = require('socket.io').listen(server);

	io.on('connection', function(){ console.log('connected socket') });

	bus.on('drum', function(name) {
		io.emit('drum', name);
	});

	return io;

}

module.exports = socket;
