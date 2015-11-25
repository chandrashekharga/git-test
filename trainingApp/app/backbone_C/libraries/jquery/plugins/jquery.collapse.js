/*
    jQuery Plugin to create collapsible panels.

    Markup:
    <div class="parent">
        <div data-collapse="true" data-target=".htmlPanel">HTML</div>
        <div class="htmlPanel"></div>
        <div data-collapse="true" data-target=".textPanel">Text</div>
        <div class="textPanel"></div>
    </div>

    Usage:
        $('.parent').collapse(); or $('[data-collapse]').collapse();

    There is a dependency on windowShade.css
* */
(function($) {
    'use strict';

    var _toggleCollapse = function(el) {
        var isCollapsed = el.is('.collapsed');
        el.removeClass('collapsed expanded').addClass(isCollapsed ? 'expanded' : 'collapsed');
        $(el.data('target')).toggle(isCollapsed);
    };

    var _enableCollapse = function(el) {
        el.on('click.collapse', function(e) {
            _toggleCollapse($(e.target));
        });
        _toggleCollapse(el);
    };

    var methods = {
        init: function() {
            return this.each(function() {
                var $this = $(this);

                if($this.is('[data-collapse]')) {
                    _enableCollapse($this);
                } else {
                    $this.find('[data-collapse]').collapse();
                }
            });
        },

        destroy: function() {
            return this.each(function() {
               $(this).off('.collapse');
            });
        }
    };

    $.fn.collapse = function(method) {
        if(!method) {
            return methods.init.apply(this);
        } else if(methods[method]) {
            return methods[method].apply(this);
        }
    };

}(jQuery));