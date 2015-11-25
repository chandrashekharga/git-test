define(['ko'], function(ko) {

    var viewModel = function(data,pid) {
	this.pid=pid;
        this.backlogs = ko.observableArray(data);	
    };
    return viewModel;
});