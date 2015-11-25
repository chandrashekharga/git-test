/*
	All the require configuration goes here;
*/
require.config({
    /* https://github.com/requirejs/text */     
	'baseUrl': "./js",
    'paths': {
		'jquery': 'libraries/jquery/jquery-1.8.3',
        'backbone': 'libraries/backbone/backbone',
        'underscore': 'libraries/underscore/underscore-1.4.2',
        'text':'libraries/require/plugins/text-2.0.5'
    },
    'shim': {
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        }
	}
});
var app = require(['app']);