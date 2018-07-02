///<reference path="./pebble.d.ts"/>
///<reference path="./lib/es6-promise.d.ts"/>

declare var Pebble : IPebble;

import * as q from './queries';

var activeKeys : string[] = [];

var interval : number;

Pebble.on("message", (e : PostMessageEvent) => {
    if (e.data.activeKeys) {
        activeKeys = e.data.activeKeys;
        q.sendQueries(activeKeys);
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => q.sendQueries(activeKeys), 1000 * 60 * 15);
    }
});
