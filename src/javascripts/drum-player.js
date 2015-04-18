'use strict';

var drums = require('../../models/drums'),
	drumPlayer = {};

drums.forEach(function(drum) {
	var audio = document.createElement('audio');

	audio.preload = 'auto';
	audio.src = 'audio/' + drum + '.mp3';
	drumPlayer[drum] = audio;
});

var playNow = function playNow (symbol) {

	if (drumPlayer[symbol].paused) {
		drumPlayer[symbol].play();
	} else {
		drumPlayer[symbol].currentTime = 0;
	}
};

drumPlayer.play = function play (symbol) {

	if (drumPlayer[symbol]) {
		playNow(symbol);
	} else {
		playNow(drums[0]);
	}
};

module.exports = drumPlayer;
