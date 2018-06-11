ROCKY_SOURCES=$(wildcard src/rocky/*.ts)
PKJS_SOURCES=$(wildcard src/pkjs/*.ts)

TSC_OPTIONS=--module commonjs --moduleResolution Classic

build: build/watchface.pbw

simulate: build/watchface.pbw
	pebble install --logs --emulator basalt

build/watchface.pbw: src/rocky/index.js src/pkjs/index.js
	pebble build

src/rocky/index.js: ${ROCKY_SOURCES}
	tsc ${TSC_OPTIONS}

src/pkjs/index.js: ${PKJS_SOURCES}
	tsc ${TSC_OPTIONS}

.PHONY: clean
clean:
	rm $(wildcard src/rocky/*.js)
	rm $(wildcard src/pkjs/*.js)
	rm -rf build/
