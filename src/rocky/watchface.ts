import rocky = require('rocky')
import geom = require('./geometry')

export default interface Complication {
    getDimension(ctx : RockyCanvasRenderingContext2D) : geom.Dimension;
    init(screenSize : geom.Dimension) : void;
    draw(ctx : RockyCanvasRenderingContext2D);
}

