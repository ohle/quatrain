import geom = require('./geometry');
import Complication from './watchface';

export interface WeatherData {
    currentTemp : number;
    maxTemp : number;
    minTemp : number;
}

export class Weather implements Complication<WeatherData> {

    private location : geom.Point;
    private color : string;

    private pad = 2;
    private vertPad = 15;

    private largeFont : Font = "28px bold Gothic";
    private smallFont : Font = "14px Gothic";

    constructor(color : string) {
        this.color = color;
    }

    init(dim: geom.Dimension) {
        this.location = new geom.Point(
            dim.width - 10,
            dim.height - 65
        );
    }

    draw(ctx : RockyCanvasRenderingContext2D, data : WeatherData) {
        ctx.font = this.largeFont;
        ctx.fillStyle = this.color;
        ctx.textAlign = "right";
        let currentTemp = this.format(data.currentTemp);
        ctx.fillText(currentTemp, this.location.x, this.location.y);
        let ctWidth = ctx.measureText(currentTemp);
        ctx.font = this.smallFont;
        let max = this.format(data.maxTemp);
        let min = this.format(data.minTemp);
        ctx.fillText(max, this.location.x - ctWidth.width - this.pad , this.location.y);
        ctx.fillText(min, this.location.x - ctWidth.width - this.pad , this.location.y + 15);
    }

    private format(temp : number) : string {
        return temp.toFixed(0) + "°";
    }
}
