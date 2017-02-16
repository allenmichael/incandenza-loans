'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const Auth0Config = require('../../config').Auth0Config;
const BoxConfig = require('../../config').BoxConfig;

let Box = require('../../box-service/boxClientService');
let IdentityProvider = require('../../identity-service/identityProvider');
let IdentityProviderUtilities = require('../../identity-service/identityProviderUtilities');
let loginEnv = {
	AUTH0_CLIENT_ID: Auth0Config.clientId,
	AUTH0_DOMAIN: Auth0Config.domain,
	AUTH0_CALLBACK_URL: Auth0Config.callbackUrl || 'http://localhost:3000/callback'
}

module.exports.main = (req, res, next) => {
	res.render('pages/login', { title: "Box Platform", env: loginEnv });
}

module.exports.callback = asyncFunc(function* (req, res, next) {
	console.log(req.user);
	let boxAppUserId = IdentityProviderUtilities.checkForExistingBoxAppUserId(req.user);
	if (!boxAppUserId) {
		let appUser = yield Box.createAppUser(req.user.displayName);
		let metadata = yield IdentityProvider.updateUserModel(req.user.id, appUser.id);
		boxAppUserId = appUser.id;
	}
	console.log(boxAppUserId);
	res.redirect('/user');
})