define(function(require) {

	'use strict';
	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/particular_prj.html');
	var ProjectsModelView= require('models/project');
	var ProjectsCollection = require('collections/projects');
	return Backbone.View.extend({
		initialize: function (name) {
		    this.collection= new ProjectsCollection();
			console.log('parameter set');
			this.collection.set(name);
			this.render();
			this.collection.id=this.id;
		},
		el: ".container",
		render: function() {
			var self = this;
			var projectTemplate = _.template(ProjectsTemplate);
			this.collection.fetch({
				success: function(){
					console.log("inside collection.fetch");					
					self.$el.html(projectTemplate({'list':self.collection.toJSON()}));
				},
				error: function(){
					console.log("errorinside colection.fetch");
				}		 
			});
		}
	});
});