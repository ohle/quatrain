import geom = require('./geometry');
import rocky = require('rocky')
import Complication from './watchface';

var fonts : Font[] = [ 
    "18px bold Gothic",
    "14px Gothic",
    "14px bold Gothic",
    "18px Gothic",
    "24px Gothic",
    "24px bold Gothic",
    "28px Gothic",
    "28px bold Gothic",
    "30px bolder Bitham",
    "42px bold Bitham",
    "42px light Bitham",
    "42px Bitham-numeric",
    "34px Bitham-numeric",
    "21px Roboto",
    "49px Roboto-subset",
    "28px bold Droid-serif",
    "20px bold Leco-numbers",
    "26px bold Leco-numbers-am-pm",
    "32px bold numbers Leco-numbers",
    "36px bold numbers Leco-numbers",
    "38px bold numbers Leco-numbers",
    "42px bold numbers Leco-numbers",
    "28px light numbers Leco-numbers"
];

export default class FontDemo implements Complication {
    init (dim: geom.Dimension) {
        rocky.on("secondchange", (e) => { rocky.requestDraw() });
    }

    index = 0;

    draw(ctx : RockyCanvasRenderingContext2D) {
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        let font = fonts[this.index];
        ctx.font = font;
        ctx.fillText(font, 10, 50);
        this.index = (this.index +  1) % fonts.length;
    }
}
