NBIN=./node_modules/.bin

all: js

js: tpl
	mkdir -p static
	$(NBIN)/requirer js/app.js static/app.js

tpl:
	$(NBIN)/handlebars tpl/*.handlebars -f js/tpl/templates.hbs.js -k each -m

.PHONY: tpl js
