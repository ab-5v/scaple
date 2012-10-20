
Scaple = {
    models: {},
    views: {},
    collections: {}
};

Scaple.bookmarklet = require('./bookmarklet/client.js');

// libs
require('./lib/handlebars/handlebars.runtime.js');
require('./tpl/templates.hbs.js');
Scaple.T = function(name) {
    return function(data) {
        return Handlebars.templates[name + '.hbs'](data || {});
    }
};

require('./lib/jquery-ui/jquery-ui-1.9.0.custom.js');

// components
require('./component/player.js');
require('./component/autocomplete-render.js');

// bones
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
