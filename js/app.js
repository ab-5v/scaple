$(function() {

    // Models
    window.mPlaylist = Backbone.Model.extend({});

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
