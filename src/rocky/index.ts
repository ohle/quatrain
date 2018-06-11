import rocky = require('rocky')

import geom = require('./geometry')

interface Complication {
    getDimension(ctx : RockyCanvasRenderingContext2D) : geom.Dimension;
    init(screenSize : geom.Dimension) : void;
    draw(ctx : RockyCanvasRenderingContext2D);
}

class DigitalTime implements Complication {
    location : geom.Point;
    font : Font;
    color : string;
    dim : geom.Dimension;
    textDimension : geom.Dimension;

    constructor(font : Font, color : string) {
        this.location = new geom.Point(0, 0);
        this.font = font;
        this.color = color;
    }

    init(dim: geom.Dimension) {
        this.location = new geom.Point(dim.width / 2, dim.height / 2);
    }

    getDimension(ctx: RockyCanvasRenderingContext2D) : geom.Dimension {
        if (this.textDimension) {
            return this.textDimension;
        }
        ctx.font = this.font;
        var metrics = ctx.measureText("88:88");
        this.textDimension = new geom.Dimension(metrics.width, metrics.height);
        return this.textDimension;
    }

    draw(ctx : RockyCanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textAlign = "center";
        // Date.toLocaleTimeString('en', {'hour': '2-digit', 'minute': '2-digit'}), 
        // seems not to like any of the locales I tried
        var d = new Date();
        ctx.fillText(
            this.pad(d.getHours()) + ":" + this.pad(d.getMinutes()),
            this.location.x, 
            this.location.y - this.getDimension(ctx).height / 2.0
        );
    }

    pad(x : number) : string {
        return (x < 10) ? "0" + x : "" + x;
    }
}

var complications: Complication[] = [
    new DigitalTime("26px bold Leco-numbers-am-pm", "white")
];

rocky.on("draw", (evt : rocky.DrawEvent) => {
    var ctx = evt.context;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    var dim = new geom.Dimension(ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    for (let complication of complications) {
        ctx.save();
        complication.init(dim);
        complication.draw(ctx);
        ctx.restore();
    }
});
