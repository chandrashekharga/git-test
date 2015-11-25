/*define(function(require) {

	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/details.html');
	var BacklogsDetailCollection = require('../collections/backlogs');
	
	return Backbone.View.extend({
	

		initialize: function () {
			this.collections = new BacklogsDetailCollection();
			this.render();
		},
		el: "#container",
		render: function() {
			var projectTemplate = _.template(ProjectsTemplate);
			var self = this;
			//this.$el.html(projectTemplate({'list':this.collections.toJSON()}));
			this.collections.id = this.id;
			this.collections.fetch({
				success:function(){
					console.log("Google service api is working well.");
					self.$el.html(projectTemplate({'backlogslist':self.collections.toJSON()}));
				},
				error:function(){
					console.log("Some error got triggered while accessing Google service api.");
				}
			});	
		}
	});
});*/
define(function(require) {

	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/details.html');
	var ResourcesCollection = require('../collections/resources');
	var BacklogsDetailCollection = require('../collections/backlogs');
	var TaskCollection = require('../collections/tasks');
	var TasksView = require('views/tasks');
	return Backbone.View.extend({
	

		initialize: function (params) {
			//this.collections = new ResourcesCollection();
			//this.collection = new BacklogsDetailCollection();
			this.params = params;
			this.render();
		},
		events:{
			'click .backlogHead a' : 'getTasks'
		},
		getTasks: function(e){
			e.preventDefault();
			var target = $(e.target);
			var tasksView = new TasksView({
                pid: this.params.pid,
				bid: parseInt(target.attr('data-bid'), 10)
            });
			
		},
		el: "#container",
		render: function() {
					
			var projectTemplate = _.template(ProjectsTemplate);
			var responseObject = {};
			var resourceCollection = new ResourcesCollection();
			var backlogsDetailCollection = new BacklogsDetailCollection();
			var taskCollection = new TaskCollection();
			/*this.$el.html(projectTemplate({'list':this.collections.toJSON()}));*/
			resourceCollection.id = this.params.pid;
			backlogsDetailCollection.pid = this.params.pid;
			taskCollection.pid = this.pid;
			taskCollection.bid = this.bid;
			var self = this;		
			console.log("Pid in backlogView is: "+ this.params.pid);
			resourceCollection.fetch({
				success:function(){
					console.log("Google service api is working well.");
					responseObject.resourcelist = resourceCollection.toJSON();
					//self.$el.html(projectTemplate({'resourcelist':self.resourceCollection.toJSON()}));
					
					backlogsDetailCollection.fetch({
						success:function(){
							console.log("Google service api is working well.");
							responseObject.backlogslist = backlogsDetailCollection.toJSON();
							console.log(responseObject);
							responseObject.pid = self.params.pid;
							
							self.$el.html(projectTemplate({
								responseObject:responseObject
							}));
						},
						error:function(){
							console.log("Some error got triggered while accessing Google service api.");
						}
					});
					/*taskCollection.fetch({
						success:function(){
							console.log("Google service api is working well.");
							responseObject.tasklist = taskCollection.toJSON();
							console.log(responseObject);
							responseObject.bid = self.params.bid;
							self.$el.html(projectTemplate({
								responseObject:responseObject
							}));
						},
						error:function(){
							console.log("Some error got triggered while accessing Google service api.");
						}
					});*/
				},
				error:function(){
					console.log("Some error got triggered while accessing Google service api.");
				}
			});
			
			
			
				
		}
	});
});
