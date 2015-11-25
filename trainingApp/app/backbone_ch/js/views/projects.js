define(function(require) {

	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');    
	var ProjectsTemplate = require('text!../../templates/projects/projects.html');
	var ProjectsCollection = require('../collections/projects');
	
	return Backbone.View.extend({
		initialize: function () {
			this.collections = new ProjectsCollection();
			console.log(this.collections);
			this.render();
		},
		events: {
        'click a#refresh': function() {
        Backbone.history.loadUrl();
       return false;
                }
     },
		el: "#container",
		render: function() {
			var projectTemplate = _.template(ProjectsTemplate);
			var self = this;
			/*this.$el.html(projectTemplate({'list':this.collections.toJSON()}));*/
			  this.collections.fetch({
            success:function(){
                console.log("Google service api is working well.");
                console.log(self.collections.toJSON());
                self.$el.html(projectTemplate({'projectlist':self.collections.toJSON()}));
            },
            error:function(){
                console.log("Some error got triggered while accessing Google service api.");
            }
        });	
		}
	});
});
