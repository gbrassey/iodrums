'use strict';

var $ = require('jquery'),
	socket = require('./lib/socket'),
	drumPlayer = require('./drumPlayer');

$(document).ready(function() {

	socket.on('drum', function(message){

		console.log(message);
		drumPlayer[message].play();

	});

});
