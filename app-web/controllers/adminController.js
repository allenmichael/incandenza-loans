'use strict';
const path = require('path');
// const Promise = require('bluebird');
// const asyncFunc = Promise.coroutine;
// const config = require('config');
// const BoxOptions = config.get('BoxOptions');
// const AppConfig = config.get('AppConfig');
// let BoxService = require('../../box-service/boxClientService');

module.exports.main = (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../../admin-client-app/index.html'));
}