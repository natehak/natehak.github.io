// Global variables
// Grid length
var gridLength = 20;

// Canvas
var canvas = document.getElementById("main");
var context = canvas.getContext("2d");

// Make it a square

if (window.innerHeight < window.innerWidth) {
    canvas.width = window.innerHeight - 20;
    canvas.height = canvas.width;
} else {
    canvas.height = window.innerWidth -20;
    canvas.width = canvas.height;
}

var verticalDistance = canvas.width / gridLength;
var horizontalDistance = canvas.height / gridLength;

// We need this variable to manually keep track of whether the mouse
// is down or not since JavaScript doesn't take care of that.
// They are integers as opposed to booleans in case the user has two mice and clicks
// one button while the other is pressed.
var primaryMouseDown = 0;
var secondaryMouseDown = 0;

// Cell type enumerator
// Why? Magic numbers are ugly.
CellType = {
    EMPTY: 0,
    OBSTACLE: 1,
    START: 2,
    END: 3,
    DEATH: 4
};

CellTypeColor = {
    0: "#FFFFFF",
    1: "#000000",
    2: "#00FF00",
    3: "#0000FF",
    4: "#FF0000"

};

// What kind of cell the player is going to draw needs to be able to change
var drawType = CellType.OBSTACLE;

var level = Array(gridLength);

// This is an ordered pair for transferring anything with an x, y pair like
// locations or Cells. We do this becasue it makes things more readable.
function OrderedPair(x ,y) {
    this.x = x;
    this.y = y;
}

// Create a blank level
function initializeLevel() {
    // A double for loop is both the most sensable, simple, and easiest way to touch every cell
    for (var x = 0; x < gridLength; x++) {
        level[x] = Array(gridLength);
        for (var y = 0; y < gridLength; y++) {
            level[x][y] = CellType.EMPTY;
        }
    }
}

// Clears the canvas
function blank() {
    // This is the only way to clear the canvas
    canvas.width = canvas.width;
}

// Draws the grid
function drawGrid() {

    // Draw vertical lines
    for (var x = 0; x <= canvas.width; x += verticalDistance) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
    }

    // Draw horizontal lines
    for (var y = 0; y <= canvas.height; y += horizontalDistance) {
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
    }

    // Draw
    context.strokeStyle = "#000000";
    context.stroke();

}

// This is seperate because I might not want to recolor all the cells every time there's a cell change
function colorCell(orderedPair) {

    var color = CellTypeColor[level[orderedPair.x][orderedPair.y]];

    context.fillStyle = color;
    context.fillRect(orderedPair.x * verticalDistance, orderedPair.y * horizontalDistance, verticalDistance, horizontalDistance);

    drawGrid();

}

// Colors the grid in case the visuals and logic gets out of sync
function colorGrid() {
    for (var x = 0; x < gridLength; x++) {
        for (var y = 0; y < gridLength; y++) {
            colorCell(new OrderedPair(x, y));
        }
    }

    drawGrid();
}

function onMove(event) {
    // We only care about coloring if the mouse is clicked
    // Otherwise its very unintuitive to how to draw if the mouse just starts drawing everything
    if (primaryMouseDown || event.type == "click") {
        var canvasPosition = getCanvasCursorPosition(event);

        // Get the cell we chose since we don't really care about where on the canvas we are.
        // Knowing which cell the user clicked is all that matters.
        // We use Math.floor because we want a simple integer so we can modify the level array
        var cellX = Math.floor(canvasPosition.x / verticalDistance);
        var cellY = Math.floor(canvasPosition.y / horizontalDistance);

        if (document.getElementById("erase").checked) {
            drawType = CellType.EMPTY;
        } else {
        drawType = CellType.OBSTACLE;
        }
        level[cellX][cellY] = drawType;

        colorCell(new OrderedPair(cellX, cellY));
    }
}

// Javascript only gives us the position for the whole window while we only care about the canvas
function getCanvasCursorPosition(event) {
    var x;
    var y;
    if (event.pageX != undefined && event.pageY != undefined) {
        x = event.pageX;
        y = event.pageY;
    } else {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY = document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return new OrderedPair(x, y);
}

canvas.addEventListener("mousemove", onMove, false);
canvas.addEventListener("click", onMove, false);

// Keeps track of mouse downs because JavaScript doesn't do it for us
document.body.onmousedown = function(event) {
    if(event.button == 0) {
        ++primaryMouseDown;
    } else if (event.button == 2) {
        ++secondaryMouseDown;
    }
}


document.body.onmouseup = function(event) {
    if(event.button == 0) {
        --primaryMouseDown;
    } else if (event.button == 2) {
        --secondaryMouseDown;
    }
}


initializeLevel();
drawGrid();
