const canvas = document.getElementById("bouncer");
const context = canvas.getContext("2d");

// Make canvas the size of the window
document.body.width = window.innerWidth;
document.body.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = 800;
const textHeight = 100;

context.font = '100px serif';

const interval = 1;

function createText(text, x, y, width, color) {
    return {
        x: x,
        y: y,

        vx: Math.random() * 4,
        vy: Math.random() * 4,

        text: text,
        width: width,
        color: color,

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x >= (canvas.width - this.width) || this.x <= 0) {
                this.vx = -1 * this.vx;
            }

            if (this.y >= canvas.height || this.y <= textHeight) {
                this.vy = -1 * this.vy;
            }
        },

        draw() {
            if (rainbow) {
                this.color = (this.color + 1) % 360;
                context.fillStyle = `hsl(${this.color}, 100%, 50%)`;;
            }
            context.fillText(this.text, this.x, this.y, this.width);
            context.strokeText(this.text, this.x, this.y, this.width);
        }
    };
}

let mainText = createText('Nathan Hakkakzadeh', 1, textHeight + 1, 800, 0);
let texts = [mainText];

let rainbow = false;
let split = false;

canvas.onclick = () => {
    if (split) {
        for (text of texts) {
            text.vx = Math.random() * 4 * Math.sign(text.vx);
            text.vy = Math.random() * 4 * Math.sign(text.vy);
        }
    }
    if (rainbow) {
        for (let i = 0; i < mainText.text.length; i++) {
            texts.push(createText(mainText.text[i], mainText.x + (i * 45), mainText.y, 45, Math.random() * 360));
        }
        split = true;
    }
    rainbow = true;
};

function drawFrame() {
    if (!rainbow) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    for (text of texts) {
        text.update();
        text.draw();
    }
}

setInterval(drawFrame, interval);
