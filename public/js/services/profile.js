app.factory('profile',['$http', 'auth',function($http, auth){
	var p = {
		profile : []
	};

	p.getProfile = function (){
		id = auth.currentUserId();
		return $http.get('/users/' + id).then(function(res){
			
			p.profile = res.data;
			return res.data;
		});
	};
	return p;

  }]);