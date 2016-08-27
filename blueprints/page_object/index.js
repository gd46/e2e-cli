/* jshint node: true */
'use strict';

var fs = require('fs');

module.exports = {
  description: 'Page object',

   availableOptions: [
    { name: 'team', type: String, aliases: ['t'] }
  ],

  normalizeEntityName: function(entityName) {
    // Normalize and validate entity name here.
    return entityName;
  },

  locals: function (options) {
  	return {
  		team: this.options.team
  	}
  },

  fileMapTokens: function (options) {
  	return {
  		__path__: function (options) {

  			var fs = require('fs');
				var _ = require('lodash');

				var file_path = './page_objects.js';
				var new_text = "testPage2 = require('./path2')"
				var camelCaseModuleName = _.camelCase(options.dasherizedModuleName);
				var requireStatement = camelCaseModuleName + ": require('../page_objects/" + options.dasherizedModuleName +"')." + camelCaseModuleName;
				
				var data = fs.readFileSync(file_path).toString().split("\n");
				var found = false;
				var lineNumber = 0;
				while(!found) {
					if(data[lineNumber] === '') {
						data.splice(lineNumber, 0, requireStatement);
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
