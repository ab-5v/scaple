;(function($) {

var KEY = {
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    ESC: 27
};

var defaults = {

    /**
     * Callback for building HTML for menu
     * @param {Array} results
     * @param {Object} query
     */
    template: $.noop,

    /**
     * Callback for making requests
     * @param {Object} query
     * @param {Function} callback for drawing menu
     */
    oninput: $.noop,

    /**
     * Callback for replacing inputs value
     * with selected one
     * @param {Object} result
     * @type String
     */
    onselect: $.noop,

    /**
     * Which element the menu should be appended to
     * @type Any valid jQuery selector
     */
    appendTo: 'body',

    /**
     * Selector for each item in menu
     * @type String
     */
    itemsSelector: '.js-autocomplete-item',

    /**
     * Mark active (and hovered) items with this class
     * @type String
     */
    activeClass: 'b-autocomplete__item_active'
};

var autocomplte = {

    /**
     * Init autocomplete instance
     * @param {jQuery} $el
     * @param {Object} options
     */
    init: function($el, options) {
        var that = this;

        this.$el = $el;
        this.options = options;

        this.$menu = $('<div/>').appendTo( options.appendTo );
        this.activeIndex = -1;

        // data recived from server
        this.data = null;

        // bind events
        $.each(this.events, function(event, callback) {
            that.$el.on(event, $.proxy(callback, that));
        });

        $.each(this.itemEvents, function(event, callback) {
            that.$menu.on(event, options.itemsSelector, $.proxy(callback, that));
        });
    },

    /**
     * Search input events
     * @type Object
     */
    events: {

        /**
         * oninput event
         * requests data and draws menu
         */
        'input': function(e) {
            var that = this;
            var query = this.$el.val();
            var options = this.options;

            // don't request anything on empty query
            if (!query) {
                return this.clear();
            }

            options.oninput({q: query}, function(results) {
                // save result
                that.data = results;
                // remove old items
                that.clear();
                // add new items
                $( options.template(results, {q: query}) ).appendTo(that.$menu);
                // cache menu items
                that.$items = that.$menu.find(options.itemsSelector);
            });
        },

        /**
         * keydown event
         * handles keys UP, DOWN, ENTER, ESC
         */
        'keydown': function(e) {
            // no keys without menu
            if (!this.$items) {
                return;
            }

            if ($.inArray(e.which, [KEY.UP, KEY.DOWN, KEY.ENTER, KEY.ESC]) > -1) {
                e.preventDefault();
            }

            switch (e.which) {
                case KEY.UP:
                    this.moveSelectionUp();
                break;

                case KEY.DOWN:
                    this.moveSelectionDown();
                break;

                case KEY.ENTER:
                    this.select();
                break;

                case KEY.ESC:
                    this.clear();
                break;
            }
        }
    },

    itemEvents: {
        'mouseenter': function(e) {
            this.activeIndex = $.inArray(e.currentTarget, this.$items.get());
            this.activate();
        },
        'mouseleave': function(e) {
            this.activeIndex = -1;
            this.activate();
        }
    },

    moveSelectionUp: function() {
        var last = this.$items.length - 1;
        var index = this.activeIndex;

        if (index === -1 || index <= 0) {
            this.activeIndex = last;
        } else {
            this.activeIndex = index-1;
        }

        this.activate();
    },

    moveSelectionDown: function() {
        var last = this.$items.length - 1;
        var index = this.activeIndex;

        if (index === -1 || index >= last) {
            this.activeIndex = 0;
        } else {
            this.activeIndex = index+1;
        }

        this.activate();
    },

    /**
     * Activate element by activeIndex
     * and deactivate last active
     */
    activate: function() {
        var activeClass = this.options.activeClass;

        this.$items.removeClass(activeClass);

        if (this.activeIndex !== -1) {
            this.$items.eq(this.activeIndex).addClass(activeClass);
        }
    },

    /**
     * Empties menu and resets active element
     */
    clear: function() {
        this.activeIndex = -1;
        this.$menu.empty();
        this.$items = null;
    }
};

$.fn.autocomplete = function(options) {
    options = $.extend(defaults, options || {});
    autocomplte.init(this, options);

    return this;
};
})(jQuery);

