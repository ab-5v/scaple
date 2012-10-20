NBIN=./node_modules/.bin

all: js styl

js: tpl
	mkdir -p static
	$(NBIN)/requirer js/app.js static/app.js

styl:
	$(NBIN)/stylus -I styl < styl/app.styl > static/app.css

tpl:
	mkdir -p js/tpl
	$(NBIN)/handlebars tpl/*.hbs -f js/tpl/templates.hbs.js -k each -m

.PHONY: tpl js styl
