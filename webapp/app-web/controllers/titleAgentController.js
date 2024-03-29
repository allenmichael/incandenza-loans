'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const config = require('config');
const BoxOptions = config.get('BoxOptions');
const AppConfig = config.get('AppConfig');
let BoxService = require('../../../shared-services/box-service/boxClientService');

module.exports.main = (req, res, next) => {
  res.render('pages/title-agent-home', { title: "Title Agents" });
}