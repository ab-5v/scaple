Scaple.Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },

    initialize: function() {
        this.$root = $('#app');
        this.playlists = new Scaple.collections.Playlists();
        this.app = new Scaple.views.App({
            collection: this.playlists
        });
        this.playlists.fetch();
    },

    home: function() {
        this.$root.empty();
        this.$root.append(this.app.render().$el);
    }
});
