appModule.controller('projectController',['$scope','$http',
	function($scope, http){
		$scope.projectDashboard = function(){
			http.get('/api/projects').success(function(data) {
				$scope.data = data;
			});
			
		}

}]);