(function($) {
    $.fn.limit = function (limit) {
        return this.each(function() {
            $(this).keydown(function(e) {
                var el = $(this);

                window.setTimeout(function () {
                    var value = el.val();

                    if (value.toString().length > limit) {
                        el.val(value.toString().substring(0, limit));
                    }
                }, 1);
            });
        });
    };
})(jQuery);
