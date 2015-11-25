define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var BacklogModel = require('models/backlogs');
	
    return Backbone.Collection.extend({
        model: BacklogModel,
        url: function() {
            return '/api/projects/'+ this.id +'/backlogs';
        }
    });
});
