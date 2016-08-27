/* jshint node: true */
'use strict';

var fs = require('fs');
var chalk = require('chalk');
var _ = require('lodash');
var indentString = require('indent-string');

module.exports = {
  description: 'Page object',

   availableOptions: [
    { name: 'team', type: String, aliases: ['t'] }
  ],

  normalizeEntityName: function(entityName) {
    // Normalize and validate entity name here.
    if(entityName.indexOf('-') >= -1) {
    	this._writeStatusToUI(chalk.yellow, 'WARNING', 'Name should use underscore not dashes. Name will be automatically converted to use underscores');
    	return entityName.replace('-', '_');
    } else {
    	return entityName;
    }
  },

  locals: function (options) {
  	return {
  		team: this.options.team
  	}
  },

  fileMapTokens: function (options) {
  	return {
  		__path__: function (options) {
				var file_path = './page_objects.js';
				var new_text = "testPage2 = require('./path2')"
				var camelCaseModuleName = _.camelCase(options.dasherizedModuleName);
				var requireStatement = camelCaseModuleName + ": require('../page_objects/" + options.dasherizedModuleName +"')." + camelCaseModuleName + ',';
				
				var data = fs.readFileSync(file_path).toString().split("\n");
				var found = false;
				var lineNumber = 0;
				while(!found) {
					if(data[lineNumber] === '') {
						var previousLine = lineNumber -1;
						data.splice(lineNumber, 0, indentString(requireStatement, 2));
						found = true;
					}
					lineNumber++;
				}
				var text = data.join("\n");

				fs.writeFile(file_path, text, function (err) {
				  if (err) return console.log(err);
				});
			
  			return './test/page_objects/' + options.locals.team;
  		}
  	}
  }
};
