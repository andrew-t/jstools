function inject(name) {
	return angular
		.element(document.querySelector('[ng-app],.ng-scope'))
		.injector()
		.get(name);
}

function scope(element) {
	var e = angular.element(element);
	return e.isolateScope() || e.scope();
}

function $eval(element, f) {
	return scope(element).$eval(f);
}