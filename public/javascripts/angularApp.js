var app = angular.module('parking',['ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider){
		$stateProvider
			.state ('home',{
				url:'/home',
				templateUrl:'views/home.html',
				controller: 'MainCtrl',
				resolve: {
					    vechilePromise: ['vechiles', function(vechiles){
					       return vechiles.getMyAllVechiles();
					    }]
					  }
			})
			.state('profile', {
			  url: '/profile',
			  templateUrl: 'views/profiles.html',
			  controller: 'ProfileCtrl',
			  resolve: {
					    profilePromise: ['profile', function(profile){
					       return profile.getProfile();
					    }]
					  }

			})
			.state('vechiles', {
			  url: '/vechiles/{id}',
			  templateUrl: 'views/vechiles.html',
			  controller: 'VechileCtrl',
			  resolve: {
			    vechile: ['$stateParams', 'vechiles', function($stateParams, vechiles) {
			      return vechiles.get($stateParams.id);
			    }]
			  }
			})
			.state('login', {
			  url: '/login',
			  templateUrl: 'views/login.html',
			  controller: 'AuthCtrl',
			  onEnter: ['$state', 'auth', function($state, auth){
			    if(auth.isLoggedIn()){
			      $state.go('home');
			    }
			  }]
			})
			.state('register', {
			  url: '/register',
			  templateUrl: 'views/register.html',
			  controller: 'AuthCtrl',
			  onEnter: ['$state', 'auth', function($state, auth){
			    if(auth.isLoggedIn()){
			      $state.go('home');
			    }
			  }]
			});
		$urlRouterProvider.otherwise('home');		
	}]);


	
