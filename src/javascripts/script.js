'use strict';

var $ = require('jquery');
var socket = require('./lib/socket');
var alert = require('./lib/alert');

$(document).ready(function() {

	socket.on('vote', function(name){

		alert.play();

	});

});
