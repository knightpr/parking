app.controller('VechileCtrl',['$scope','vechiles','vechile', 'auth',function($scope,vechiles,vechile,auth){
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.vechile = vechile;
		
		$scope.addComment = function(){
		  if($scope.body === '') { return; }
		  vechiles.addComment(vechile._id, {
		    body: $scope.body,
		    author: 'user',
		  }).success(function(comment) {
		    $scope.vechile.comments.push(comment);
		  });
		  $scope.body = '';
		};
		$scope.incrementUpvotes = function(comment){
		  vechiles.upvoteComment(vechile, comment);
		};
	}]);