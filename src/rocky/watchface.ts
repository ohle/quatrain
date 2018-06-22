import rocky = require('rocky')
import geom = require('./geometry')

export default interface Complication<PHONEMESSAGE> {
    init(screenSize : geom.Dimension) : void;
    draw(ctx : RockyCanvasRenderingContext2D, data? : PHONEMESSAGE);
    phoneMessageKey? : string;
}

