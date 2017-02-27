'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let IdentityProvider = require('../../identity-service/identityProvider');
let IdentityProviderUtilities = require('../../identity-service/identityProviderUtilities');
let Box = require('../../box-service/boxClientService');

module.exports.main = (req, res, next) => {
  res.send({ title: "You're an admin!" });
}