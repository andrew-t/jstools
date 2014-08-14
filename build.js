var fs = require('fs'),
	input = fs.readFileSync('jstools.js').toString(),
	output = input.replace(/\/\/.*$/gm, '')
				.replace(/\s+/gm, ' ');

fs.writeFileSync('out.js', output, 'utf8');

fs.writeFileSync('index.html',
	fs.readFileSync('template.html').toString()
		.replace('"#"', '"javascript:' + output.replace('"', '&#x22;') + '"'),
	'utf8');