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

var testData = {
    weather: {currentTemp: 20, maxTemp: 30.0, minTemp: -10},
    weatherDescription : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

rocky.on("draw", (evt : rocky.DrawEvent) => {
    var ctx = evt.context;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    initialize(ctx);
    for (let complication of complications) {
        ctx.save();
        let data = complication.phoneMessageKey ? testData[complication.phoneMessageKey] : undefined;
        complication.draw(ctx, data);
        ctx.restore();
    }
});

rocky.on("minutechange", (evt : rocky.TickEvent) => {
    rocky.requestDraw();
});

rocky.postMessage({'activeKeys': activeKeys});
