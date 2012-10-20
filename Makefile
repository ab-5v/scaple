NBIN=./node_modules/.bin

JSS:=$(shell find ./js -name '*.js')
TPLS:=$(shell find ./tpl -name '*.hbs')
STYLS:=$(shell find ./styl -name '*.styl')

all: node_modules static/app.js static/app.css

static/app.js: $(JSS) js/tpl/templates.hbs.js
	mkdir -p static
	$(NBIN)/requirer js/app.js static/app.js

static/app.css: $(STYLS)
	mkdir -p static
	$(NBIN)/stylus -I styl < styl/app.styl > static/app.css

js/tpl/templates.hbs.js: $(TPLS)
	mkdir -p js/tpl
	$(NBIN)/handlebars tpl/*.hbs -f js/tpl/templates.hbs.js -k each -m

node_modules:
	npm install

.PHONY: npm
