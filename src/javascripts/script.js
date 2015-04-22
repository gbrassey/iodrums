'use strict';

var $ = require('jquery'),
	socket = require('./lib/socket'),
	drumPlayer = require('./drum-player');

$(document).ready(function() {

	$('#drums-container').on('click', '.btn', function(e) {
		e.preventDefault();

		var symbol = $(e.target).attr('id');

		emitDrum(symbol);
	});

	$('#mqtt-test').on('click', function (e) {
		e.preventDefault();

		socket.emit('mqtt-test');
	});

	socket.on('drum', function(message){
		console.log(message);

		drumPlayer.play(message);
	});

	$(document).on('keypress', function (e) {
		var shortcut = String.fromCharCode(e.which).toLowerCase();

		emitDrum(drumPlayer.matchShortcut(shortcut));
	});

	function emitDrum (symbol) {

		if ($('#feedback-chk').is(':checked')) {
			drumPlayer.play(symbol);
		}

		console.log('emit ' + symbol);

		socket.emit('drum', symbol);

	}

});
