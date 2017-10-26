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
		alert('Error! All thoughts could not be retrieved: ' + response.data);
	});
	
	$scope.getTaggedThoughts = function(hashtag) {
		// If the hash symbol prepends the hashtag, remove the hash symbol from the string
		if (hashtag.indexOf("#") != -1) {
			hashtag = hashtag.slice(1);
		}
		
		alert("Getting tagged thought for hashtag: " + JSON.stringify(hashtag));
		$http({
			method: 'GET',
			url: '/thoughts/tags/'+hashtag
		})
		.then(function successCallback(response) {
			alert(response.data);
			$scope.thoughts = response.data;
			
		}, function errorCallback(response) {
			alert('Error! Tagged thoughts not retrieved: ' + response.data);
		
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
			// If the response does not contain a validation error, load thoughts into $scope.
			if (!response.data.errors === undefined) {
				$scope.thoughts = response.data;
			// Else the response does contain a validation error, so display it to the user.
			} else {
				alert("Error! Thought not saved: " + JSON.stringify(response.data.errors.thought.message));
			}
		}, function errorCallback(response) {
			// If the http request fails, display the error to the user.
			alert('Error! Thought not saved: ' + response.thought);
		});
	}
	
});