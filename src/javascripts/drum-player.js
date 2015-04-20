'use strict';

var $ = require('jquery'),
	drums = require('../../models/drums'),
	drumPlayer = {};

drums.forEach(function(drum) {
	var audio = document.createElement('audio');

	audio.preload = 'auto';
	audio.src = 'audio/' + drum.name + '.mp3';
	audio.id  = drum.name + '-audio';
	drumPlayer[drum.name] = audio;
	$('body').append(audio);
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

drumPlayer.matchShortcut = function matchShortcut (shortcut) {
	var matched = drums.filter(function (drum) {
		return drum.shortcut === shortcut;
	});

	console.log(matched[0].name);

	this.play(matched[0].name);
};

module.exports = drumPlayer;
