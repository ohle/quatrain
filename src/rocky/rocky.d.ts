declare module "rocky" {

    export type EventType = "draw" | "secondchange" | "minutechange" | "hourchange" |
        "daychange" | "memorypressure" | "message" | "postemessageconnected" | 
        "postmessagedisconnected" | "postmessageerror";

    /**
     * Provides information about the currently connected Pebble smartwatch.
     */
    export interface WatchInfo {
        model : string; 
        platform : string;
        language : any;
        firmware : {
            major : number;
            minor : number;
            patch : number;
            suffix : string;
        }
    }

    /**
     * Provides access to user related settings from the currently connected
     * Pebble smartwatch. The size itself will vary between platforms, see the
     * ContentSize guide for more information.
     */
    export interface UserPreferences {
        contentSize : "small" | "medium" | "large" | "x-large";
    }

    /**
     * Sends a message to the mobile companion component. Please be aware that
     * messages should be kept concise. Each message is queued, so postMessage()
     * can be called multiple times immediately. If there is a momentary loss of
     * connectivity, queued messages may still be delivered, or automatically
     * removed from the queue after a few seconds of failed connectivity. Any
     * transmission failures, or out of memory errors will be raised via the
     * postmessageerror event.
     *
     * rocky.postMessage({cmd: 'fetch'});
     * @param data
     *     An object containing the data to deliver to the mobile device. This
     *     will be received in the data field of the event delivered to the
     *     on('message', ...) handler.
     *
     */
    export function postMessage(data : Object);

    /**
     * Flags the canvas (display) as requiring a redraw. Invoking this method
     * will cause the draw event to be emitted. Only 1 draw event will occur,
     * regardless of how many times the redraw is requested before the next draw
     * event.
     *
     * rocky.on('secondchange', function(e) {
     *   rocky.requestDraw();
     *   });
     */
    export function requestDraw();

    export var watchInfo : WatchInfo;
    export var userPreferences : UserPreferences;

    export interface Event {
        type : EventType;
    }

    export interface MessageEvent {
        type : EventType;
        data : Object;
    }

    export interface MemoryPressureEvent {
        level : "high" | "normal" | "low";
    }

    export interface TickEvent {
        date : Date;
    }

    export interface DrawEvent {
        context : RockyCanvasRenderingContext2D;
    }

    export function on(type : "message" | "postmessageerror" , callback: (MessageEvent) => void);
    export function on(type : "postmessageconnected" , callback: (Event) => void);
    export function on(type : "postmessagedisconnected" , callback: (Event) => void);
    export function on(type : "memorypressure", callback: (MemoryPressureEvent) => void);
    export function on(type : "draw", callback: (DrawEvent) => void);
    export function on(type : "secondchange" | "minutechange" | "hourchange" | "daychange", callback : (TickEvent) => void);

    export function off(type : "message" | "postmessageerror" , callback: (MessageEvent) => void);
    export function off(type : "postmessageconnected" , callback: (Event) => void);
    export function off(type : "postmessagedisconnected" , callback: (Event) => void);
    export function off(type : "memorypressure", callback: (MemoryPressureEvent) => void);
    export function off(type : "draw", callback: (RockyCanvasRenderingContext2D) => void);
    export function off(type : "secondchange" | "minutechange" | "hourchange" | "daychange", callback : (TickEvent) => void);
}

declare interface RockyCanvasRenderingContext2D {
    /**
     * Sets all pixels in the rectangle at (x,y) with size (width, height) to
     * black, erasing any previously drawn content.
     */
    clearRect : (x : number, y : number, width : number, height : number) => void;

    /**
     * Draws a filled rectangle at (x,y) with size (width, height), using the
     * current fill style.
     */
    fillRect : (x : number, y : number, width : number, height : number) => void;

    /**
     * Paints a rectangle at (x,y) with size (width, height), using the current
     * stroke style.
     */
    strokeRect : (x : number, y : number, width : number, height : number) => void;

    /**
     * Draws (fills) text at the given (x,y) position.
     *
     * @param maxWidth : (Optional) Maximum width to draw. If specified, and the
     * string is wider than the width, the font is adjusted to use a smaller
     * font.
     */
    fillText : (text : string, x : number, y : number, maxWidth? : number) => void;

    /**
     * Returns a TextMetrics object containing information about text.
     */
    measureText : (text : string) => TextMetrics;

    /**
     *Starts a new path by emptying the list of sub-paths. Call this method when
     * you want to create a new path.
     */
    beginPath : () => void;

    /**
     * Causes the point of the pen to move back to the start of the current
     * sub-path. It tries to add a straight line (but does not actually draw it)
     * from the current point to the start. If the shape has already been closed
     * or has only one point, this function does nothing.
     */
    closePath : () => void;

    /**
     * Moves the starting point of a new sub-path to the (x,y) coordinates.
     */
    moveTo : (x : number, y : number) => void;

    /**
     * Connects the last point of the sub-path to the (x,y) coordinates with a
     * straight line.
     */
    lineTo : (x : number, y : number) => void;

