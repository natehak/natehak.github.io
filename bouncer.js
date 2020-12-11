const canvas = document.getElementById("bouncer");
const context = canvas.getContext("2d");

// Make canvas the size of the window
document.body.width = window.innerWidth;
document.body.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const textWidth = 800;
const textHeight = 100;

context.font = '100px serif';

const interval = 1;

let locationX = 1;
let locationY = textHeight+1;

let velocityX = Math.random() * 4;
let velocityY = Math.random() * 4;

function drawFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    locationX += velocityX;
    locationY += velocityY;

    if (locationX >= (canvas.width - textWidth) || locationX <= 0) {
        velocityX = -1 * velocityX;
    }

    if (locationY >= canvas.height || locationY <= textHeight) {
        velocityY = -1 * velocityY;
    }

    context.fillText('Nathan Hakkakzadeh', locationX, locationY, textWidth);
}

setInterval(drawFrame, interval);
