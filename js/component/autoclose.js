;(function($) {
$.fn.autoclose = function(callback, except) {
    var that = this;

    $(window).on('click', function(e) {
        var $src = $(e.target);
        // click outside element
        if (!$src.closest(that)[0] && !$src.closest(except)[0]) {
            callback();
        }
    });

    return this;
};
})(jQuery);

