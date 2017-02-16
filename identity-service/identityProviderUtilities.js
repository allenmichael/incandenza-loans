'use strict';
let BoxConfig = require('../config').BoxConfig;

class IdentityProviderUtilities {
  static normalizeAppMetadataOnProfile(profile) {
    let appMetadata = profile._json.app_metadata || {};
    profile.app_metadata = appMetadata;
    return profile;
  }

  static checkForExistingBoxAppUserId(profile) {
    return (profile && profile.app_metadata && profile.app_metadata[BoxConfig.boxAppUserId]) ? profile.app_metadata[BoxConfig.boxAppUserId] : null;
  }
}

module.exports = IdentityProviderUtilities;