(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b["b-app.hbs"]=a(function(a,b,c,d,e){c=c||a.helpers;var f="";return f+='\n<div class="b-app__playlists"></div>\n<form class="b-playlist-form">\n    <label>Title <input name="title" type="text"/></label>\n    <label>Description <input name="description" type="text"/></label>\n    <input type="submit" value="Add"/>\n</form>\n<input class="b-input_bookmarklet" type="text"/>\n',f+="\n",f}),b["b-playlist.hbs"]=a(function(a,b,c,d,e){function l(a,b){var c="",d;return c+='\n    <li class="b-track">',d=a.title,d=typeof d===i?d():d,c+=j(d)+"</li>\n    ",c}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=this;f+='\n<form class="b-track-form">\n    <label>Search <input class="b-input b-input_search" name="search" type="search"/></label>\n</form>\n<span class="b-playlist__title">',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'</span>\n<span class="b-playlist__description">',h=c.description,h?g=h.call(b,{hash:{}}):(g=b.description,g=typeof g===i?g():g),f+=j(g)+'</span>\n<ol class="b-playlist__tracks">\n    ',g=b.tracks,g=c.each.call(b,g,{hash:{},inverse:k.noop,fn:k.program(1,l,e)});if(g||g===0)f+=g;return f+="\n</ol>\n",f+="\n",f})})()