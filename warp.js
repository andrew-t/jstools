var strength = strength ? strength * 2 : 0.05,
	time = time || 2,
	loop = loop || false,
	ivl,
	c = document.getElementsByTagName('*');
function fn() {
	for (var i = 0; i < c.length; ++i) {
		var m = '',
			e = c[i],
			f = [e.offsetWidth, e.offsetHeight, 100, 1];
		for (var x = 0; x < 4; ++x) {
			var t,
				s = strength / f[x];
			for(var y = 0; y < 4; ++y)
				m += (m ? ', ' : '') + ((Math.random() * s - s / 2 ) + (x == y));
		}
		t = 'transform ' + time + 's';
		e.style.transition = t;
		e.style.mozTransition = '-moz-' + t;
		e.style.webkitTransition = '-webkit-' + t;
		e.style.transform = e.style.mozTransform = e.style.webkitTransform =
			'matrix3d(' + m + ')';
	}
}
if (ivl)
	clearInterval(ivl);
if (loop)
	ivl = setInterval(fn, time * 1000);
fn();