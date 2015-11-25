appModule.controller('backlogController', function($scope, $http, $routeParams, projectService){
		projectService.getBacklogs($routeParams.id).success(function(backlogs){
			$scope.backlogs = backlogs;
			 $scope.pid=$routeParams.id;
		}); 
});