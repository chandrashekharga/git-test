define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var TaskModel = require('models/task');
    return Backbone.Collection.extend({
        model: TaskModel,

        url: function() {
            return '/api/projects/'+ this.pid + '/backlogs/'+ this.bid +'/tasks/';
        }
		
		
    });
});