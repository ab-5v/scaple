Scaple.views.App = Backbone.View.extend({

    tagName: 'div',
    className: 'b-app',
    template: _.template($("#app-template").html()),

    initialize: function() {
        _.bindAll(this, 'render');

        this.collection.bind('reset', this.render);
    },

    render: function() {
        this.$el.html( this.template({}) );
        // container for all playlists
        var $playlists = this.$el.find('.b-app__playlists');
        // create playlist view for each model in collection
        this.collection.each(function(playlist) {
            var view = new Scaple.views.Playlist({model: playlist});
            $playlists.append( view.render().$el );
        });
        return this;
    }
});

