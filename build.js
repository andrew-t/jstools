var mangle = true,
	squeeze = true,
	liftVars = true,
	errContext = 10,
	uglify = require('./UglifyJS/uglify-js.js'),
	outdir = 'dist';

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
	html = fs.readFileSync('template.html', 'utf8'),
	keys = html.match(/href="#[^"]+"/gim).map(function (s) {
		return s.replace(/href="#(.*)"/, '$1');
	});

function sanitise(code) {
	return code.replace(/"/g, '&#x22;');
}

try {
	fs.mkdirSync(outdir);
} catch(e) { }

keys.forEach(function(key) {
	var input = fs.readFileSync(key + '.js', 'utf8'),
		output = minify(input);
	fs.writeFileSync(outdir + '/' + key + '.min.js', output, 'utf8');
	html = html.replace('href="#' + key + '"',
		'href="javascript:' + sanitise(minify(output)) + '"');
});

fs.writeFileSync('index.html', html);