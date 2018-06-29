///<reference path="./pebble.d.ts"/>
///<reference path="./lib/es6-promise.d.ts"/>

declare var Pebble : IPebble;
import secrets = require("./secrets");
declare var require : any;
require("./lib/es6-promise.min").polyfill();

function geoloc() : Promise<Position> {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition( (pos) => {
            resolve(pos);
        }, (err) => { 
            reject(err);
        }, {timeout: 15000, maximumAge: 60000})
    });
}

function request(url : string, reqType : "GET" | "POST") : Promise<string> {
    let xhr = new XMLHttpRequest();

    console.trace("Sending request for '" + url + "'");
    return new Promise( (resolve, reject) => {
        let callback = (e) => {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({ status : xhr.status, text : xhr.response });
            }
        };

        xhr.onload = callback;
        xhr.onerror = callback;
        xhr.open(reqType, url);
        xhr.send();
    });
}

function forecast() {
    let forecastUrlBase = "https://api.darksky.net/forecast/" + secrets.darkskyAPIKey + "/";

    return geoloc().then( (pos) => {
        let url = forecastUrlBase + pos.coords.latitude + "," + pos.coords.longitude 
            + "?lang=de&units=si";
        return request(url, "GET");
    });
}

var activeKeys : string[] = [];

Pebble.on("message", (e : PostMessageEvent) => {
    if (e.data.activeKeys) {
        activeKeys = e.data.activeKeys;
        console.log("active keys set to ", activeKeys);
    }
});

function sendData() {
}

sendData();
setInterval(sendData, 1000 * 60 * 15);

class Query {
    private lastResult : any = null;
    private sent = false;

    private readonly query : () => Promise<any>;

    constructor(query : () => Promise<any>) {
        this.query = query;
    }

    refresh() {
        this.query().then( (result: any) => {
            if (JSON.stringify(result) !== JSON.stringify(this.lastResult)) {
                this.lastResult = result;
                this.sent = false;
            }
        });
    }

    send() {
        if (this.sent) return null;
        return this.lastResult;
    }
}

interface Weather {
    currentTemp : number;
    maxTemp : number;
    minTemp : number'
}

// var queries : {
//     'weather' : forecast().
// }
