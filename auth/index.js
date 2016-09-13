var express = require('express');
var passport = require('passport');
var config = require('../config/env');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('./auth.service');

var router = express.Router();

require('./local/passport').setup(User,config);
require('./qq/passport').setup(User,config);

router.use('/local',require('./local'));
router.use('/qq',require('./qq'));

module.exports = router;