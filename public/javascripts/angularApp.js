var app = angular.module('parking',['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider,$urlRouterProvider){
		$stateProvider
			.state ('home',{
				url:'/home',
				templateUrl:'/home.html',
				controller: 'MainCtrl',
				resolve: {
					    vechilePromise: ['vechiles', function(vechiles){
					       return vechiles.getMyAllVechiles();
					    }]
					  }
			})
			.state('vechiles', {
			  url: '/vechiles/{id}',
			  templateUrl: '/vechiles.html',
			  controller: 'VechileCtrl',
			  resolve: {
			    vechile: ['$stateParams', 'vechiles', function($stateParams, vechiles) {
			      return vechiles.get($stateParams.id);
			    }]
			  }
			})
			.state('login', {
			  url: '/login',
			  templateUrl: '/login.html',
			  controller: 'AuthCtrl',
			  onEnter: ['$state', 'auth', function($state, auth){
			    if(auth.isLoggedIn()){
			      $state.go('home');
			    }
			  }]
			})
			.state('register', {
			  url: '/register',
			  templateUrl: '/register.html',
			  controller: 'AuthCtrl',
			  onEnter: ['$state', 'auth', function($state, auth){
			    if(auth.isLoggedIn()){
			      $state.go('home');
			    }
			  }]
			});
		$urlRouterProvider.otherwise('home');		
	}

]);
app.controller('NavCtrl', [
	'$scope',
	'auth',
	function($scope, auth){
	  $scope.isLoggedIn = auth.isLoggedIn;
	  $scope.currentUser = auth.currentUser;
	  $scope.logOut = auth.logOut;
}]);

app.controller('VechileCtrl',
	[
	'$scope',
	'vechiles',
	'vechile',
	'auth',
	function($scope,vechiles,vechile,auth){
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
	}

]);
app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}]);
app.controller('MainCtrl',[
	'$scope',
	'vechiles',
	'auth',
	 function ($scope,vechiles,auth){
	 	$scope.isLoggedIn = auth.isLoggedIn;
		// vechiles.vechiles refer to the service 
		$scope.vechiles = vechiles.vechiles;
	 	// $scope.vechiles = [
	 	// 				{ title: 'vechile 1', upvotes: 5},
 		// 				{ title: 'vechile 2', upvotes: 3},
 		// 				{ title: 'vechile 3', upvotes: 2},
 		// 				{ title: 'vechile 4', upvotes: 1},
 		// 				{ title: 'vechile 5', upvotes: 10},
 		// 			];
		$scope.addVechile = function (){
			if(!$scope.model_name || $scope.model_name ==='' || !$scope.plate_no ||$scope.plate_no ==='' ){return;}
			  vechiles.create({
			    model_name: $scope.model_name,
			    plate_no: $scope.plate_no
			  });
			// $scope.vechiles.push( 
			// 					{
			// 						title: $scope.title, 
			// 						link: $scope.link, 
			// 						upvotes: 0,
			// 						comments :[
			// 									{author: 'Joe', body: 'Cool vechile!', upvotes: 0},
			// 									{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			// 						]
			// 					}
			// 				);
			$scope.model_name = '';
			$scope.plate_no = '';
	 	};

	 	$scope.incrementUpvotes = function (vechile){
	 		// vechile.upvotes +=1;
	 		vechiles.upvote(vechile);
	 	};




	 }
]);
//second service
app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {};
   auth.saveToken = function (token){
	  $window.localStorage['parking-token'] = token;
	};

	auth.getToken = function (){
	  return $window.localStorage['parking-token'];
	};

	auth.isLoggedIn = function(){
	  var token = auth.getToken();

	  if(token){
	    var payload = JSON.parse($window.atob(token.split('.')[1]));

	    return payload.exp > Date.now() / 1000;
	  } else {
	    return false;
	  }
	};

	auth.currentUser = function(){
	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));
	    return payload.username;
	  }
	};
	auth.currentUserId = function(){
	  if(auth.isLoggedIn()){
	    var token = auth.getToken();
	    var payload = JSON.parse($window.atob(token.split('.')[1]));
	    return payload._id;
	  }
	};

	auth.register = function(user){
	  return $http.post('/register', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};

	auth.logIn = function(user){
	  return $http.post('/login', user).success(function(data){
	    auth.saveToken(data.token);
	  });
	};

	auth.logOut = function(){
	  $window.localStorage.removeItem('parking-token');
	};
  return auth;
}]);
//factory is our first service
 app.factory('vechiles', ['$http', 'auth', function($http, auth){
  var o = {
    vechiles: []
  };

  o.getMyAllVechiles = function (){
  	if (auth.isLoggedIn()) { 
		return $http.get('/users/'+auth.currentUserId()+'/').success(function(data){
	      angular.copy(data.vechiles, o.vechiles);
	    });
	}

  };

	o.create = function(vechile) {
	  return $http.post('/users/'+auth.currentUserId()+'/vechiles', vechile, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    o.vechiles.push(data);
	  });
	};

	o.upvote = function(vechile) {
	  return $http.put('/vechiles/' + vechile._id + '/upvote', null, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    vechile.upvotes += 1;
	  });
	};


	o.get = function (id){
		return $http.get('/vechiles/' + id).then(function(res){
		return res.data;
		});
	};
	o.addComment = function(id, comment) {
	  return $http.post('/vechiles/' + id + '/comments', comment, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  });
	};

	o.upvoteComment = function(vechile, comment) {
	  return $http.put('/vechiles/' + vechile._id + '/comments/'+ comment._id + '/upvote', null, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    comment.upvotes += 1;
	  });
	};
  return o;
}]);