'use strict';

var $ = require('jquery'),
	socket = require('./lib/socket'),
	drumPlayer = require('./drum-player');

$(document).ready(function() {

	$('#drums-container').on('click', '.btn', function(e) {
		e.preventDefault();
		var symbol = $(e.target).attr('id');
		console.log('emit ' + symbol);
		socket.emit('drum', symbol);
	});

	socket.on('drum', function(message){

		console.log(message);
        drumPlayer[message].play();

	});

});
