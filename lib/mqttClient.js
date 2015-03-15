'use strict';

var bus = require('../lib/bus');

var mqttClient = function(server) {

	var client = require('mqtt').connect(server);

	client.subscribe('drum');

	client.on('message', function(topic, message){
		bus.drum('drum', message.toString());
	});

	bus.on('mqtt-test', function(symbol) {
		var counter = 0,
			intervalID = setInterval(
			function() {
				client.publish('drum', 'hihat');
				if (++counter === 10) {
					clearInterval(intervalID);
				}
			}, 1000);
	});

	return client;

}

module.exports = mqttClient;
