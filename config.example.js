'use strict';
const fs = require('fs');
const path = require('path');

module.exports.BoxConfig = {
  clientId: "",
  clientSecret: "",
  enterpriseId: "",
  jwtPrivateKeyFileName: "private_key.pem",
  jwtPrivateKeyPassword: "password",
  jwtPrivateKey: () => {
    let certPath = path.resolve(this.BoxConfig.jwtPrivateKeyFileName)
    return fs.readFileSync(certPath);
  },
  jwtPublicKeyId: "",
  enterprise: "enterprise",
  user: "user",
  expiresAt: "expiresAt",
  inMemoryStoreSize: "100",
  boxAppUserId: "box_appuser_id",
  managers: [
    "users",
    "files",
    "folders",
    "comments",
    "collaborations",
    "groups",
    "sharedItems",
    "metadata",
    "collections",
    "events",
    "search",
    "tasks",
    "trash",
    "enterprise",
    "legalHoldPolicies",
    "weblinks",
    "retentionPolicies",
    "devicePins",
    "webhooks"
  ]
}

module.exports.RedisConfig = {
  port: "6379",
  address: "localhost",
  password: "securepassword"
}

module.exports.Auth0Config = {
  domain: "",
  clientId: "",
  clientSecret: "",
  callbackUrl: "http://localhost:3000/callback",
  sessionSecret: "",
  apiToken: ""
}