(function(loc) {
    var str = "!function(d, iframe, id){\
        id = $('.player.large[data-sc-track]').attr('data-sc-track');\
        if (!id) { return; }\
        iframe = d.createElement('iframe');\
        d.body.appendChild(iframe);\
        iframe.src = '{URL}?tr=' + encodeURIComponent(id);\
        iframe.style = 'position: absolute; left: -9999px; top: -9999px;';\
        iframe.onload = function() {\
            d.body.removeChild(iframe);\
        }\
    }(document);"

    return 'javascript:' + str.replace(/\s/g, '').replace('{URL}', loc.origin + loc.pathname);
})(document.location);
