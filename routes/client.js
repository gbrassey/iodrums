'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: process.env.WEB_TITLE || 'IOD | Client Compiled' });
});

module.exports = router;
