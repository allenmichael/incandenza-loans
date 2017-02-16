'use strict';
let express = require('express');
let router = express.Router();
let passport = require('passport');
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

let indexCtrl = require('../controllers/indexController');
let aboutCtrl = require('../controllers/aboutController');
let loginCtrl = require('../controllers/loginController');
let usersCtrl = require('../controllers/usersController');

router.get('/', indexCtrl.main);
router.get('/about', aboutCtrl.main);
router.get('/login', loginCtrl.main);
router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/' }), loginCtrl.callback);
router.get('/user', ensureLoggedIn, usersCtrl.main);

module.exports = router;