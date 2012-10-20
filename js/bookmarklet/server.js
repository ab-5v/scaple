// processing bookmarklet
(function(d) {
    var search = d.location.search.slice(1);
    var pairs = search.split('&');
    for (var i = 0; i < search.length; i++) {
        var parts = pairs[0].split('=');
        if (parts.shift() === 'tr') {
            if ('localStorage' in window) {
                var ls = window.localStorage;
                var tr = JSON.parse(ls.getItem('scaple-tr') || '[]');
                tr.push( decodeURIComponent(parts.join('=')) );
                ls.setItem('scaple-tr', JSON.stringify(tr));
            }
            // trigger unload to tell iframe "it's time to remove"
            window.onload();
            break;
        }
    }
})(document);
