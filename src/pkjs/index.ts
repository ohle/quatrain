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

// forecast().then( (res) => { 
//     console.log(JSON.stringify(JSON.parse(res), null, 2));
// });
