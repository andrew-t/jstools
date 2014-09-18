var strength = strength ? strength * 2 : 0.05,
	time = time || 2,
	loop = loop || false,
	ivl,
	c = document.getElementsByTagName('*');
function fn() {
	c.forEach(function(e) {
		var m = 'matrix3d(',
			f = [e.offsetWidth, e.offsetHeight, 100, 1];
		for (var x = 0; x < 4; ++x)
			for (var y = 0; y < 4; ++y)
				m += (m ? ', ' : '') +
					((Math.random() * strength - strength / 2 ) / f[x] + (x == y));
		var t = 'transform ' + time + 's';
		e.style.transition = t;
		e.style.mozTransition = '-moz-' + t;
		e.style.webkitTransition = '-webkit-' + t;
		e.style.transform = e.style.mozTransform = e.style.webkitTransform = m + ')';
	});
}
if (ivl)
	clearInterval(ivl);
if (loop)
	ivl = setInterval(fn, time * 1000);
fn();