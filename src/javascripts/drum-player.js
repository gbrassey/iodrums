'use strict';

var $ = require('jquery'),
	Drums = require('../../models/drums'),
	drumPlayer = {};

Drums.forEach(function(drum) {
	var audio = document.createElement('audio');
	audio.preload = 'auto';
	audio.src = 'audio/' + drum + '.mp3';
	drumPlayer[drum] = audio;
});

drumPlayer.play = function play (symbol) {
	if (drumPlayer[symbol].paused) {
		drumPlayer[symbol].play();
	}else{
		drumPlayer[symbol].currentTime = 0
	}
}


module.exports = drumPlayer;

