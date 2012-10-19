Scaple = {
    models: {},
    views: {},
    collections: {}
};

require('./component/player.js')

require('./model/playlist.js');
require('./view/playlist.js');
require('./view/app.js');
require('./collection/playlists.js');

require('./router.js');


$(function() {

    // App init
    Scaple.router = new Scaple.Router();
    Backbone.history.start();

});
