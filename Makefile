all:
	mkdir -p static
	./node_modules/.bin/requirer js/app.js static/app.js
