define(function(require) {

	'use strict';
	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/projects.html');
	var ProjectsCollection = require('collections/projects');
	
	return Backbone.View.extend({
		initialize: function () {
			this.collection = new ProjectsCollection();
			console.log('intialize function');
			this.render();
		},
		el: ".container",
		render: function() {
		var self = this;
			var projectTemplate = _.template(ProjectsTemplate);
			this.collection.fetch({
				success: function(){
					console.log("inside colection.fetch");
					self.$el.html(projectTemplate({list: self.collection.toJSON()}));
				},
				error: function(){
				console.log("errorinside colection.fetch");
			}
		});
	}
});
	

});