appModule.controller('taskController', function($scope, $http, $routeParams, projectService){
		projectService.getTasks($routeParams.id,$routeParams.bid).success(function(tasks){
		console.log($routeParams.id);
			$scope.tasks = tasks;
			console.log(tasks);
			 $scope.pid=$routeParams.id;
			  $scope.bid=$routeParams.bid;
		}); 
});