import rocky = require('rocky')
import geom = require('./geometry')
import Complication from './watchface';
import DigitalTime from './digital-time';
import TodaysDate from './date';
import FontDemo from './fontdemo';
import { Weather, WeatherData } from './weather';
import WeatherDescription from "./weather-description";

var complications: Complication<any>[] = [
    new DigitalTime("26px bold Leco-numbers-am-pm", "white"),
    // new DigitalTime("49px Roboto-subset", "white"),
    new TodaysDate("#aaa"),
    new Weather("#aaa"),
    new WeatherDescription("#aaa"),
    // new FontDemo()
];

var activeKeys = complications.filter(c => c.phoneMessageKey).map(c => c.phoneMessageKey);

var initialized = false;

var initialize = (ctx : RockyCanvasRenderingContext2D) => {
    var dim = new geom.Dimension(ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    complications.forEach(c => c.init(dim));
    initialized = true;
}

var currentData : { [key : string] : any; } = {};

rocky.on("draw", (evt : rocky.DrawEvent) => {
    var ctx = evt.context;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    initialize(ctx);
    for (let complication of complications) {
        ctx.save();
        let data = complication.phoneMessageKey ? currentData[complication.phoneMessageKey] : undefined;
        if (data || !complication.phoneMessageKey) {
            complication.draw(ctx, data);
        }
        ctx.restore();
    }
});

rocky.on("minutechange", (evt : rocky.TickEvent) => {
    rocky.requestDraw();
});

rocky.postMessage({'activeKeys': activeKeys});

rocky.on("message", (evt : MessageEvent) => {
    let data: { [id: string] : any; } = evt.data;
    let needsRefresh = false;
    Object.keys(data).forEach( (key) => {
        currentData[key] = data[key];
        needsRefresh = true;
    });
    if (needsRefresh) {
        rocky.requestDraw();
    }
});
