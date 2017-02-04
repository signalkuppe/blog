var fs= require('fs')
	typeset = require('typeset'),
	glob = require("glob"),
	options = {
	  only: '.post-content,.post-title,.cover-caption-link,.post-navigation-info-title,.archive-post-title,.amp-postbody',   // string of a CSS selector to only apply typeset 
	  disable: ['hyphenate','ligatures'] // array of features to disable
	};

	/*
	html = fs.readFileSync('_site/alpinismo/2015/08/12/gran-sasso-cresta-ovest.html'),
	output = typeset(html);*/

// options is optional
glob("_site/**/*.html", function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.

  files.forEach(function (file) {

  	if(file.indexOf('bower_components')==-1) {
	  	var output = typeset(fs.readFileSync(file), options)
		fs.writeFile(file, output, function (error) {
		     if (error) {
		       console.error("write error:  " + error.message);
		     } else {
		       console.log("Successful Write to " + file);
		     }
		});
  	}

  })
})