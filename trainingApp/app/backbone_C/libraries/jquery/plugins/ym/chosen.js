define(['chosen', 'handlebars'], function (require) {
    var chzn = Chosen.prototype,
        choice_build = Chosen.prototype.choice_build,
        choice_destroy = Chosen.prototype.choice_destroy,
        container_mousedown =  Chosen.prototype.container_mousedown,
        close_field = Chosen.prototype.close_field,
        activate_field = Chosen.prototype.activate_field,
        test_active_click = Chosen.prototype.test_active_click,
        set_up_html = Chosen.prototype.set_up_html,
        search_field_scale = Chosen.prototype.search_field_scale;

    chzn.add_all_selections = function (e) {
        var me = this,
            i = 0,
            chosenChoices = me.container.find('ul.chzn-choices');

        if (e) {
            e.preventDefault();
        }

        me.clear_selections();

        for (i; i < me.results_data.length; ++i) {
            me.results_data[i].selected = true;
        }

        for (i = 0; i < me.form_field.options.length; ++i) {
            me.form_field.options[i].selected = true;
        }

        me.selected_option_count = null;

        me.choice_build(me.results_data);

        chosenChoices.children().each(function () {
            $(this).removeClass("active-result");
            $(this).addClass("result-selected");
        });

        me.search_field.val("");

        me.current_selectedIndex = me.results_data.length - 1;

        me.search_field_scale();

        me.form_field_jq.trigger("change");

        me.set_overflow(true);

        if (me.overflowDiv) {
            me.overflowDiv.removeClass("chzn-container-active");
        }

        me.addSearchFieldListeners();
    };

    chzn.clear_selections = function (e) {
        var me = this,
            chosenChoices = me.container.find('ul.chzn-choices'),
            searchField = chosenChoices.find('.search-field'),
            results = me.container.find('.chzn-drop .chzn-results li');

        if (e) {
            e.preventDefault();
        }

        if (me.is_disabled) {
            return;
        }

        me.bulkProcess = true;

        me.show_search_field_default();
        me.results_hide();

        chosenChoices.html(searchField);

        for (var i = 0; i < me.results_data.length; ++i) {
            me.result_deselect(i);
        }

        me.search_field.val(me.default_text);
        me.search_field.addClass("default");
        me.search_field_scale();

        me.form_field_jq.trigger("change");

        me.removeOverflow();

        me.addSearchFieldListeners();

        me.bulkProcess = false;
    };

    chzn.addSearchFieldListeners = function () {
        var me = this;

        me.search_field.off('blur');
        me.search_field.blur(function(evt) {
            me.input_blur(evt);
        });

        me.search_field.off('keyup');
        me.search_field.keyup(function(evt) {
            me.keyup_checker(evt);
        });

        me.search_field.off('keydown');
        me.search_field.keydown(function(evt) {
            me.keydown_checker(evt);
        });

        me.search_field.off('focus');
        me.search_field.focus(function(evt) {
            me.input_focus(evt);
        });
    };

    chzn.set_overflow = function (enable) {
        var me = this,
            choices = me.container.find('ul.chzn-choices'),
            choicesParent = choices.parent(),
            cCount = choices.children().length,
            autoOverflow = me.options.autoOverflow,
            choice, cMarginTopCSS, cMarginBottomCSS, overflowTpl,
            cMarginTop, cMarginBottom, cHeight, rCount, prevTop,
            top, $el, overflowDiv;

        if (cCount === 1) {
            return;
        }

        choice = choices.find('.search-choice');
        cMarginTopCSS = choice.css("marginTop");
        cMarginBottomCSS = choice.css("marginBottom");
        overflowTpl = '<div class="chzn-overflow-container chzn-container-active"></div>';
        cMarginTop = parseInt(cMarginTopCSS.substring(0, cMarginTopCSS.length - 2), 10);
        cMarginBottom = parseInt(cMarginBottomCSS.substring(0, cMarginBottomCSS.length - 2), 10);
        cHeight = choice.outerHeight() + cMarginTop + cMarginBottom; // TODO: account for individual choice heights
        rCount = 0;
        prevTop = null;

        if (!autoOverflow) {
            return;
        }

        if (enable && !me.overflowDiv) {
            if (((choices.height() / (cHeight))) > (autoOverflow - 1)) {
                choicesParent.append(overflowTpl);

                overflowDiv = choicesParent.find('.chzn-overflow-container');
                overflowDiv.attr('style', function (i, s) {
                    s = s || '';

                    return s + 'height: ' + ((autoOverflow * cHeight) + cMarginTop)  + 'px !important;';
                });

                overflowDiv.append(choices);

                me.overflowDiv = overflowDiv;
            }
        } else if (me.overflowDiv && !enable) {
            choices.children().each(function (i, el) {
                $el = $(el);
                top = $el.position().top;

                if (prevTop === null) {
                    rCount++;
                    prevTop = top;

                    return;
                }

                if (prevTop !== top) {
                    rCount++;
                }

                prevTop = top;
            });

            if ((rCount * cHeight) < me.overflowDiv.height()) {
                me.removeOverflow();
            }
        }
    };

    chzn.removeOverflow = function () {
        var me = this,
            choices = me.container.find('ul.chzn-choices'),
            choicesParent = choices.parent();

        if (!me.overflowDiv) {
            return;
        }

        choicesParent.parent().append(choices);
        me.overflowDiv.remove();

        me.overflowDiv = null;
    };

    chzn.choice_destroy = function () {
        choice_destroy.apply(this, arguments);
        this.set_overflow(false);
    };

    chzn.close_field = function() {
        if (this.overflowDiv) {
            this.overflowDiv.removeClass("chzn-container-active");
        }

        return close_field.apply(this, arguments);
    };

    chzn.activate_field = function() {
        if (this.overflowDiv) {
            this.overflowDiv.addClass("chzn-container-active");
        }

        return activate_field.apply(this, arguments);
    };

    chzn.test_active_click = function (evt) {
        var overflowCls = "chzn-overflow-container";

        if (this.overflowDiv) {
            if (!$(evt.target).closest(overflowCls)) {
                this.close_field();
            } else if ($(evt.target).hasClass(overflowCls)) {
                return;
            }
        }

        test_active_click.apply(this, arguments);
    };

    chzn.container_mousedown = function (evt) {
        if (!evt || (($(evt.target)).hasClass('chzn-overflow-container'))) {
            return;
        }

        container_mousedown.apply(this, arguments);
    };

    chzn.set_up_html = function () {
        var me = this,
            btnCls = 'ym-btn ym-btn-tableButton chzn-footer-btn',
            footerCfg = me.options.footerCfg,
            container, chznSelectParent, selectBtnTpl, clearBtnTpl;

        set_up_html.apply(me, arguments);

        if (!footerCfg) {
            return;
        }

        container = me.container;
        chznSelectParent = container.parent();
        selectBtnTpl = '<button id="selectAllBtn" class="' + btnCls + '">' + footerCfg.selectAllTxt + '</button>';
        clearBtnTpl = '<button id="clearAllBtn" class="' + btnCls + '">' + footerCfg.clearAllTxt + '</button>';

        chznSelectParent.append(selectBtnTpl);
        chznSelectParent.append(clearBtnTpl);

        chznSelectParent.find('#selectAllBtn').click($.proxy(me.add_all_selections, me));
        chznSelectParent.find('#clearAllBtn').click($.proxy(me.clear_selections, me));
    };

    chzn.choice_build = function(item) {
        var i = 0,
            me = this,
            ret = [],
            items, liTpl, chosenChoices;

        if ($.isArray(item)) {
            items = item;
            chosenChoices = me.container.find('ul.chzn-choices');

            liTpl = Handlebars.compile('<li class="search-choice {{#if disabled}}{{disabledCls}}{{/if}}">' +
                                        '<span>{{html}}</span>' +
                                        '{{#unless disabled}}<a href="#" class="search-choice-close" rel="{{arrayIndex}}"/>{{/unless}}' +
                                       '</li>');

            for (i; i < items.length; ++i) {
                item = items[i];

                ret.push(liTpl({
                    html: item.html,
                    arrayIndex: item.array_index,
                    disabled: item.disabled,
                    disabledCls: 'search-choice-disabled'
                }));
            }

            me.search_container.before(ret.join(''));

            chosenChoices.find('.search-choice-close').click(function(evt) {
                return me.choice_destroy_link_click(evt);
            });

            me.search_field_scale();

            return $;
        }

        choice_build.apply(me, arguments);
        me.set_overflow(true);
        me.search_field_scale();
    };

    // override
    chzn.result_deselect = function(pos) {
        var result_data;

        result_data = this.results_data[pos];
        if (!this.form_field.options[result_data.options_index].disabled) {
            result_data.selected = false;
            this.form_field.options[result_data.options_index].selected = false;
            this.selected_option_count = null;
            this.result_clear_highlight();

            if (this.results_showing) {
                this.winnow_results();
            }

            if (!this.bulkProcess) {
                this.form_field_jq.trigger("change", {
                  deselected: this.form_field.options[result_data.options_index].value
                });
                this.search_field_scale();
            }

            return true;
        } else {
            return false;
        }
    };
});
