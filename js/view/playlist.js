Scaple.views.Playlist = Backbone.View.extend({

    events: {
        'click .b-track': 'ontrackclick'
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

        this.$search = this.$el.find('.b-input_search');

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
     * Adds track to model
     * @param {SCTrack} track
     */
    trackAdd: function(track) {
        // slice() makes model realy change
        var tracks = this.model.get('tracks').slice();
        tracks.push(track);
        this.model.set('tracks', tracks);
        this.model.save();
    }
});
