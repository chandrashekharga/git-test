define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var TaskEntriesDetails = require('models/taskentry');
    return Backbone.Collection.extend({
        model: TaskEntriesDetails,

        url: function() {
            return '/api/projects/'+ this.pid + '/backlogs/'+this.bid+'/tasks/'+this.tid+'/entries';
        }
		
		
    });
});
