'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let IdentityProvider = require('../../../shared-services/identity-service/identityProvider');
let IdentityProviderUtilities = require('../../../shared-services/identity-service/identityProviderUtilities');
let Box = require('../../../shared-services/box-service/boxClientService');

module.exports.main = (req, res, next) => {
	res.send({ title: "Box Reference App" });
};

module.exports.token = asyncFunc(function* (req, res, next) {
	try {
		let authCode = req.headers.authorization.replace("Bearer ", "");
		let profile = yield IdentityProvider.checkIdentityFromIdToken(authCode);
		let boxId = IdentityProviderUtilities.checkForExistingBoxAppUserId(profile);
		if (!boxId) {
			let appUser = yield Box.createAppUser(profile.email);
			IdentityProvider.updateUserModel(profile);
		}
		let token = yield Box.generateUserToken(boxId);
		res.status(200);
		res.json(token);
	} catch (e) {
		res.status(e.code || 500);
		res.json(e);
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
		res.status(401).json({ message: "You don't have the proper access for this function." });
	}
});