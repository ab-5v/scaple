$.extend( $.ui.autocomplete.prototype, {
    _renderItem: function(root, item) {
      console.log(arguments, this);
        item.value = item.id;
        var html =
            (item.artwork_url ? '<img class="ui-menu-item-artwork" src="' + item.artwork_url + '"/>' : '') +
            '<span class="ui-menu-item-author">' + item.user.username + '</span>' +
            '<span class="ui-menu-item-title">' + item.title + '</span>';

        return $('<li><a>' + html + '</a></li>')
            .data('item.autocomplete', item )
            .appendTo(root);
    }
});
