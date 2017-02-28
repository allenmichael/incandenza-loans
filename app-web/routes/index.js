'use strict';
let express = require('express');
let router = express.Router();
let passport = require('passport');
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

let indexCtrl = require('../controllers/indexController');
let loginCtrl = require('../controllers/loginController');
let usersCtrl = require('../controllers/usersController');
let filesCtrl = require('../controllers/filesController');
let titleAgentCtrl = require('../controllers/titleAgentController');
let adminCtrl = require('../controllers/adminController');

router.get('/', indexCtrl.main);
router.get('/login', loginCtrl.main);
router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/' }), loginCtrl.callback);

router.get('/user/:id?', ensureLoggedIn, usersCtrl.main);

router.post('/folder/:id?', ensureLoggedIn, usersCtrl.addFolder);

router.get('/files/:id', ensureLoggedIn, filesCtrl.main);
router.get('/files/:id/thumbnail', ensureLoggedIn, filesCtrl.thumbnail);
router.get('/files/:id/preview', ensureLoggedIn, filesCtrl.preview);

router.get('/title-agent', ensureLoggedIn, loginCtrl.ensureTitleAgent, titleAgentCtrl.main);

router.get('/admin', ensureLoggedIn, loginCtrl.ensureAdmin, adminCtrl.main);

module.exports = router;