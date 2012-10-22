SC.initialize({
    client_id: "dc711fd85057d5d8d08ee680c218c184"
});

/**
 * Scaple player
 */
Scaple.player = $.extend(Scaple.Events, {

    /**
     * The Currently playing track
     * @type SM2Sound
     */
    current: null,

    /**
     * Link to the playing track JSON
     * @type SCTrack
     */
    track: null,

    /**
     * Plays the track
     * @param {SCTrack} track
     */
    play: function(track) {
        var that = this;

        this.stop();

        SC.stream(
            '/tracks/' + track.id,
            {
                onfinish: function() {
                    that.trigger('finish', {sound: this.current, track: this.track});
                }
            },
            function(sound) {
                that.track = track;
                that.current = sound;
                that.trigger('play', {sound: this.current, track: this.track});
                that.current.play();
            }
        );
    },

    /**
     * Pause current playing track
     */
    pause: function() {
        if (this.current) {
            this.trigger('pause', {sound: this.current, track: this.track});
            this.current.pause();
        }
    },

    /**
     * Stops currently playing track
     */
    stop: function() {
        if (this.current) {
            this.trigger('stop', {sound: this.current, track: this.track});
            this.current.stop();
            this.current = null;
        }
    }
});
