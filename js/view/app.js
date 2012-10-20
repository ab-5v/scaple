Scaple.views.App = Backbone.View.extend({

    events: {
        'submit .b-playlist-form': 'playlistAdd'
    },

    tagName: 'div',
    className: 'b-app',
    template: Scaple.T('b-app'),

    initialize: function() {
        _.bindAll(this, 'render', 'playlistDraw');

        this.collection.bind('reset', this.render);
        this.collection.bind('add', this.playlistDraw);
    },

    render: function() {
        this.$el.html( this.template() );
        // container for all playlists
        var $playlists = this.$el.find('.b-app__playlists');
        // create playlist view for each model in collection
        this.collection.each(this.playlistDraw);

        // insert bookmarklet
        this.$el.find('.b-input_bookmarklet').val(Scaple.bookmarklet);

        return this;
    },

    /**
     * Creates view for playlist's model
     * and appends it to the DOM
     * @param {Backbone.Model} playlist
     */
    playlistDraw: function(playlist) {
        var $container = this.$el.find('.b-app__playlists');
        var view = new Scaple.views.Playlist({model: playlist});

        $container.append( view.render().$el );
    },

    /**
     * Creates new model for playlist from form
     * and adds it to the collection
     * @param {Event} e
     */
    playlistAdd: function(e) {
        e.preventDefault();

        var $form = $(e.currentTarget);

        var title = $form.find('input[name=title]').val();
        var description = $form.find('input[name=description]').val();

        var playlist = new Scaple.models.Playlist({
            title: title,
            description: description,
            tracks: []
        });

        this.collection.add(playlist);

        playlist.save();
    }
});

