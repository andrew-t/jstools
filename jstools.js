var compare = (function() {
	function compare() {
		var i, diffs = {}, all, components = [];
		
		for (i = 0; i < arguments.length; ++i) {
			var element = arguments[i];
			switch (typeof arguments[i]) {
				case 'object': // assume HTMLElement
					element = arguments[i];
					break;
				case 'string': // assume element id
				case 'number': // assume element id as number
					element = document.getElementById(arguments[i]);
					break;
				case 'boolean':
					all = arguments[i];
					break;
			}
			if (all !== undefined) break;
			components[i] = {
				element: element,
				style: window.getComputedStyle(element),
				colour: compare.colours[i % compare.colours.length]
			};
			element.style.outline = compare.outline + ' ' + components[i].colour;
		}

		for (var styleName in components[0].style)
			for (i = 1; i < components.length; ++i)
				if (components[i].style[styleName] != components[0].style[styleName]) {
					diffs[styleName] = components.map(function(component) {
						return component.style[styleName];
					});
					break;
				}

		if (!all)
			for (var style1 in diffs)
				for (var style2 in diffs)
					if (new RegExp('^' + style2 + '.+').test(style1))
						delete diffs[style1];

		return diffs;
	}
	compare.colours = ['red', 'blue'];
	compare.outline = '3px solid';
	return compare;
})();

function ids() {
	var c = document.getElementsByTagName('*'), n = 0;
	for (var i = 0; c[i]; ++i)
		if (!c[i].id) {
			while (document.getElementById(++n));
			c[i].id = n;
		}
}

window.addEventListener('keydown', function(e) {
	console.log('Key code = ' + e.keyCode);
});