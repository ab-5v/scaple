$(function() {

    // Models
    window.mPlaylist = Backbone.Model.extend({});

    // Collections
    window.mPlaylists = Backbone.Collection.extend({
        model: mPlaylist,
        url: "./test/mock/playlists.json"
    });

    // Views
    window.vPlaylist = Backbone.View.extend({

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
        }
    });

    window.vApp = Backbone.View.extend({

        tagName: 'div',
        className: 'b-app',
        template: _.template($("#app-template").html()),

        initialize: function() {
            _.bindAll(this, 'render');

            this.collection.bind('reset', this.render);
        },

        render: function() {
            this.$el.html( this.template({}) );
            // container for all playlists
            var $playlists = this.$el.find('.b-app__playlists');
            // create playlist view for each model in collection
            this.collection.each(function(playlist) {
                var view = new vPlaylist({model: playlist});
                $playlists.append( view.render().$el );
            });
            return this;
        }
    });

    // Router
    window.rApp = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        initialize: function() {
        },

        home: function() {
        }
    });

    // App init
    window.App = new rApp();
    Backbone.history.start({
        pushState: true
    });

});
