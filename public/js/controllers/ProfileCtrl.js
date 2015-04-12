app.controller('ProfileCtrl',['$scope','profile', 'auth',function($scope,profile, auth){
	  console.log(profile.profile);
	  $scope.user = profile.profile;
	  $scope.isLoggedIn = auth.isLoggedIn;
	  $scope.currentUser = auth.currentUser;
}]);