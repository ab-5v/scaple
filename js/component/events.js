/**
 * Missing 'one' method for Backbone.Events
 */
Scaple.Events = $.extend(Backbone.Events, {
    one: function(events, callback, context) {
        var that = this;

        var one = function() {
            that.off(events, one, context);
            callback.apply(this, arguments);
        };

        this.on(events, one, context);
    }
});
