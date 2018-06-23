import geom = require('./geometry');
import Complication from './watchface';

export default class WeatherDescription implements Complication<string> {

    private color : string;
    private font : Font = "14px Gothic";

    private location : geom.Point;
    private maxWidth : number;
    private lineHeight = 14;

    constructor(color : string) {
        this.color = color;
    }

    init(dim : geom.Dimension) {
        this.location = new geom.Point(dim.width / 2.0, dim.height - 35);
        this.maxWidth = dim.width;
    }

    phoneMessageKey = "weatherDescription";

    draw(ctx : RockyCanvasRenderingContext2D, data : string) {
        let lines = this.breakIntoLines(data, this.maxWidth, ctx, 2);
        ctx.textAlign = "center";
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        let y = this.location.y;
        for (let line of lines) {
            ctx.fillText(line, this.location.x, y);
            y += this.lineHeight;
        }
    }

    private breakIntoLines(
        text : string, maxWidth : number, 
        ctx : RockyCanvasRenderingContext2D, maxLines? : number
        ) : string[] 
    {
        let words = text.split(/\s/);
        if (!maxLines) maxLines = Infinity;

        let current = "";
        let lines : string[] = [];
        let currentWidth = 0;
        let spaceWidth = ctx.measureText(" ").width;
        for (let word of words) {
            let w = ctx.measureText(word).width;
            if (currentWidth + spaceWidth + w <= maxWidth) {
                current = current + " " + word;
                currentWidth += spaceWidth + w;
            } else {
                lines.push(current);
                if (lines.length >= maxLines) {
                    let lastLine = lines.pop();
                    lines.push(lastLine.replace(/.$/, "…"));
                    return lines;
                }
                current = word;
                currentWidth = w;
            }
        }
        lines.push(current);

        return lines;
    }
}
