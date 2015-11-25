define(['ko'], function(ko) {

    var viewModel = function(data,pid,bid) {
		this.pid=pid;
		this.bid=bid;
        this.tasks = ko.observableArray(data);

    };

    return viewModel;
});