/* jshint node: true */
'use strict';

module.exports = {
  name: 'e2e',
  
  includedCommands: function() {
    return {
      print: require('./lib/commands/print')
    };
  }
};
