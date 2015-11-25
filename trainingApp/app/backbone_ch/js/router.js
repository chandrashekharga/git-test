define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var ProjectsView = require('views/projects');
    var ResourcesView = require('views/resources');
	var BacklogsView = require('views/backlogs');
	var TasksView = require('views/tasks');
	var TasksDetail = require('views/taskDetails');
	var TaskEntriesDetail = require('views/taskentries');
    var Router = Backbone.Router.extend({
        routes: {
            '': 'projects',
            'projects': 'projects',
            'projects/:pid': 'project',
            'projects/:pid/resources': 'getResources',
			'projects/:pid/backlogs': 'getBacklogs',
			'projects/:pid/backlogs/:bid/tasks': 'getTasks',
			'projects/:pid/backlogs/:bid/tasks/:tid': 'getTaskDetails',
			'projects/:pid/backlogs/:bid/tasks/:tid/entries': 'getTaskEntries'

        },
        projects: function () {
           
            var ProjectsView = require('views/projects');
            var projectsView = new ProjectsView();
        },
        project: function (pid) {
            console.log('id' + pid);
            var ProjectsModelView = require('views/projectDetails');
            var ProjectsModelView = new ProjectsModelView({
                id: pid
            });
        },
        getResources: function (pid) {
            console.log('Resources for project id: ' + pid);
            var ResourcesView = require('views/resources');
            var ResourcesModelView = new ResourcesView({
                pid: pid,
				rid:10,
            });
        },
		 getBacklogs: function (pid,bid) {
            console.log('Backlogs for project id: ' + pid);
            //var BacklogsView = require('views/backlogs');
            var BacklogsDetailView = new BacklogsView({
                pid: pid,
				bid:bid
            });
        },
		getTasks: function (pid,bid) {
            console.log('Tasks for project id: ' + pid);
			console.log('Tasks for backlog id: ' + bid);
            //var TasksView = require('views/tasks');
            var tasksView = new TasksView({
                pid: pid,
				bid:bid
            });
        },
			getTaskDetails: function (pid,bid,tid) {
            console.log('Tasks for project id: ' + pid);
			console.log('Tasks for backlog id: ' + bid);
			console.log('Tasks for task id: ' + tid);
            //var TasksDetail = require('views/tasks');
			console.log('caught here ');
            var tasksView = new TasksDetail({
                pid: pid,
				bid:bid,
				tid:tid
            });
        },
	getTaskEntries: function (pid,bid,tid) {
            console.log('Tasks for project id: ' + pid);
			console.log('Tasks for backlog id: ' + bid);
			console.log('Tasks for task id: ' + tid);
            //var TasksDetail = require('views/tasks');
            var taskentriesdetail = new TaskEntriesDetail({
                pid: pid,
				bid:bid,
				tid:tid
            });
        }
    });

    return Router;
});
