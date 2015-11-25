define(function (require) {
    'use strict';
    var Backbone = require('backbone');
	var ProjectsView = require('views/projects');
	var ResourcesView = require('views/resources');
	var TaskView = require('views/taskview');
	var EntriesView = require('views/entriesview');
	var Router = Backbone.Router.extend({
        routes: {
			'': 'projects',
			'projects': 'projects',
			'projects/:pid/resources':'resources',
			'projects/:pid/backlog':'backlog',
			'projects/:pid/backlogs/:bid/tasks':'tasks',
			'projects/:pid/backlogs/:bid/tasks/:tid/entries':'entries'
        },
        projects: function() {
			console.log('in projects route');
			var projectsView = new ProjectsView();
        }, 
		resources: function(pid) {
			console.log('in resources route');
			var resourcesView = new ResourcesView({id:pid});
        },
		backlog: function(pid) {
			console.log('in backlog route');
			var resourcesView = new ResourcesView({id:pid});
        },
		tasks: function(pid,bid) {   
			console.log('in task route');
			var taskView = new TaskView({pid:pid , bid:bid });
        },
		entries:function(pid,bid,tid) {
			console.log('in entries');
			var entriesView =new EntriesView({pid:pid,bid:bid,tid:tid});
		}
	});
    return Router;
}); 
console.log("router");
