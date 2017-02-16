'use strict'
const _ = require('lodash');
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const Template = require('./template');
const TemplateServices = require('./templateServices');
const TemplateProcessor = require('./templateProcessor');

class TemplateEngine {
	constructor(baseTemplate, users, client) {
		this.baseTemplate = baseTemplate;
		this.client = client;
		this.users = users;
		this.foldersToDeleteOnError = [];
		this.templates = this.createTemplates(users);
		this.personas = this.createPersonasList(users);
		this.userRootFolders = this.getUsersRootFolders(users);
	}

	createTemplates(users) {
		let templates = [];
		_.each(users, (user) => {
			if (!user.skipTemplate && user.templateKeys) {
				templates.push(new Template(this.baseTemplate, user.templateKeys, user));
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

	process() {
		let self = this;
		return asyncFunc(function* () {
			let processing = [];
			for (let i = 0; i < self.templates.length; i++) {
				processing.push(yield self.processTemplate(self.templates[i]));
			}
			return yield Promise.all(processing)
		})();
	}

	processTemplate(template) {
		let processor = new TemplateProcessor(this.client, template, this.personas, this.users);
		return processor.process();
	}
}
module.exports = TemplateEngine;