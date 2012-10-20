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
            localStorage.setItem('scape-tr', JSON.stringify(current));
        }
        // trigger onload to tell iframe "it's time to remove"
        // TODO: better way to trigget onload
        window.onload();
    }
})(document);
