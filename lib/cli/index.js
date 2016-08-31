const cli = require('e2e-cli/lib/cli');
const path = require('path');


module.exports = function(options) {
  const oldStdoutWrite = process.stdout.write;
  process.stdout.write = function (line) {
    line = line.toString();
    if (line.match(/version:|WARNING:/)) {
      return;
    }
    if (line.match(/e2e-cli-(inject-)?live-reload/)) {
      // don't replace 'ember-cli-live-reload' on ng init diffs
      return oldStdoutWrite.apply(process.stdout, arguments);
    }
    line = line.replace(/e2e-cli(?!.com)/g, 'e2e-cli')
      .replace(/\be2e\b(?!-cli.com)/g, 'e2e');
    return oldStdoutWrite.apply(process.stdout, arguments);
  };

  const oldStderrWrite = process.stderr.write;
  process.stderr.write = function (line) {
    line = line.toString()
      .replace(/e2e-cli(?!.com)/g, 'e2e-cli')
      .replace(/\be2e\b(?!-cli.com)/g, 'e2e');
    return oldStderrWrite.apply(process.stdout, arguments);
  };

  options.cli = {
    name: 'e2e',
    root: path.join(__dirname, '..', '..'),
    npmPackage: 'e2e-cli'
  };

  // ensure the environemnt variable for dynamic paths
  process.env.PWD = process.env.PWD || process.cwd();


  process.env.CLI_ROOT = process.env.CLI_ROOT || path.resolve(__dirname, '..', '..');

  return cli(options);
};