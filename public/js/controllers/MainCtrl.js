app.controller('MainCtrl',['$scope','vechiles', 'auth',function ($scope,vechiles,auth){
	 	$scope.isLoggedIn = auth.isLoggedIn;
		// vechiles.vechiles refer to the service 
		$scope.vechiles = vechiles.vechiles;

		if(auth.isLoggedIn){
			
		}
		$scope.addVechile = function (){
			if(!$scope.model_name || $scope.model_name ==='' || !$scope.plate_no ||$scope.plate_no ==='' ){return;}
			  vechiles.create({
			    model_name: $scope.model_name,
			    plate_no: $scope.plate_no
			  });
			$scope.model_name = '';
			$scope.plate_no = '';
	 	};


	 }]);
