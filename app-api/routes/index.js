'use strict';
let express = require('express');
let router = express.Router();
let passport = require('passport');
let indexCtrl = require('../controllers/indexController');

router.get('/', indexCtrl.main);

module.exports = router;