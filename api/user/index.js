/**
 * Created by jialao on 2016/9/16.
 */
var express = require('express');
var auth = require('../../auth/auth.service')
var controller = require('./user.controller');

var router = express.Router();

router.get('/me',auth.isAuthenticated(),controller.getMe)

module.exports = router;