/*
	All the App level configuration goes here;
*/
define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var Router = require('router');

    var _initialize = function () {
        var app = this;
        _initializeAppRouter(app);
    };
    var _initializeAppRouter = function (app) {
        var router = new Router();
        Backbone.history.start({
            root: router.root,
            pushState: false
        });
    };
    _initialize();
});