var canvas,
    ctx,
    source,
    context,
    analyser,
    fbc_array,
    bar_count,
    bar_pos,
    bar_width,
    bar_height;

var audio = document.querySelector("#audio_player")


window.addEventListener(
    "load",
    function() {
        

        document.getElementById("audio_player").onplay = function() {
            if (typeof(context) === "undefined") {
                context = new AudioContext();
                analyser = context.createAnalyser();
                canvas = document.getElementById("canvas");
                ctx = canvas.getContext("2d");
                source = context.createMediaElementSource(audio);

                canvas.width = window.innerWidth * 0.80;
                canvas.height = window.innerHeight * 0.60;

                source.connect(analyser);
                analyser.connect(context.destination);
            }
            
            FrameLooper();
        };
    },
    false
);

function FrameLooper() {
    window.RequestAnimationFrame =
        window.requestAnimationFrame(FrameLooper) ||
        window.msRequestAnimationFrame(FrameLooper) ||
        window.mozRequestAnimationFrame(FrameLooper) ||
        window.webkitRequestAnimationFrame(FrameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    bar_count = window.innerWidth / 2;

    analyser.getByteFrequencyData(fbc_array);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";

    
    ctx.beginPath();
    for (var i = 0; i < bar_count; i++) {
        bar_pos = i * 16;
        bar_width = 2;
        bar_height = (fbc_array[i] / 2);

        
        ctx.ellipse(bar_pos, canvas.height, 10, bar_height,0,0, 2 * Math.PI);
        ctx.ellipse(bar_pos + 2, canvas.height, 10, bar_height - 5 > 0 ? bar_height - 5 : 0,0,0, 2 * Math.PI);
        ctx.ellipse(bar_pos + 4, canvas.height, 10, bar_height - 10 > 0 ? bar_height - 10 : 0,0,0, 2 * Math.PI);
        ctx.ellipse(bar_pos + 6, canvas.height, 10, bar_height - 20 > 0 ? bar_height - 15 : 0,0,0, 2 * Math.PI);

        // end_html += gen_circle((i * -5) + 10, bar_height)
        // ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
    }ctx.stroke();
}
