'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let IdentityProvider = require('../../identity-service/identityProvider');
let IdentityProviderUtilities = require('../../identity-service/identityProviderUtilities');
let Box = require('../../box-service/boxClientService');

module.exports.main = (req, res, next) => {
	res.send({ title: "Box Reference App" });
}

module.exports.token = asyncFunc(function* (req, res, next) {
	try {
		let authCode = req.headers.authorization.replace("Bearer ", "");
		let profile = yield IdentityProvider.checkIdentityFromIdToken(authCode);
		let boxId = IdentityProviderUtilities.checkForExistingBoxAppUserId(profile);
		if (!boxId) { throw new Error("Cannot access content..."); }
		let token = yield Box.generateUserToken(boxId);
		res.status(200);
		res.json(token);
	} catch (e) {
		res.status(e.code || 500);
		res.json(e);
	}
});