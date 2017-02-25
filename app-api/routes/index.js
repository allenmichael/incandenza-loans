'use strict';
let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
let indexCtrl = require('../controllers/indexController');
const config = require('config');
const BoxOptions = config.get('BoxOptions');
const AppConfig = config.get('AppConfig');
const Auth0Config = config.get('Auth0Config');

router.use(jwt({
  secret: Buffer.from(Auth0Config.clientSecret, 'base64'),
  audience: Auth0Config.clientId
}));

router.get('/', indexCtrl.main);
router.get('/token', indexCtrl.token);

module.exports = router;