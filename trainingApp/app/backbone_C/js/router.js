define(function (require) {

    'use strict';

    var Backbone = require('backbone');
	var ProjectsView = require('views/projects');
    var Router = Backbone.Router.extend({
        routes: {
            '': 'projects',
            'projects': 'projects'
        },
        projects: function() {
			var projectsView = new ProjectsView();
        }        
    });
	
    return Router;
});
