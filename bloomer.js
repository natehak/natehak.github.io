const canvas = document.getElementById("display");
const context = canvas.getContext("2d");

// Make canvas the size of the window
document.body.width = window.innerWidth;
document.body.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const mouse = { x: 0, y: 0 };
let color = 0;

let xScale = 1.004;
let yScale = 1.004;

let rotation = randomWalk(0, -Math.PI/720, Math.PI/720, Math.PI/7200);

function randomWalk(start, min, max, stepSize) {
    let curr = start;
    function step() {
        curr += lerp(-stepSize, stepSize, Math.random());
        curr = clamp(curr, min, max);
        return curr;
    }
    return step;
}

function drawFrame() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    const xDiff = (canvas.width * (1 - xScale)) / 2 + range(0, canvas.width, -2, 2, mouse.x);
    const yDiff = (canvas.height * (1 - yScale)) / 2 + range(0, canvas.height, -2, 2, mouse.y);

    const centerX = xDiff + (0.5 * canvas.width * xScale);
    const centerY = yDiff + (0.5 * canvas.height * yScale);
    
    context.translate(centerX, centerY);
    context.rotate(rotation());
    context.translate(-centerX, -centerY);
    context.scale(xScale, yScale);
    context.drawImage(canvas, xDiff, yDiff);
    context.restore();

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.font = '100px serif';
    color = (color + 2) % 360;
    context.fillStyle = `hsl(${color}, 100%, 50%)`;
    context.textAlign = 'center';
    const metrics = context.measureText("Nathan Hakkakzadeh");
    const height = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent);
    context.fillText("Nathan Hakkakzadeh", canvas.width/2, canvas.height/2 + height/2);
    context.restore();

    window.requestAnimationFrame(drawFrame);
}

canvas.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener('wheel', (e) => {
    xScale += e.deltaY * 0.00001;
    yScale += e.deltaY * 0.00001;
    console.log(xScale, yScale);
});

window.requestAnimationFrame(drawFrame);
