import rocky = require('rocky')
import geom = require('./geometry')

export default interface Complication {
    init(screenSize : geom.Dimension) : void;
    draw(ctx : RockyCanvasRenderingContext2D);
}

