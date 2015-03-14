'use strict';

var express = require('express'),
	router = express.Router(),
	drums = require('../models/drums');

router.get('/', function(req, res) {
	res.render('index', { title: process.env.WEB_TITLE || 'Internet of Drums', drums: drums });
});

module.exports = router;
