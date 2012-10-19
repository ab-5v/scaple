Scaple.views.Playlist = Backbone.View.extend({

    tagName: 'div',
    className: 'b-playlist',
    template: _.template($("#playlist-template").html()),

    initialize: function() {
        _.bindAll(this, 'render');
    },

    render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
    }
});

