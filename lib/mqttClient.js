'use strict';

var bus = require('../lib/bus');

var mqttClient = function(server) {

	var client = require('mqtt').connect(server);

	client.subscribe('drum');

	client.on('message', function(topic, message){
		bus.drum('drum', message.toString());
	});

	return client;

}

module.exports = mqttClient;
