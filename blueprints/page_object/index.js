/* jshint node: true */
'use strict';

module.exports = {
  description: 'Page object',

  normalizeEntityName: function (entityName) {
  	console.log('name', entityName);
  	return entityName;
  },

  locals: function (options) {
  	console.log('options', options);
  	return {
  		selector: this.entityName,
  		rawEntityName: this.entityName
  	}
  },

  flatMapTokens: function (options) {
  	console.log('flatMapTokens', options);
  	return {
  		_path_: {
  			options
  		}
  	}
  }
};
