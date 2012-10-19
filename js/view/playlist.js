Scaple.views.Playlist = Backbone.View.extend({

    events: {
        'click .b-track': 'ontrackclick'
    },

    tagName: 'div',
    className: 'b-playlist',
    template: _.template($("#playlist-template").html()),

    initialize: function() {
        _.bindAll(this, 'render');
    },


    render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
    },

    ontrackclick: function(e) {
        var target = e.currentTarget;

        // find index of clicked track
        var index = $.inArray(target, this.$el.find('.b-track').get());
        // find track's JSON representation
        var track = this.model.toJSON().tracks[index];

        Scaple.player.play(track);

    }
});
