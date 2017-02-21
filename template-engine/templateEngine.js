'use strict'
const _ = require('lodash');
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const Template = require('./template');
const UserTemplate = require('./userTemplate');
const TemplateServices = require('./templateServices');
const TemplateProcessor = require('./templateProcessor');

class TemplateEngine {
	constructor(baseTemplate, client, personas = null) {
		this.baseTemplate = baseTemplate;
		this.client = client;
		this.users;
		this.userTemplates;
		this.personas = personas;
		this.userRootFolders;
	}

	createUserTemplates(users) {
		let templates = [];
		_.each(users, (user) => {
			if (!user.skipTemplate && user.templateKeys) {
				templates.push(new UserTemplate(this.baseTemplate, user.templateKeys, user));
			}
		});
		return templates;
	}

	createPersonasList(users) {
		let personas = [];
		_.each(this.users, (user) => {
			if (_.has(user, "persona")) {
				personas.push(_.get(user, "persona"));
			}
		});
		return _.uniq(personas);
	}

	getUsersRootFolders(users) {
		let rootFolders = [];
		_.each(this.users, (user) => {
			if (_.has(user, "parentFolderId")) {
				rootFolders.push(_.get(user, "parentFolderId"));
			}
		});
		return _.uniq(rootFolders);
	}

	processUserTemplate(template) {
		let processor = new TemplateProcessor(this.client, template, this.personas, this.users);
		return processor.processTemplate();
	}

	processUsersWithTemplate(users) {
		this.users = users;
		this.userTemplates = this.createUserTemplates(users);
		this.personas = this.createPersonasList(users);
		this.userRootFolders = this.getUsersRootFolders(users)
		let self = this;
		return asyncFunc(function* () {
			let processing = [];
			for (let i = 0; i < self.userTemplates.length; i++) {
				processing.push(yield self.processUserTemplate(self.userTemplates[i]));
			}
			return yield Promise.all(processing)
		})();
	}

	processFoldersWithTemplate(templateKeys, parentFolderId, includeMetadata = false, includeWebhooks = false) {
		console.log(this.baseTemplate);
		let template = new Template(this.baseTemplate, templateKeys, parentFolderId);
		console.log(template);
		let processor = new TemplateProcessor(this.client, template, null, null, false, false);
		return processor.processTemplate();
	}
}
module.exports = TemplateEngine;