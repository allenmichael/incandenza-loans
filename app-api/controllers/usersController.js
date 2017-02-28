'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let IdentityProvider = require('../../identity-service/identityProvider');
let IdentityProviderUtilities = require('../../identity-service/identityProviderUtilities');
let Box = require('../../box-service/boxClientService');

module.exports.getUsers = asyncFunc(function* (req, res, next) {
  let page = req.query.page || 1;
  let perPage = req.query.per_page || 50;

  console.log(page);
  let users = yield IdentityProvider.getUsers(page, perPage);
  console.log(users.length);
  res.send(users);
});