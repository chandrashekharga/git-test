define(function(require) {
	'use strict';
	var Backbone = require('backbone');
	var _ = require('underscore');  
	var ResourcesTemplate = require('text!../../templates/projects/taskentry.html');
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
			this.entriescollection= new EmtriesCollection();
			console.log("Pid: "+ this.options.pid + " | Bid: "+ this.options.bid +"Tid:"+this.options.tid);
			this.entriescollection.pid=this.options.pid;
			this.entriescollection.bid=this.options.bid;
			this.entriescollection.tid=this.options.tid;
		 	this.render();	
		},
		el: ".container",
		render: function() {
			var self = this;
			var resourceTemplate = _.template(ResourcesTemplate);
			var entriesTemplate = _.template(EntriesTemplate);
			this.$el.html(resourceTemplate());
		    this.entriescollection.fetch({  
				success:function(){
					console.log('entries collection');
					self.$('.entriesdetail').html(entriesTemplate({entriesList: self.entriescollection.toJSON()}));	
					console.log(self.entriescollection.toJSON());
				},
				error:function(){
					console.log("entries errror ");
				}
			});
		},		
	});
});