.PHONY: install-and-build
install-and-build: node_modules dist-build

.PHONY: dist-build
dist-build: dist/plectrum.css dist/plectrum.min.css

.PHONY: clean
clean:
	rm -rf build dist

.PHONY: lint
lint: node_modules
	node_modules/.bin/sass-lint -v

dist/plectrum.css: build/plectrum.css dist
	cp $< $@
	cp $<.map $@.map

dist/plectrum.min.css: build/plectrum.min.css dist
	cp $< $@
	cp $<.map $@.map

build/index.css: src/index.scss build
	node_modules/.bin/node-sass --output build --source-map true --source-map-contents $<

build/plectrum.css: build/index.css
	node_modules/.bin/postcss --use autoprefixer -b 'last 2 versions' --map --output $@ $<

build/plectrum.min.css: build/plectrum.css
	node_modules/.bin/postcss --use cssnano --map --output $@ $<

build:
	mkdir -p $@

dist:
	mkdir -p $@

node_modules: yarn.lock
	yarn install
	@touch $@

yarn.lock: package.json
	yarn check --integrity || yarn upgrade
	@touch $@
