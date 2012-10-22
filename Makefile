NBIN=./node_modules/.bin

JSS:=$(shell find ./js -name '*.js')
TPLS:=$(shell find ./tpl -name '*.hbs')
STYLS:=$(shell find ./styl -name '*.styl')

all: node_modules static/app.js static/app.css static/server.js

static/app.js: $(JSS) js/tpl/templates.hbs.js
	mkdir -p static
	$(NBIN)/requirer js/app.js static/app.js

static/server.js: js/bookmarklet/server.js
	cp $< $@

static/app.css: $(STYLS)
	mkdir -p static
	$(NBIN)/stylus -I styl < styl/app.styl > static/app.css

js/tpl/templates.hbs.js: $(TPLS)
	mkdir -p js/tpl
	mkdir -p tmp
	cp tpl/* tmp
	# remove whitespace from templates
	find tmp -type f | xargs perl -p -i -e 's/\n//g'
	find tmp -type f | xargs perl -p -i -e 's/>\s*</></g'
	find tmp -type f | xargs perl -p -i -e 's/>\s*{/>{/g'
	find tmp -type f | xargs perl -p -i -e 's/}\s*</}</g'
	$(NBIN)/handlebars tmp/*.hbs -f js/tpl/templates.hbs.js -k each -m
	rm -rf tmp

node_modules:
	npm install

.PHONY: npm
