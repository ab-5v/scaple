Scaple.Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },

    initialize: function() {
        this.$root = $('#app');

        this.playlists = new Scaple.collections.Playlists();
        this.playlists.fetch();

        // add default playlist
        if (!this.playlists.models.length) {
            this.playlists.add( new Scaple.models.Playlist() );
            this.playlists.at(0).save();
        }

        this.app = new Scaple.views.App({
            collection: this.playlists
        });

        if ('localStorage' in window) {
            this.initLocalStorage();
        }
    },

    home: function() {
        this.$root.empty();
        this.$root.append(this.app.render().$el);
    },

    initLocalStorage: function() {
        var that = this;
        $(window).on('storage', function(e){
            that.loadLocalStorage();
        });

        this.loadLocalStorage();
    },

    loadLocalStorage: function() {
        var that = this;
        // search for track ids in localStorage
        var tracks = localStorage.getItem('scaple-tr');
        if (tracks) {
            tracks = JSON.parse(tracks);
            // get tracks by id from SC
            SC.get('/tracks', {ids: tracks.join(',')}, function(tracks) {
                // TODO: find active model
                // add found tracks to model
                var activeModel = that.playlists.models[0];
                var current = activeModel.get('tracks');
                tracks = current.concat(tracks);
                activeModel.set('tracks', tracks);
                activeModel.save();
                // clear found track localStorage
                localStorage.removeItem('scaple-tr');
            })
        }
    }
});
