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
  			// var position = 2;
				var file_path = './page_objects.js';
				var new_text = "testPage2 = require('./path2')"

				// var data = fs.readFileSync(file_path).toString().split("\n");
				// data.splice(4, 0, new_text);
				// var text = data.join("\n");
				// fs.writeFile(file_path, text, function (err) {
				//   if (err) return console.log(err);
				// });

				// fs.readFile(file_path, function read(err, data) {
				//     if (err) {
				//         throw err;
				//     }
				//     var file_content = data.toString();
				//     // file_content = file_content.substring(position);

				//     var file = fs.openSync(file_path,'r+');
				//     var bufferedText = new Buffer(new_text+file_content);
				//     fs.writeSync(file, bufferedText, 0, bufferedText.length);
				//     fs.close(file);
				// });

				var fs = require('fs');

				var data = fs.readFileSync(file_path).toString().split("\n");
				console.log('data array', data);
				var found = false;
				var lineNumber = 0;
				while(!found) {
					if(data[lineNumber] === '') {
						data.splice(lineNumber, 0, new_text);
						found = true;
					}
					lineNumber++;
				}
				var text = data.join("\n");

				// works
				// fs.writeFile(file_path, text, function (err) {
				//   if (err) return console.log(err);
				// });
				


  			return './test/page_objects/' + options.locals.team;
  		}
  	}
  }
};
