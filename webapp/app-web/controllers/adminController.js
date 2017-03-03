'use strict';
const path = require('path');
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let BoxService = require('../../../shared-services/box-service/boxClientService');

module.exports.main = (req, res, next) => {
  res.render('pages/admin-home', {title: 'Admin'});
}