'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let IdentityProvider = require('../../../shared-services/identity-service/identityProvider');
let IdentityProviderUtilities = require('../../../shared-services/identity-service/identityProviderUtilities');
let Box = require('../../../shared-services/box-service/boxClientService');

module.exports.getFolderStructure = asyncFunc(function* (req, res, next) {
  let appRootFolderTree = yield Box.getFullFolderTreeUsingServiceAccount('0');
  res.send(appRootFolderTree);
});