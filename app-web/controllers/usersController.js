'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const BoxConfig = require('../../config').BoxConfig;
let BoxService = require('../../box-service/boxClientService');


module.exports.main = asyncFunc(function* (req, res, next) {
	let boxAppUserId = req.user.app_metadata[BoxConfig.boxAppUserId];
	if (!boxAppUserId) {
		res.redirect('/login');
	}
	let appUserClient = BoxService.getUserClient(boxAppUserId);
	res.render('pages/user', {
		user: req.user,
		title: "User Page"
	});
});