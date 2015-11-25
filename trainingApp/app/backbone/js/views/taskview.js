define(function(require) {
	'use strict';
	var Backbone = require('backbone');
	var _ = require('underscore');  
	var ResourcesTemplate = require('text!../../templates/projects/resources.html');
	var ResourcesListTemplate = require('text!../../templates/projects/resourcesList.html');
	var TaskTemplate = require('text!../../templates/projects/task.html');
	var ResourcesBacklogTemplate = require('text!../../templates/projects/backlogList.html');
	var ResourcesDetailsTemplate = require('text!../../templates/projects/detailsList.html');
	var EntriesTemplate = require('text!../../templates/projects/entries.html');
	var ResourcesCollection = require('collections/resources');
	var BacklogCollection= require('collections/backlog');
	var ProjectModel = require('models/project');
	var Resource = require('models/resource');
	var Backlog = require('models/backlogs');
	var TaskCollection= require('collections/taskcollection');
	var TaskModel=require('models/taskmodel');
	var EmtriesCollection=require('collections/entriescollection');
	return Backbone.View.extend({
		initialize: function () {		
			console.log("Pid: "+ this.options.pid + " | Bid: "+ this.options.bid);
			this.collection = new ResourcesCollection();
			this.collection1 = new BacklogCollection();
			this.taskcollection= new TaskCollection();
			this.collection.id = this.id;
			this.collection1.id = this.id;
			this.taskcollection.pid=this.options.pid;
			this.taskcollection.bid=this.options.bid;
			this.model=new ProjectModel({id:this.id});
		    this.bmodel=new Backlog({bid:this.id});
			this.tmodel= new TaskModel({tid:this.id});
			this.render();
		},
		el: ".container",
		render: function() {
			var self = this;
			var taskTemplate = _.template(TaskTemplate);
		    this.taskcollection.fetch({  
				success:function(){
					console.log('task collection');
					self.$('.taskdetail').html(taskTemplate({taskList: self.taskcollection.toJSON(),pid:self.options.pid,bid:self.options.bid}));
					console.log(self.taskcollection.toJSON());					
				},
				error:function(){
					console.log("Task errror ");
				}
			});
		},		
	});
});