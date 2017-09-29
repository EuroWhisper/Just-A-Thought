thoughtApp.controller("frontEndController", function($scope, $http) {
	
	// Retrieve all thoughts
	$http({
		method: 'GET',
		url: '/thoughts/all'
	})
	.then(function successCallback(response) {
		$scope.thoughts = response.data;
		
	}, function errorCallback(response) {
		// TODO: Delete after testing!
		alert('Error! ' + response.data);
	});
	
	$scope.getTaggedThoughts = function(hashtag) {
		alert("Getting tagged thought for hashtag: " + hashtag);
		$http({
			method: 'GET',
			url: '/thoughts/tags/'+hashtag
		})
		.then(function successCallback(response) {
			alert(response.data);
			$scope.thoughts = response.data;
			
		}, function errorCallback(response) {
			alert('Error! ' + response.data);
		
		});
	}
	
	// Submit a new thought
	$scope.submitThought = function() {
		alert("posting");
		$http({
			method: 'POST',
			url: '/thoughts/create',
			data: {name: $scope.name, thought: $scope.thought}
		})
		.then(function successCallback(response) {
			$scope.thoughts = response.data;
			
		}, function errorCallback(response) {
			alert('Error! ' + response.data);
		});
	}
	
});