export class Point {
    constructor(x : number, y: number) {
        this.x = x;
        this.y = y;
    }
    x : number;
    y : number;

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}

export class Dimension {
    constructor(w : number, h: number) {
        this.width = w;
        this.height = h;
    }
    width : number;
    height : number;

    toString() {
        return this.width + "×" + this.height;
    }
}
