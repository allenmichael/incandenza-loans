'use strict';
const config = require('config');
const BoxOptions = config.get('BoxOptions');
const Auth0Config = config.get('Auth0Config');
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const request = require('request');
const _ = require('lodash');
Promise.promisifyAll(request);

class IdentityProviderUtilities {

  static get authorizedRoles() {
    return {
      titleAgent: "title-agent",
      admin: "admin"
    };
  }

  static normalizeAppMetadataOnProfile(profile) {
    let appMetadata = profile._json.app_metadata || {};
    profile.app_metadata = appMetadata;
    return profile;
  }

  static checkForExistingBoxAppUserId(profile) {
    return (profile && profile.app_metadata && profile.app_metadata[BoxOptions.boxAppUserIdFieldName]) ? profile.app_metadata[BoxOptions.boxAppUserIdFieldName] : null;
  }

  static checkForRoleOnUser(role, profile) {
    let exists = false;
    if (profile && profile.app_metadata && profile.app_metadata.roles) {
      let roles = profile.app_metadata.roles;
      if (_.isArray(roles)) {
        exists = (_.filter(roles, (eachRole) => {
          return eachRole === role;
        }).length > 0) ? true : false;
      } else if (_.isString(roles)) {
        exists = roles === role;
      }
    }
    return exists;
  }

  static checkForUserId(token) {
    if (token.sub) {
      return token.sub;
    }
    return null;
  }

  static retrieveManagementToken() {
    return asyncFunc(function* () {
      let options = {
        url: `https://${Auth0Config.domain}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        body:
        {
          grant_type: 'client_credentials',
          client_id: Auth0Config.clientId,
          client_secret: Auth0Config.clientSecret,
          audience: `https://${Auth0Config.domain}/api/v2/`
        },
        json: true
      };
      let token = yield request.postAsync(options);
      return token.body;
    })();
  }
}

module.exports = IdentityProviderUtilities;