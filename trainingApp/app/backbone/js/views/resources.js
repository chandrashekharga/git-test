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
			this.collection = new ResourcesCollection();
			this.collection1 = new BacklogCollection();
			this.taskcollection= new TaskCollection();
			this.entriescollection=new EmtriesCollection();
			this.collection.id = this.id;
			this.collection1.id = this.id;
			this.taskcollection.id = this.id;
			this.entriescollection.id=this.id;
			this.model=new ProjectModel({id:this.id});
		    this.bmodel=new Backlog({bid:this.id});
			this.tmodel= new TaskModel({tid:this.id});
			this.render();
		},
		el: ".container",
		render: function() {
			var self = this;
			var resourceTemplate = _.template(ResourcesTemplate);
			var resourcesListTemplate = _.template(ResourcesListTemplate);
			var resourcesBacklogTemplate = _.template(ResourcesBacklogTemplate);
			var resourcesDetailsTemplate = _.template(ResourcesDetailsTemplate);
			var taskTemplate = _.template(TaskTemplate);
			this.$el.html(resourceTemplate());
			this.collection.fetch({  
				success:function(){
					console.log('inside colection suces fetch of backlog');
					self.$('.resources').html(resourcesListTemplate({resourceslist: self.collection.toJSON()}));
					self.model.fetch({
						success:function(){
							console.log('inside model suces fetch of backlog');
							self.$el.find('.details').html(resourcesDetailsTemplate({project: self.model.toJSON()}));	
						}
					});
				},
				error:function(){
					console.log("Detail list is not getting fetch  ");
				}
			});
		   console.log('befor collection1');
		   this.collection1.fetch({  
				success:function(){
					self.$('.backlog').html(resourcesBacklogTemplate({
						backloglist: self.collection1.toJSON(),
						pid: self.id
					}));
				},
				error:function(){
					console.log("backlog errror ");
				},
			});
		},		
	});
});