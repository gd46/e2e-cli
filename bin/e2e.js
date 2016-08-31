#!/usr/bin/env node
'use strict';

// Provide a title to the process in `ps`
process.title = 'e2e';

// require('time-require');
var resolve = require('resolve');
var exit = require('exit');

resolve('e2e-cli', {
  basedir: process.cwd()
}, function(error, projectLocalCli) {
  var cli;
  if (error) {
    // If there is an error, resolve could not find the ember-cli
    // library from a package.json. Instead, include it from a relative
    // path to this script file (which is likely a globally installed
    // npm package). Most common cause for hitting this is `ember new`
    cli = require('../lib/cli');
  } else {
    // No error implies a projectLocalCli, which will load whatever
    // version of ember-cli you have installed in a local package.json
    cli = require(projectLocalCli);
  }

  cli({
    cliArgs: process.argv.slice(2),
    inputStream: process.stdin,
    outputStream: process.stdout,
    errorStream: process.stderr
  }).then(function(result) {
    var exitCode = typeof result === 'object' ? result.exitCode : result;
    exit(exitCode);
  });
});