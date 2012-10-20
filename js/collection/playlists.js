Scaple.collections.Playlists = Backbone.Collection.extend({
    model: Scaple.models.Playlist,
    localStorage: new Backbone.LocalStorage('scaple-playlists')
});
