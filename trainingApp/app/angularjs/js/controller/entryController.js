appModule.controller('entryController', function($scope, $http, $routeParams, projectService){
		projectService.getEntries($routeParams.id,$routeParams.bid,$routeParams.tid).success(function(entries){
		console.log($routeParams.tid);
			$scope.entries = entries;
			console.log(entries);
			
		}); 
});