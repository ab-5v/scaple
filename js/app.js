$(function() {

    // Models
    window.mPlaylist = Backbone.Model.extend({});

    // Views
    window.vPlaylist = Backbone.View.extend({

        initialize: function() {
        },

        render: function() {
            return this;
        }
    });

    window.vApp = Backbone.View.extend({

        initialize: function() {
        },

        render: function() {
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
