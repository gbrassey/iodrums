'use strict';

var $ = require('jquery'),
	socket = require('./lib/socket'),
	drumPlayer = require('./drum-player');

$(document).ready(function() {

	$('#drums-container').on('click', '.btn', function(e) {
		e.preventDefault();
		var symbol = $(e.target).attr('id');
		console.log('emit ' + symbol);
		if ($('#feedback-chk').is(':checked')){
			drumPlayer.play(symbol);
		}
		socket.emit('drum', symbol);
	});

	$('#mqtt-test').on('click', function (e) {
		e.preventDefault();
		socket.emit('mqtt-test');
	});

	socket.on('drum', function(symbol){

		console.log(symbol);
		drumPlayer.play(symbol);

	});

});
