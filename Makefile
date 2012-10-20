NBIN=./node_modules/.bin

all: js styl

js:
	mkdir -p static
	$(NBIN)/requirer js/app.js static/app.js

styl:
	$(NBIN)/stylus -I styl < styl/app.styl > static/app.css

.PHONY: js styl
