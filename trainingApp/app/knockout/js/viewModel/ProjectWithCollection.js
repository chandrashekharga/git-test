define(['ko'], function(ko) {

    var viewModel = function(data) {
        this.project = ko.observableArray(data);
    };

    return viewModel;
});