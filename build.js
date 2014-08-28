function minify(code) {
	return code.replace(/\/\/.*$/gm, '').replace(/\s+/gm, ' ');
}

var fs = require('fs'),
	input = fs.readFileSync('jstools.js').toString(),
	output = minify(input);

fs.writeFileSync('out.js', output, 'utf8');

function sanitise(code) {
	return code.replace('"', '&#x22;');
}

fs.writeFileSync('index.html',
	fs.readFileSync('template.html').toString()
		.replace('"#"', '"javascript:' + sanitise(minify(output)) + '"'),
	'utf8');