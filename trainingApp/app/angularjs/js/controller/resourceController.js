appModule.controller('resourceController', function($scope, $http, $routeParams, projectService){
		projectService.getResources($routeParams.id).success(function(resources){
			$scope.resources = resources;
		}); 
});