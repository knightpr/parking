app.factory('vechiles',['$http', 'auth',function($http, auth){
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

