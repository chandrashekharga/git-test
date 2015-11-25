define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var BacklogsDetailModel = require('models/backlog');
    return Backbone.Collection.extend({
        model: BacklogsDetailModel,

        url: function() {
            return '/api/projects/'+this.pid+'/backlogs';
        }
		
		
    });
});
