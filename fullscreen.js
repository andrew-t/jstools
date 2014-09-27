// https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode

(function() {
	// It has to happen in an event handler or it will be refused:
	var body = document.querySelector('body'),
		e = document.createElement('div'),
		message = 'Click for fullscreen.';
	e.appendChild(document.createTextNode(message));
	e.style.position = 'fixed';
	e.style.top = e.style.left = '0';
	e.style.width = '100vw';
	e.style.height = '100vh';
	e.style.zIndex = 1000000000;
	e.style.textAlign = 'center';
	e.style.background = 'white';
	e.style.paddingTop = 'calc(50vh - 0.5em)'
	e.style.fontSize = (80 / message.length) + 'vw';
	e.style.color = 'black';
	e.style.fontFamily = 'sans';
	body.appendChild(e);
	e.addEventListener('click', function() {
		// No real point checking for msRequestFullscreen since this is for OSX:
		body.removeChild(e);
		e = document.documentElement;
		(e.requestFullscreen || 
			e.mozRequestFullScreen || 
			e.webkitRequestFullscreen).call(e);
	});
})();