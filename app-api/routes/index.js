'use strict';
let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
let indexCtrl = require('../controllers/indexController');
const config = require('config');
const BoxOptions = config.get('BoxOptions');
const Auth0Config = config.get('Auth0Config');

router.get('/', indexCtrl.main);

router.use(jwt({
  secret: Buffer.from(Auth0Config.clientSecret, 'base64'),
  audience: Auth0Config.clientId
}));
router.get('/token', indexCtrl.token);

module.exports = router;