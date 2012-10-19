Scaple.views.Playlist = Backbone.View.extend({

    events: {
        'click .b-track': 'ontrackclick'
    },

    tagName: 'div',
    className: 'b-playlist',
    template: _.template($("#playlist-template").html()),

    initialize: function() {
        _.bindAll(this, 'render', 'trackAdd', 'ontracksearch', 'ontrackselected');

        this.model.on('change', this.render);
    },


    render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);

        this.$search = this.$el.find('.b-input_search');

        // bind autocomplete for search input
        this.$search.autocomplete({ source: this.ontracksearch })
        .on('autocompleteselect', this.ontrackselected);

        return this;
    },

    ontrackclick: function(e) {
        var target = e.currentTarget;

        // find index of clicked track
        var index = $.inArray(target, this.$el.find('.b-track').get());
        // find track's JSON representation
        var track = this.model.toJSON().tracks[index];

        Scaple.player.play(track);

    },

    /**
     * Handles user input in search field
     * @see http://api.jqueryui.com/autocomplete/#option-source
     * and sends requests to SC
     * @see http://developers.soundcloud.com/docs#search
     * @param {Object} request
     * @param {Function} response
     */
    ontracksearch: function(request, response) {
        SC.get('/tracks', { q: request.term, limit: 10 }, function(tracks) {
            response(tracks);
        });
    },

    /**
     * Invokes, when user selects value from autocomplet
     * @param {Event} e
     * @param {Object} data
     */
    ontrackselected: function(e, data) {
        var that = this;
        // clear search input
        setTimeout(function() {
            that.$search.val('');
        }, 1);
        this.trackAdd(data.item);
    },

    /**
     * Adds track to model
     * @param {SCTrack} track
     */
    trackAdd: function(track) {
        // slice() makes model realy change
        var tracks = this.model.get('tracks').slice();
        tracks.push(track);
        this.model.set('tracks', tracks);
    }
});
