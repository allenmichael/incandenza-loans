'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const config = require('config');
const Auth0Config = config.get('Auth0Config');

let Box = require('../../../shared-services/box-service/boxClientService');
let IdentityProvider = require('../../../shared-services/identity-service/identityProvider');
let IdentityProviderUtilities = require('../../../shared-services/identity-service/identityProviderUtilities');
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
	if (IdentityProviderUtilities.checkForRoleOnUser(IdentityProviderUtilities.authorizedRoles.admin, req.user)) {
		res.redirect('/admin');
		next();
	}
	if (IdentityProviderUtilities.checkForRoleOnUser(IdentityProviderUtilities.authorizedRoles.titleAgent, req.user)) {
		res.redirect('/title-agent');
		next();
	}
	let boxAppUserId = IdentityProviderUtilities.checkForExistingBoxAppUserId(req.user);
	if (!boxAppUserId) {
		let appUser = yield Box.createAppUser(req.user.displayName);
		let updatedProfile = yield IdentityProvider.updateUserModel(req.user.id, appUser.id);
		req.user.app_metadata = updatedProfile.app_metadata;
		boxAppUserId = appUser.id;
	}
	res.redirect('/user');
});

module.exports.ensureTitleAgent = asyncFunc(function* (req, res, next) {
	let profile;
	if (req.user && req.user.app_metadata) {
		profile = req.user;
	} else if (req.user && IdentityProviderUtilities.checkForUserId(req.user)) {
		profile = yield IdentityProvider.getExtendedIdentityFromUserId(IdentityProviderUtilities.checkForUserId(req.user));
	}
	if (IdentityProviderUtilities.checkForRoleOnUser(IdentityProviderUtilities.authorizedRoles.titleAgent, profile)) {
		next();
	} else {
		res.redirect('/');
	}
});

module.exports.ensureAdmin = asyncFunc(function* (req, res, next) {
	let profile;
	if (req.user && req.user.app_metadata) {
		profile = req.user;
	} else if (req.user && IdentityProviderUtilities.checkForUserId(req.user)) {
		profile = yield IdentityProvider.getExtendedIdentityFromUserId(IdentityProviderUtilities.checkForUserId(req.user));
	}
	if (IdentityProviderUtilities.checkForRoleOnUser(IdentityProviderUtilities.authorizedRoles.admin, profile)) {
		next();
	} else {
		res.redirect('/');
	}
});