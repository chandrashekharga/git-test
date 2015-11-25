define(['ko'], function(ko) {

    var viewModel = function(data) {
        this.entries = ko.observableArray(data);

    };
    return viewModel;
});