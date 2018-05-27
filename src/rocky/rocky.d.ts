declare module "rocky" {

    export type EventType = "draw" | "secondchange" | "minutechange" | "hourchange" |
        "daychange" | "memorypressure" | "message" | "postemessageconnected" | 
        "postmessagedisconnected" | "postmessageerror";

    export type Callback = any; // TODO

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

    export function postMessage(data : Object);

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

    export function on(type : "message" | "postmessageerror" , callback: (MessageEvent) => void);
    export function on(type : "postmessageconnected" , callback: (Event) => void);
    export function on(type : "postmessagedisconnected" , callback: (Event) => void);
    export function on(type : "memorypressure", callback: (MemoryPressureEvent) => void);
    export function on(type : "draw", callback: (CanvasRenderingContext2D) => void); // TODO: rocky's special CanvasRenderingContext2D
    export function on(type : "secondchange" | "minutechange" | "hourchange" | "daychange", callback : (TickEvent) => void);

    export function off(type : "message" | "postmessageerror" , callback: (MessageEvent) => void);
    export function off(type : "postmessageconnected" , callback: (Event) => void);
    export function off(type : "postmessagedisconnected" , callback: (Event) => void);
    export function off(type : "memorypressure", callback: (MemoryPressureEvent) => void);
    export function off(type : "draw", callback: (CanvasRenderingContext2D) => void); // TODO: rocky's special CanvasRenderingContext2D
    export function off(type : "secondchange" | "minutechange" | "hourchange" | "daychange", callback : (TickEvent) => void);
}
