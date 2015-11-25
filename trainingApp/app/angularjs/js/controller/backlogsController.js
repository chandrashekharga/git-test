appModule.controller('backlogsController', function($scope, $http, $routeParams, projectService){
		projectService.getBacklogs($routeParams.id).success(function(data){
			$scope.data = data;
		}); 
});