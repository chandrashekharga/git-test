var appModule = angular.module("appModule",[]);
appModule.config(function($routeProvider){
	$routeProvider.when('',{
		templateUrl:'views/projectView.html',
		controller:'projectController'
	});
	$routeProvider.when('/projects/:id/resources',{
		templateUrl:'views/resourceView.html',
		controller:'resourceController'
	});
	$routeProvider.when('/projects/:id/backlogs',{
		templateUrl:'views/backlogView.html',
		controller:'backlogController'
	});
	$routeProvider.when('/projects/:id',{
		templateUrl:'views/projectDetailsView.html',
		controller:'projectDetailController'
	});
	$routeProvider.when('/projects/:id/backlogs/:bid/tasks',{
		templateUrl:'views/taskView.html',
		controller:'taskController'
	});
	$routeProvider.when('/projects/:id/backlogs/:bid/tasks/:tid/entries',{
		templateUrl:'views/entryView.html',
		controller:'entryController'
	});
	$routeProvider.otherwise({redirectTo: '/projectView'});
});