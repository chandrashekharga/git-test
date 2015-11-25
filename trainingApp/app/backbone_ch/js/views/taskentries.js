define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var _ = require('underscore');
    var ProjectsTemplate = require('text!../../templates/projects/taskentries.html');
    var TaskCollection = require('../collections/taskentries');

    return Backbone.View.extend({



        initialize: function (param) {
            this.collection = new TaskCollection();
            this.collection.pid = param.pid;
			this.collection.tid = param.tid;
			this.collection.bid = param.bid;
            console.log("Hiiiiii "+param);
            this.render();
        },
		
        el: "#container",
        render: function () {
            var self = this;
            var projectTemplate = _.template(ProjectsTemplate);


            this.collection.fetch({
                success: function () {
                    //console.log("Some Error");
                    console.log(self.collection.toJSON());
                    self.$el.html(projectTemplate({
                        'taskentrieslist': self.collection.toJSON(),
						'pid':self.collection.pid,
						'bid':self.collection.bid,
						'tid':self.collection.tid
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