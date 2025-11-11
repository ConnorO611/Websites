const canvas = document.getElementById("snow"); //Get the snow canvas from html doc
const ctx = canvas.getContext("2d"); //Draw 2d images on the canvas

canvas.width = window.innerWidth; //Canvas width = browser size
canvas.height = window.innerHeight; //Canvas height = browser size

const flakes = Array(150).fill().map(() => ({
    x: Math.random() * canvas.width, //Random x
    y: Math.random() * canvas.height, //Random y
    r: Math.random() * 3 + 1, //Radius
    d: Math.random() * 0.5 + 0.2, //Fall Speed
    drift: Math.random() * 2 - 1, //Horizontal Drift
    swaySpeed: Math.random() * 0.02 + 0.005, //How fast snow sways
    swayOffset: Math.random() * Math.PI * 2 //How much snow offsets
}));

var year = 2025;

var date = new Date("Dec 25, " + year + " 00:00:01");

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = date - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = "There are " + days + " days " + hours + " hours " + minutes + " minutes and " + seconds + " seconds until Christmas!";

    if(distance < 0) {
        year++
    }
}, 1000);

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();

    flakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    });

    ctx.fill();
    moveSnow();
    requestAnimationFrame(drawSnow);
}

function moveSnow() {
    flakes.forEach(f => {
        f.x += Math.sin(performance.now() * f.swaySpeed + f.swayOffset) * 0.1 + f.drift * 0.05;
        f.y += f.d + Math.random() * 0.45;

        if(f.y > canvas.height + f.r) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
            f.d = Math.random() * 1 + 0.5;
            f.r = Math.random() * 3 + 1;
        }
    });
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth; //Canvas width = new browser size
    canvas.height = window.innerHeight; //Canvas height = new browser size
});

drawSnow();