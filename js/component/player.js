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
     * Current oprions
     * @type SCTrack
     */
    options: null,

    /**
     * Options getter
     * @type Object
     */
    getOptions: function() {
        return this.options;
    },

    /**
     * Plays the track
     * @param {Object} options
     */
    play: function(options) {
        var that = this;

        this.stop();

        SC.stream(
            '/tracks/' + options.id,
            {
                onfinish: function() {
                    that.trigger('finish', that.getOptions());
                }
            },
            function(sound) {
                that.options = options;
                that.current = sound;
                that.trigger('play', that.getOptions());
                that.current.play();
            }
        );
    },

    resume: function() {
        if (this.current) {
            this.trigger('resume', this.getOptions());
            this.current.resume();
        }
    },

    /**
     * Pause current playing track
     */
    pause: function() {
        if (this.current) {
            this.trigger('pause', this.getOptions());
            this.current.pause();
        }
    },

    /**
     * Stops currently playing track
     */
    stop: function() {
        if (this.current) {
            this.trigger('stop', this.getOptions());
            this.current.stop();
            this.current = null;
        }
    }
});
