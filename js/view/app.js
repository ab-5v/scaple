Scaple.views.App = Backbone.View.extend({

    events: {
        'submit .js-playlist-form': 'playlistAdd',
        'click .js-playlist-selector': 'playlistSelect',
        'click .js-playlist-add': 'playlistFormToggle'
    },

    tagName: 'div',
    className: 'b-app',
    template: Scaple.T('b-app'),

    /**
     * Default playlist width
     * @type Number
     */
    plWidth: 300,

    initialize: function() {
        _.bindAll(this, 'render', 'playlistDraw');

        // collection for all playlists subviews
        this.views = [];
        this.currentView = 0;

        this.collection.bind('reset', this.render);
        this.collection.bind('add', this.playlistDraw);
    },

    render: function() {
        this.$el.html( this.renderHTML() );
        // container for all playlists
        this.$playlists = this.$el.find('.js-app-playlists');
        // dots for switching playlists
        this.$dots = this.$el.find('.js-playlist-selector');
        // create playlist view for each model in collection
        this.collection.each(this.playlistDraw);

        // insert bookmarklet
        this.$el.find('.b-input_bookmarklet').val(Scaple.bookmarklet);

        this.updateDots();

        return this;
    },

    /**
     * Combines template data and generates HTML
     */
    renderHTML: function() {
        // get playlists titles to draw dots
        var playlists = this.collection.pluck('title');

        return this.template({playlists: playlists});
    },

    /**
     * Visualize selection on dots
     */
    updateDots: function() {
        var selectedClass = 'b-playlist-selector__item_selected';

        // do we need to render new dots
        if (this.collection.length != this.$dots.length) {
            // generate new dots
            // TODO: use partitials
            var $root = $('<div/>').html( this.renderHTML() );

            this.$el
                .find('.js-playlist-selector-root')
                .replaceWith( $root.find('.js-playlist-selector-root') );

            // save new dots
            this.$dots = this.$el.find('.js-playlist-selector');
        }

        // update dots
        this.$dots.removeClass(selectedClass);
        this.$dots.eq(this.currentView).addClass(selectedClass);
    },

    /**
     * Creates view for playlist's model
     * and appends it to the DOM
     * @param {Backbone.Model} playlist
     */
    playlistDraw: function(playlist) {
        var $container = this.$el.find('.b-app__playlists');
        var view = new Scaple.views.Playlist({model: playlist});

        // save view to a collection
        this.views.push(view);

        // append view to dom
        $container.append( view.render().$el );

        // TODO: update dots
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

        // switch to new playlist
        this.playlistSelect(this.collection.length - 1);
    },

    /**
     * Finds which playlist need to show
     * @param {Event|Number} e
     */
    playlistSelect: function(e) {
        var index = typeof e == 'number' ? e : $.inArray(e.currentTarget, this.$dots.get());

        // already selected
        if (this.currentView == index) {
            return;
        }

        // slide playlists
        this.$playlists.css('margin-left', (-index * this.plWidth) + 'px');

        // update current playlist index
        this.currentView = index;

        this.updateDots();

        // close form if oppened
        this.playlistFormToggle(false);
    },

    /**
     * Show/hide playlist add form
     * @param {Event|Boolean}
     */
    playlistFormToggle: function(e) {
        this.$el.find('.js-playlist-form')
            // we can always pass e, because toggle reacts only on boolean
            .toggleClass('b-playlist-form_shown', e);
    }
});

