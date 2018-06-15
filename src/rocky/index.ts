import rocky = require('rocky')
import geom = require('./geometry')
import Complication from './watchface';
import DigitalTime from './digital-time';

var complications: Complication[] = [
    new DigitalTime("26px bold Leco-numbers-am-pm", "white")
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
        complication.draw(ctx);
        ctx.restore();
    }
});
