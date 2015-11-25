define(function(require) {
    'use strict';
    var Backbone = require('backbone');
    var EntriesModel = require('models/entriesmodel');
    return Backbone.Collection.extend({
        model: EntriesModel,
        url: function() {		
            return '/api/projects/'+ this.pid +'/backlogs/'+this.bid+'/tasks/'+this.tid+'/entries';
        }
    });
});
