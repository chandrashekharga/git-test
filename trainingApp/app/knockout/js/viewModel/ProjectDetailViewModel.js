define(['ko'], function(ko) {

    var viewModel = function(data) {
		this.id=ko.observable(data.id);
		this.name=ko.observable(data.name);
		this.description=ko.observable(data.description);
    };

    return viewModel;
});