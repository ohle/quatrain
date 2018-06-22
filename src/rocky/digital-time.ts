import geom = require('./geometry');
import Complication from './watchface';

export default class DigitalTime implements Complication<void> {
    location : geom.Point;
    font : Font;
    color : string;
    dim : geom.Dimension;
    textDimension : geom.Dimension;

    constructor(font : Font, color : string) {
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
