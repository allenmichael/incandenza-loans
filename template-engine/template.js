'use strict';
const _ = require('lodash');
const uuid = require('uuid');
class Template {

	constructor(baseTemplate, templateKeys, user) {
		this.templateKeys = templateKeys;
		this.folderChecklist = [];
		this.user = user;
		this.template = this._compileTemplate(_.cloneDeep(baseTemplate), templateKeys);
	}

	_compileTemplate(folderTemplate, templateKeys) {
		if (!templateKeys) {
			return null;
		}
		if (folderTemplate.name) {
			let compiledName = _.template(folderTemplate.name);
			folderTemplate.name = compiledName(templateKeys);
			folderTemplate.uuid = uuid.v4();
			this.folderChecklist.push(folderTemplate.uuid);
		}
		if (folderTemplate.children.length > 0) {
			_.each(folderTemplate.children, (child) => {
				this._compileTemplate(child, templateKeys);
			});
		}
		return folderTemplate;
	}
}
module.exports = Template;