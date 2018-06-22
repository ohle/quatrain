import rocky = require('rocky')
import geom = require('./geometry')
import Complication from './watchface';
import DigitalTime from './digital-time';
import TodaysDate from './date';
import FontDemo from './fontdemo';
import { Weather, WeatherData } from './weather';

var complications: Complication<any>[] = [
    new DigitalTime("26px bold Leco-numbers-am-pm", "white"),
    new TodaysDate("#aaa"),
    new Weather("#aaa"),
    // new FontDemo()
];

var initialized = false;

var initialize = (ctx : RockyCanvasRenderingContext2D) => {
    var dim = new geom.Dimension(ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    complications.forEach(c => c.init(dim));
    initialized = true;
}

rocky.on("draw", (evt : rocky.DrawEvent) => {
    var ctx = evt.context;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    initialize(ctx);
    for (let complication of complications) {
        ctx.save();
        complication.draw(ctx, {currentTemp: 20, maxTemp: 30.0, minTemp: -10});
        ctx.restore();
    }
});
