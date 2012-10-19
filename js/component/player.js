SC.initialize({
    client_id: "dc711fd85057d5d8d08ee680c218c184"
});

/**
 * Scaple player
 */
Scaple.player = {

    /**
     * The Currently playing track
     * @type SM2Sound
     */
    current: null,

    /**
     * Plays the track
     * @param {SCTrack} track
     */
    play: function(track) {
        var that = this;

        this.stop();

        SC.stream('/tracks/' + track.id, function(sound){
            that.current = sound;
            that.current.play();
        });
    },

    /**
     * Stops currently playing track
     */
    stop: function() {
        if (this.current) {
            this.current.stop();
            this.current = null;
        }
    }
};
