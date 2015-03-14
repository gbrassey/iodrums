'use strict';

// var privateConfig = require('./private');

var config = {
	test: {
		mongodb: 'mongodb://localhost/test'
	},
	development: {
		mongodb: 'mongodb://localhost/internet-of-drums-dev',
		seedDB: true
	},
	production: {
		mongodb: process.env.MONGOLAB_URI || 'mongodb://localhost/internet-of-drums',
		secrets: require('./secrets')
	}
};

module.exports = config;
