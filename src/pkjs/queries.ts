///<reference path="./lib/es6-promise.d.ts"/>
import secrets = require("./secrets");
import * as req from './requests'

declare var require : any;
declare var Pebble : IPebble;
require("./lib/es6-promise.min").polyfill();

function forecast() {
    let forecastUrlBase = "https://api.darksky.net/forecast/" + secrets.darkskyAPIKey + "/";

    return req.geoloc().then( (pos) => {
        let url = forecastUrlBase + pos.coords.latitude + "," + pos.coords.longitude 
            + "?lang=de&units=si";
        return req.get(url).then( (response) => {
            return JSON.parse(response);
        });
    });
}

export class Query<SOURCE, RESULT> {
    private lastResult : RESULT = null;
    readonly dataKey : string;

    private readonly query : (sourceData : SOURCE) => Promise<RESULT>;

    constructor(dataKey : string, query : (sourceData : SOURCE) => Promise<any>) {
        this.query = query;
        this.dataKey = dataKey;
    }

    refresh(sourceData : SOURCE) {
        this.query(sourceData).then( (result: any) => {
            console.log(this.dataKey + ": processing...");
            if (JSON.stringify(result) !== JSON.stringify(this.lastResult)) {
                console.log("fresh data!");
                this.lastResult = result;
                this.sendData()
            }
        });
    }

    getData() {
        return this.lastResult;
    }

    private sendData() {
        let message = {};
        message[this.dataKey] = this.lastResult;
        console.info("sending " + JSON.stringify(message, null, 2));
        Pebble.postMessage(message);
    }
}

let queries = [
    new Query(
        'weather',
        (forecastData : Promise<any>) => {
            return forecastData.then( (data) => {
                return {
                    currentTemp : data.currently.temperature,
                    maxTemp : data.daily.data[0].temperatureHigh,
                    minTemp : data.daily.data[0].temperatureLow
                };
            });
        }
    ),
    new Query(
        'weatherDescription',
        (forecastData : Promise<any>) => {
            return forecastData.then( (data) => {
                return data.daily.summary
            });
        }
    )
];

export function sendQueries(activeKeys : string[]) {
    let forecastData = forecast();
    let sourceData  = {
        'weather' : forecastData,
        'weatherDescription' : forecastData
    };
    for (let query of queries) {
        if (activeKeys.indexOf(query.dataKey) > -1) {
            query.refresh(sourceData[query.dataKey])
        }
    }
}
