Scaple.views.Playlist = Backbone.View.extend({

    events: {
        'click .js-track-play': 'trackPlay',
        'click .js-track-pause': 'trackPause',
        'click .js-track-remove': 'trackRemove'
    },

    tagName: 'div',
    className: 'b-playlist',
    template: Scaple.T('b-playlist'),

    initialize: function() {
        _.bindAll(this, 'render', 'remove', 'trackAdd');

        this.model.on('change', this.render);
        this.model.on('destroy', this.remove);

        Scaple.player.on('finish', this.nextTrack, this);
    },


    render: function() {
        var that = this;
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        // cache link to all tracks
        this.$tracks = this.$el.find('.js-track');

        this.$form = this.$el.find('.js-playlist-form');
        this.$form.autoclose(function() {
            that.toggleForm(false);
        }, '.js-playlist-edit');

        return this;
    },

    /**
     * Switch to the next track,
     * when current one is finished
     */
    nextTrack: function(options) {
        var that = this;
        if (options.cid === this.cid && options.index < this.$tracks.length - 1) {
            this.trackPlay(options.index + 1);
        }
    },

    /**
     * Returns track data by event
     * @param {Event|Number} e
     */
    getTrackIndex: function(e) {
        // if already index
        if (typeof e === 'number') {
            return e;
        }
        var $track = $(e.target).closest('.js-track');
        // find index of clicked track
        return $.inArray( $track[0], this.$tracks.get() );
    },

    /**
     * Start playing track
     */
    trackPlay: function(e) {
        var index = this.getTrackIndex(e);

        // return track's JSON representation
        var track = this.model.toJSON().tracks[index];

        var options = Scaple.player.getOptions();
        if (options
            && options.id === track.id
            && options.cid === this.cid
            && options.index === index) {

            Scaple.player.resume();
        } else {
            Scaple.player.play({id: track.id, cid: this.cid, index: index});
        }

        // mark track as playing
        this.$tracks.eq(index)
            .removeClass('b-track_paused')
            .addClass('b-track_playing');

        // when another track starts playing
        // or this track finished
        Scaple.player.one('stop finish', function() {
            this.$tracks.eq(index)
                .removeClass('b-track_playing')
                .removeClass('b-track_paused');
        }, this);
    },

    /**
     * Pause track
     */
    trackPause: function(e) {
        var index = this.getTrackIndex(e);

        // pause playing
        Scaple.player.pause();

        // mark track as paused
        this.$tracks.eq(index)
            .removeClass('b-track_playing')
            .addClass('b-track_paused');
    },

    /**
     * Adds track to model
     * @param {SCTrack} track
     */
    trackAdd: function(track) {
        // save state before track add
        Scaple.History.push();

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
        // save state before track remove
        Scaple.History.push();

        var index = this.getTrackIndex(e);
        var tracks = this.model.get('tracks').slice();
        tracks.splice(index, 1);
        this.model.set('tracks', tracks);
        this.model.save();

        // stop player if it plays
        Scaple.player.stop();
    },

    /**
     * Show/hide playlist edit form
     * @param {Event|Boolean}
     */
    toggleForm: function(e) {
        this.$el.find('.js-playlist-form')
            .toggleClass('g-hidden', typeof e === 'boolean' ? !e : undefined);
    }
});
