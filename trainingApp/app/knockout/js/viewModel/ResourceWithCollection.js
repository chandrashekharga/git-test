define(['ko'], function(ko) {

    var viewModel = function(data) {
        this.resources = ko.observableArray(data);
    };

    return viewModel;
});