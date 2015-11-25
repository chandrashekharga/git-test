define(function(require) {

	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/task.html');
	var TaskCollection = require('../collections/tasks');
	
	return Backbone.View.extend({
	

		initialize: function (param) {
			this.param = param;
			//this.param.pid=param.pid;
			//this.param.bid=param.bid;
			this.collections = new TaskCollection();
			this.render();
		},
		
		el: ".TaskDescription",
		render: function() {
			var projectTemplate = _.template(ProjectsTemplate);
			var self = this;
			//this.$el.html(projectTemplate({'list':this.collections.toJSON()}));
			this.collections.pid = this.param.pid;
			this.collections.bid = this.param.bid;
			this.collections.fetch({
				success:function(){
					console.log("Google service api is working well.");
					console.log(self.collections.toJSON());
					self.$el.html(projectTemplate({
						
						'tasklist':self.collections.toJSON(),
						'pid':self.collections.pid,
						'bid':self.collections.bid
						
					}));
				},
				error:function(){
					console.log("Some error got triggered while accessing Google service api.");
				}
			});	
		}
	});
});