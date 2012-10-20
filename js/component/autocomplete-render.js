$.extend( $.ui.autocomplete.prototype, {
    _renderItem: function(root, item) {
        item.value = item.id;
        var html =
            (item.artwork_url ? '<img src="' + item.artwork_url + '"/>' : '') +
            '<span>' + item.user.username + '</span>' +
            '<span>' + item.title;

        return $('<li><a>' + html + '</a></li>')
            .data('item.autocomplete', item )
            .appendTo(root);
    }
});
