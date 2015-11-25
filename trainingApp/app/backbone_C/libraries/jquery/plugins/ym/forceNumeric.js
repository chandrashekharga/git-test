define(function (require) {
    var cpMap;

    (function($) {
        var prevVal = "",
            cp;

        var numeric = $.fn.forceNumeric = function (cfg) {
            var $this;

            if (!cp) {
                // copy-paste finite state automaton
                cp = (function () {
                        var ret = {
                            running: false,

                            init: function () {
                                var me = this;
                                // modifier key for copy-paste
                                me.keys = {
                                    "16": 1,    // Linux
                                    "17": 1,    // Windows / Linux
                                    "18": 1,    // (alt key)
                                    "91": 1     // MAC
                                };
                            },

                            isRunning: function () {
                                return this.running;
                            },

                            start: function (k) {
                                var me = this,
                                    keys = me.keys;

                                // coerce to string
                                k += "";

                                if (!keys[k]) {
                                    return;
                                }

                                this.running = true;
                            },

                            stop: function () {
                                this.running = false;
                            }
                        };

                        ret.init();

                        return ret;
                    })();
            }

            return this.each(function() {
                $this = $(this);

                $this.keydown(numeric.onKeydown(cfg, $this));
                $this.keyup(numeric.onKeyup(cfg, $this));
            });
        };

        numeric.onKeyup = function () {
            return function () {
                cp.stop();
            };
        };

        // create handler in this way to allow for unit-testing
        numeric.onKeydown = function (cfg, control) {
            return function (e) {
                var key = e.which || e.keyCode,
                    c = control;

                cp.start(key);

                if (cp.isRunning()) {
                    return true;
                }

                var isNumeric = function (key) {
                    return (key >= 48 && key <= 57) || // numbers
                            (key >= 96 && key <= 105); // Numeric keypad
                };

                var isModifier = function (e) {
                    return e.shiftKey || e.altKey || e.ctrlKey;
                };

                if (cfg) {                           // subtract       dash           dash on FF
                    if (cfg.allowNegative === false && (key === 109 || key === 189 || key === 173)) {
                        return false;
                    }
                }

                if (!isModifier(e) && isNumeric(key) ||
                    // comma, period and minus, . on keypad
                    // added in dash from main keyboard as well
                    key === 190 || key === 188 || key === 109 || key === 110 || key === 189 || key === 173 ||
                    // Backspace and Tab and Enter
                    key === 8 || key === 9 || key === 13 ||
                    // Home and End
                    key === 35 || key === 36 ||
                    // left and right arrows
                    key === 37 || key === 39 ||
                    // Del and Ins
                    key === 46 || key === 45) {
                    return true;
                }

                return false;
            };
        };
    })(jQuery);
});
