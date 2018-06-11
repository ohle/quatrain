ROCKY_SOURCES=$(wildcard src/rocky/*.ts)
PKJS_SOURCES=$(wildcard src/pkjs/*.ts)

build: build/watchface.pbw

simulate: build/watchface.pbw
	pebble install --logs --emulator basalt

build/watchface.pbw: src/rocky/index.js src/pkjs/index.js
	pebble build

src/rocky/index.js: ${ROCKY_SOURCES}
	tsc

src/pkjs/index.js: ${PKJS_SOURCES}
	tsc
