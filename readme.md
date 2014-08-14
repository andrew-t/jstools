jstools
=======

Bookmarklet: <a href="javascript:var compare = (function() { function compare() { var i, diffs = {}, all, components = []; for (i = 0; i < arguments.length; ++i) { var element = arguments[i]; switch (typeof arguments[i]) { case 'object': element = arguments[i]; break; case 'string': case 'number': element = document.getElementById(arguments[i]); break; case 'boolean': all = arguments[i]; break; } if (all !== undefined) break; components[i] = { element: element, style: window.getComputedStyle(element), colour: compare.colours[i % compare.colours.length] }; element.style.outline = compare.outline + ' ' + components[i].colour; } for (var styleName in components[0].style) for (i = 1; i < components.length; ++i) if (components[i].style[styleName] != components[0].style[styleName]) { diffs[styleName] = components.map(function(component) { return component.style[styleName]; }); break; } if (!all) for (var style1 in diffs) for (var style2 in diffs) if (new RegExp('^' + style2 + '.+').test(style1)) delete diffs[style1]; return diffs; } compare.colours = ['red', 'blue']; compare.outline = '3px solid'; return compare; })(); function ids() { var c = document.getElementsByTagName('*'), n = 0; for (var i = 0; c[i]; ++i) if (!c[i].id) { while (document.getElementById(++n)); c[i].id = n; } }">JSTools</a>

##Features

### Add IDs
`ids()` will make sure everything in the DOM has an ID.

### Compare styles
`compare(a, b, ...)` will return an object showing differences in the CSS of two or more elements. It will also outline the elements in the colours specified in `compare.colours`. By default it will not show `border-width`, for example, and include only `border`. Change `compare.all` to configure this.
