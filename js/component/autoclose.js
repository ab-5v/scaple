;(function($) {

$.fn.autoclose = function(callback, except) {

    return this;

    if (callback === 'off') {
        var namespace = this.data('autoclose');
        $(window).off('.' + namespace);
        return this;
    }

    var that = this;
    var namespace = 'autoclose_' + Math.floor(Math.random() * 10000);

    this.data('autoclose', namespace);

    $(window).on('click.' + namespace, function(e) {
        var $src = $(e.target);
        // click outside element
        if (!$src.closest(that)[0] && !$src.closest(except)[0]) {
            callback();
        }
    });

    return this;
};
})(jQuery);

