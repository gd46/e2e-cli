/* jshint node: true */
'use strict';

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
  			return './test/page_objects/' + options.locals.team;
  		}
  	}
  }
};
