define(function (require) {

    'use strict';

    var Backbone = require('backbone');
    var _ = require('underscore');
    var ProjectsTemplate = require('text!../../templates/projects/taskDetails.html');
    var TaskModel = require('models/task');

    return Backbone.View.extend({



        initialize: function (param) {
            this.model = new TaskModel();
            this.model.set(param);
			this.param = param;
            console.log("Hiiiiii---> fhgfjh  "+param);
            this.render();
        },
		
        el: "#container",
        render: function () {
            var self = this;
            var projectTemplate = _.template(ProjectsTemplate);
			//this.model.url='/api/projects/'+ this.get('pid') + '/backlogs/'+ this.get('bid') +'/tasks/'+ this.get('tid') ;

            this.model.fetch({
                success: function () {
                    //console.log("Some Error");
                    console.log(self.model.toJSON());
                    self.$el.html(projectTemplate({
                        'taskDetails': self.model.toJSON(),
						'pid':self.param.pid,
					'bid':self.param.bid,
					'tid':self.param.tid
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