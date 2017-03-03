'use strict';
let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
const config = require('config');
const BoxOptions = config.get('BoxOptions');
const Auth0Config = config.get('Auth0Config');
let indexCtrl = require('../controllers/indexController');
let appCtrl = require('../controllers/appController');
let usersCtrl = require('../controllers/usersController');

router.use(jwt({
  secret: Buffer.from(Auth0Config.clientSecret, 'base64'),
  audience: Auth0Config.clientId
}));

router.use(indexCtrl.ensureAdmin);

router.get('/', indexCtrl.main);

router.get('/users', usersCtrl.getUsers);
router.get('/users/:email', usersCtrl.getUserByEmail);

router.get('/app/folder-structure', appCtrl.getFolderStructure);


module.exports = router;