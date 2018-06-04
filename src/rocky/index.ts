import rocky = require('rocky')

rocky.on("draw", (evt : rocky.DrawEvent) => {
    var ctx = evt.context;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("abc", 0, 0);
});
