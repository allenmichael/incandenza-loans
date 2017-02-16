'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let Auth0Config = require('../config').Auth0Config;
let BoxConfig = require('../config').BoxConfig;
let AuthenticationClient = require('auth0').AuthenticationClient;
let ManagementClient = require('auth0').ManagementClient;

class IdentityProvider {
	constructor() {
		this.authenticationClient = new AuthenticationClient({
			domain: Auth0Config.domain,
			clientId: Auth0Config.clientId
		});

		this.userManagementClient = new ManagementClient({
			token: Auth0Config.apiToken,
			domain: Auth0Config.domain
		});
	}

	checkIdentityFromIdToken(idToken) {
		return this.authenticationClient.tokens.getInfo(idToken);
	}

	updateUserModel(userId, boxAppUserId) {
		let params = { id: userId };
		let metadata = {};
		metadata[BoxConfig.boxAppUserId] = boxAppUserId
		return this.userManagementClient.updateAppMetadata(params, metadata);
	}
}

module.exports = new IdentityProvider();