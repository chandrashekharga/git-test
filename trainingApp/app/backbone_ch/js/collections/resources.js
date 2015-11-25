define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var ResourceModel = require('models/resource');
    return Backbone.Collection.extend({
        model: ResourceModel,

        url: function() {
            return '/api/projects/'+ this.id + '/resources';
        }
		
		
    });
});
