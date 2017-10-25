thoughtApp.directive('thoughtList', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			aThought: '=aThought',
			getTaggedThoughts: '&'
		},
		//template: '<div><h2>{{aThought.thought}}</h2><h4>- {{aThought.name}}</h4></div>'
		templateUrl: 'views/thought.html'
	};
});