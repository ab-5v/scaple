Scaple.views.Playlist = Backbone.View.extend({

    events: {
        'click .b-track': 'ontrackclick',
        'click .js-track-remove': 'trackRemove'
    },

    tagName: 'div',
    className: 'b-playlist',
    template: Scaple.T('b-playlist'),

    initialize: function() {
        _.bindAll(this, 'render', 'remove', 'trackAdd');

        this.model.on('change', this.render);
        this.model.on('destroy', this.remove);
    },


    render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        // cache link to all tracks
        this.$tracks = this.$el.find('.js-track');

        return this;
    },

    /**
     * Returns track data by event
     * @param {Event} e
     */
    getTrackIndexByEvent: function(e) {
        var $track = $(e.target).closest('.js-track');
        // find index of clicked track
        return $.inArray( $track[0], this.$tracks.get() );
    },

    ontrackclick: function(e) {
        var index = this.getTrackIndexByEvent(e);

        // return track's JSON representation
        var track = this.model.toJSON().tracks[index];

        Scaple.player.play(track);
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
        this.model.save();
    },

    /**
     * Removes track
     * @param {Event} e
     */
    trackRemove: function(e) {
        var index = this.getTrackIndexByEvent(e);
        var tracks = this.model.get('tracks').slice();
        tracks.splice(index, 1);
        this.model.set('tracks', tracks);
        this.model.save();
    }
});
