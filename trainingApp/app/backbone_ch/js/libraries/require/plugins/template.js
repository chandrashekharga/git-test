// This is a require plugin for loading handlebar templates.
// In development this plugin will load the raw template file
// while in test/production pre-compiled templates will be loaded.
define(['handlebars', 'text', 'utilities/helpers','i18n', 'moment'], function(Handlebars, text, helpers, i18n, moment ) {
    var _cache = {};

    var _getTemplateUrl = function(templateName) {
        var templatePath = '../src/templates/';
        var templateExtension = '.html';

        return templatePath + templateName + templateExtension;
    };

    // search the template text and pick out any
    // references to partials. if any partials are
    // found, load them if not already loaded.
    // finally, register them as partials and compile
    var _findPartials = function(data) {
        var partials = data.match( /{{>\s*([^\s]+?)\s*}}/ig );

        if(!partials || partials.length < 1) {
            return;
        }

        require(['underscore'], function(_){
            partials = _.unique(partials);
            partials = _.each(partials, function(partialName) {
                partialName = partialName.split(' ')[1].split('}}')[0];
                _loadTemplate(partialName);
            });
        });
    };

    var _loadTemplate = function(name, load) {
        // Check if template is already requested.
        if(_cache[name]) {
            return;
        }

        // Update the cache to flag that a request for the template is already made.
        _cache[name] = name;

        // load template
        text.get(_getTemplateUrl(name), function(data) {
            var compiledTemplate;
            var partialName;

            // look for any partials referenced in the template
            _findPartials(data);

            compiledTemplate = Handlebars.compile(data);

            if(!Handlebars.templates) {
                Handlebars.templates = {};
            }

            // Add the template to handlebar templates collection
            Handlebars.templates[name] = compiledTemplate;

            // register all templates as partials
            // for so that any template can be used
            // as a partial in any other template
            Handlebars.registerPartial(name, data);

            if(load) {
                // return the compiled template
                load(compiledTemplate);
            }
        });
    };

    //Register Helpers
    Handlebars.registerHelper('formatDateLong', function(value){
        return helpers.formatDateLong(value);
    });

    Handlebars.registerHelper('formatTime', function(value){
        return helpers.formatTime(value);
    });

    Handlebars.registerHelper('formatDateMedium', function(value){
        return helpers.formatDateMedium(value);
    });

    Handlebars.registerHelper('formatDateShort', function(value){
        return helpers.formatDateShort(value);
    });

    Handlebars.registerHelper('formatStatus', function(status){
       return helpers.formatStatus(status);
    });

    Handlebars.registerHelper('t', function(i18n_key) {
        var result = i18n.t(i18n_key);

        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('formatField', function(value){
        return (value === undefined) ? '' : new Handlebars.SafeString(value);
    });

    Handlebars.registerHelper('tr', function(key, values) {
        if (values.hash) {
            if (values.hash.hasOwnProperty()) {
                values = values.hash;
            } else {
                values = this;
            }
        }
        var result = i18n.t(key, values);
        return new Handlebars.SafeString(result);
    });

    Handlebars.registerHelper('d', function(date, formatString){
        return ( date ) ? moment(date).format(formatString) : '';
    } );

    Handlebars.registerHelper('s', function(formatString){
        return formatString.toString();
    } );

    Handlebars.registerHelper('checkedIfAM', function(date){
        if (!date) {
            return;
        }

        var meridien = moment(date).format('a');
        if ('am' === meridien ){
            return 'CHECKED';
        }
    });

    Handlebars.registerHelper('checkedIfPM', function(date){
        if (!date) {
            return;
        }

        var meridien = moment(date).format('a');
        if ('pm' === meridien ){
            return 'CHECKED';
        }
    });

    Handlebars.registerHelper('truncate', function(value, length) {
        if (value && value.length > length) {
           return new Handlebars.SafeString(value.substr(0, length) + '&hellip;');
        }
        return value;
    });

    return {
        load: function(name, req, load, config) {
            var templateName;

            if(config.isBuild) {
                load();
            } else {
                templateName = name;
                if(Handlebars.templates && Handlebars.templates[templateName]) {
                    load(Handlebars.templates[templateName]);
                } else {
                    //  Try loading from pre-compiled templates.
                    require(['templates'], function() {
                            if(Handlebars.templates[templateName]) {
                                // Returning pre-compiled template.
                                load(Handlebars.templates[templateName]);
                            } else {
                                // Pre-compiled templates are not available, load the raw template.
                                _loadTemplate(name, load);

                                /*
                                throw new Error('Template could not be found in the pre-compiled file.' +
                                    'Re-generate the pre-compiled template file.');
                                */
                            }
                        }, function(err) {
                            // Pre-compiled templates are not available, load the raw template.
                            _loadTemplate(name, load);
                    });
                }
            }
        }
    };
});
