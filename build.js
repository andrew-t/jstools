var mangle = true,
	squeeze = true,
	liftVars = true,
	uglify = require('./UglifyJS/uglify-js.js');

function minify(code) {
	var ast;
	try {
		ast = uglify.parser.parse(code);
	} catch (e) {
		console.log(e);
		for (var l = e.line - errContext; l <= e.line + errContext; ++l)
			console.log(code.split('\n')[l]);
		throw 'Balls.';
	}

	if (liftVars)
		ast = uglify.uglify.ast_lift_variables(ast);
	if (mangle)
		ast = uglify.uglify.ast_mangle(ast, { toplevel: false });
	if (squeeze)
		ast = uglify.uglify.ast_squeeze(ast);

	return uglify.uglify.gen_code(ast).toString();
}

var fs = require('fs'),
	input = fs.readFileSync('jstools.js', 'utf8'),
	output = minify(input);

fs.writeFileSync('out.js', output, 'utf8');

function sanitise(code) {
	return code.replace(/"/g, '&#x22;');
}

fs.writeFileSync('index.html',
	fs.readFileSync('template.html').toString()
		.replace('"#"', '"javascript:' + sanitise(minify(output)) + '"'),
	'utf8');