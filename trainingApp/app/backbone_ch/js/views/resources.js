define(function(require) {

	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/details.html');
	var ResourcesCollection = require('../collections/resources');
	var BacklogsDetailCollection = require('../collections/backlogs');
	return Backbone.View.extend({
	

		initialize: function (params) {
			//this.collections = new ResourcesCollection();
			//this.collection = new BacklogsDetailCollection();
			this.params = params;
			this.render();
		},events: {
        'click a#refresh': function() {
        Backbone.history.loadUrl();
       return false;
                }
     },
		el: "#container",
		render: function() {
			//console.log(this.params.pid)
			//console.log(this.params.rid)			
			var projectTemplate = _.template(ProjectsTemplate);
			var responseObject = {};
			var resourceCollection = new ResourcesCollection();
			var backlogsDetailCollection = new BacklogsDetailCollection();
			/*this.$el.html(projectTemplate({'list':this.collections.toJSON()}));*/
			resourceCollection.id = this.params.pid;
			backlogsDetailCollection.pid = this.params.pid;
			var self = this;			
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
							self.$el.html(projectTemplate({responseObject:responseObject}));
						},
						error:function(){
							console.log("Some error got triggered while accessing Google service api.");
						}
					});
				},
				error:function(){
					console.log("Some error got triggered while accessing Google service api.");
				}
			});
			
			
			
				/*this.collection.fetch({
				success:function(){
					console.log("Google service api is working well.");
					self.$el.html(projectTemplate({'backlogslist':self.collection.toJSON()}));
				},
				error:function(){
					console.log("Some error got triggered while accessing Google service api.");
				}
			});	*/	
		}
	});
});
