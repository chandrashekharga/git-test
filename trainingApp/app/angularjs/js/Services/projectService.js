appModule.service('projectService', function($http){
		this.getResources = function(pid){
			return $http.get('/api/projects/'+pid+'/resources');
		};
		this.getBacklogs = function(pid){
			return $http.get('/api/projects/'+pid+'/backlogs');
		};
		this.getTasks = function(pid,bid){
			return $http.get('/api/projects/'+pid+'/backlogs/'+bid+'/tasks');
		};
		this.getEntries = function(pid,bid,tid){
			return $http.get('/api/projects/'+pid+'/backlogs/'+bid+'/tasks/'+tid+'/entries');
		};
});