ROCKY_SOURCES=$(wildcard src/rocky/*.ts)
PKJS_SOURCES=$(wildcard src/pkjs/*.ts)

ifdef PEBBLE_PHONE
	PHONE_ARG=--phone ${PEBBLE_PHONE}
else
	PHONE_ARG=--phone 192.168.0.10
endif

TSC_OPTIONS=--module commonjs --moduleResolution Classic --target es5 --lib ES2015.Promise,DOM,ES5

.PHONY: build
build: build/watchface.pbw

.PHONY: simulate
simulate: build/watchface.pbw
	pebble install --logs --emulator basalt

.PHONY: install
install: build/watchface.pbw
	pebble install ${PHONE_ARG}

.PHONY: logs
logs:
	pebble logs ${PHONE_ARG}

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