    /**
     * Adds an arc to the path which is centered at (x,y) position with radius r
     * starting at startAngle and ending at endAngle going in the direction
     * determined by the anticlockwise parameter (defaulting to clockwise).
     * If startAngle > endAngle nothing will be drawn, and if the difference between
     * startAngle and endAngle exceeds 2π, a full circle will be drawn.
     */
    arc : (x : number, y : number, r : number, startAngle : number, endAngle : number, anticlockwise? : boolean) => void;


    /**
     * Creates a path for a rectangle at position (x,y) with a size that is
     * determined by width and height. Those four points are connected by straight
     * lines and the sub-path is marked as closed, so that you can fill or stroke
     * this rectangle.
     */
    rect : (x : number, y : number, width : number, height : number) => void;

    /**
     * Fills the current path with the current fillStyle.
     */
    fill : () => void;

    /**
     * Strokes the current path with the current strokeStyle.
     */
    stroke : () => void;

    /**
     * Saves the entire state of the canvas by pushing the current state onto a
     * stack.
     */
    save : () => void;

    /**
     * Restores the most recently saved canvas state by popping the top entry in
     * the drawing state stack. If there is no saved state, this method does
     * nothing.
     */
    restore : () => void;

    /**
     * Fills a circle clockwise between startAngle and endAngle where 0 is the
     * start of the circle beginning at the 3 o'clock position on a watchface.
     *
     * If startAngle > endAngle nothing will be drawn, and if the difference
     * between startAngle and endAngle exceeds 2π, a full circle will be drawn.
     */
    rockyFillRadial : (x : number, y : number, innerRadius : number, outerRadius : number, startAngle : number, endAngle : number) => void;

    /**
     * Specifies the color to use inside shapes. The default is #000 (black).
     *
     *  Possible values:
     *
     *   - Most (but not all) CSS color names. e.g. blanchedalmond
     *   - Pebble color names. e.g. shockingpink
     *   - Hex color codes, short and long. e.g. #FFFFFF or #FFF
     * 
     * Please note that we currently only support solid colors. You may specifiy
     * transparent or clear for transparency, but we do do not support partial
     * transparency or the #RRGGBBAA notation yet.
     */
    fillStyle : string;

    /**
     * Specifies the color to use for lines around shapes. The default is #000 (black).
     *
     *  Possible values:
     *
     *   - Most (but not all) CSS color names. e.g. blanchedalmond
     *   - Pebble color names. e.g. shockingpink
     *   - Hex color codes, short and long. e.g. #FFFFFF or #FFF
     * 
     * Please note that we currently only support solid colors. You may specifiy
     * transparent or clear for transparency, but we do do not support partial
     * transparency or the #RRGGBBAA notation yet.
     */
    strokeStyle : string;

    /**
     * A Canvas object containing information about the system's canvas
     * (display).
     */
    canvas : Canvas;

    /**
     * The width of lines drawn (to the nearest integer) with the context (1.0
     * by default).
     */
    lineWidth : number;

    /**
     * Specifies the current text style being used when drawing text. Although
     * this string uses the same syntax as a CSS font specifier, you cannot
     * specifiy arbitrary values and you must only use one of the values below.
     *
     * The default font is 14px bold Gothic.
     */
    font : Font;

    /**
     * Specifies the current text alignment being used when drawing text. Beware
     * that the alignment is based on the x-axis coordinate value of the
     * CanvasRenderingContext2D.fillText method.
     */
    textAlign : TextAlign;
}

declare interface TextMetrics {
    readonly width : number;
    readonly height : number;
}

declare interface Canvas {
    /**
     * The full width of the canvas.
     */
    readonly clientWidth : number;

    /**
     * The full width of the canvas.
     */
    readonly clientHeight : number;

    /**
     * The width of the canvas that is not obstructed by system overlays
     * (Timeline Quick View).
     */
    readonly unobstructedWidth : number;

    /**
     * The height of the canvas that is not obstructed by system overlays
     * (Timeline Quick View).
     */
    readonly unobstructedHeight : number;
}

declare type Font = "18px bold Gothic" | "14px Gothic" | "14px bold Gothic" | 
    "18px Gothic" | "24px Gothic" | "24px bold Gothic" | "28px Gothic" | 
    "28px bold Gothic" | "30px bolder Bitham" | "42px bold Bitham" | 
    "42px light Bitham" | "42px Bitham-numeric" | "34px Bitham-numeric" | 
    "21px Roboto" | "49px Roboto-subset" | "28px bold Droid-serif" | 
    "20px bold Leco-numbers" | "26px bold Leco-numbers-am-pm" | 
    "32px bold numbers Leco-numbers" | "36px bold numbers Leco-numbers" | 
    "38px bold numbers Leco-numbers" | "42px bold numbers Leco-numbers" | 
    "28px light numbers Leco-numbers";

declare type TextAlign = "left" | "right" | "center" | "start" | "end";
