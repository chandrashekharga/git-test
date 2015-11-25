define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var _ = require('underscore');
    var ProjectsTemplate = require('text!../../templates/projects/projectDetails.html');
    var ProjectModel = require('models/project');

    return Backbone.View.extend({



        initialize: function (param) {
            this.model = new ProjectModel();
            this.model.set(param);
            console.log(param);
            this.render();
        },events: {
        'click a#refresh': function() {
        Backbone.history.loadUrl();
       return false;
                }
     },
        el: "#container",
        render: function () {
            var self = this;
            var projectTemplate = _.template(ProjectsTemplate);


            this.model.fetch({
                success: function () {
                    console.log("Google service api is working well.");
                    console.log(self.model.toJSON());
                    self.$el.html(projectTemplate({
                        'projectDetails': self.model.toJSON()
                    }));
                },
                error: function () {
                    console.log("Some error got triggered while accessing Google service api.");
                }
            }); //END OF FETCH




            //this.$el.html(projectTemplate({'name':'R1'}));
        }
    });
});