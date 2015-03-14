'use strict';

var $ = require('jquery'),
	Drums = require('../../models/drums'),
	$drums = {};

Drums.forEach(function(drum) {
	var audio = document.createElement('audio');
	audio.preload = 'auto';
	audio.src = 'audio/' + drum + '.mp3';
	$drums[drum] = audio;
});


module.exports = $drums;

