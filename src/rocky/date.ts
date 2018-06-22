import geom = require('./geometry');
import Complication from './watchface';

export default class TodaysDate implements Complication<void> {
    private location : geom.Point;

    readonly color : string;

    private dow = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",  ];

    private mon = [ 
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" 
    ];

    constructor(color : string) {
        this.color = color;
    }

    init(dim : geom.Dimension) {
        this.location = new geom.Point(
            20,
            dim.height - 50
        );
    }


    draw(ctx : RockyCanvasRenderingContext2D) {
        ctx.font = "28px bold Gothic";
        ctx.fillStyle = this.color;
        ctx.textAlign = "left";
        let d = new Date();
        let pad = 2;
        let day = "" + d.getDate();
        ctx.fillText(day, this.location.x, this.location.y);
        let x = this.location.x + ctx.measureText(day).width + pad;
        ctx.font = "14px Gothic";
        ctx.fillText(this.dow[d.getDay()], x, this.location.y);
        ctx.fillText(this.mon[d.getMonth()], x, this.location.y + 15);
    }
}
