// processing bookmarklet
(function(d) {
    var match = document.location.search.match(/tr=([^&]+)/);
    // TODO: load in frame check, some SOP problems
    if (match && 'localStorage' in window) {
        var url = decodeURIComponent(match[1]);
        // current localstorage state
        var current = localStorage.getItem('scaple-tr') || '[]';
        // don't add duplicates
        if (current.indexOf('"' + url + '"') === -1) {
            current = JSON.parse(current);
            current.push(url);
            localStorage.setItem('scaple-tr', JSON.stringify(current));
        }

        // prevent from executing other scripts
        document.write('</head></html><!--');
    }
})(document);
