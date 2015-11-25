define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var ProjectModel = require('models/project');
    return Backbone.Collection.extend({
        model: ProjectModel,

        url: function () {
            return '/api/projects';
        }


    });
});
