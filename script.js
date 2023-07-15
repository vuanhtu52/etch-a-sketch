let mouseDown = false;
let drawing = false;
const penColorSelector = document.querySelector("#pen-selector");

function createSquares(gridSize) {
    const grid = document.querySelector("#grid");
    for (let row = 0; row < gridSize; row++) {
        let rowDiv = document.createElement("div")
        rowDiv.style.display = "flex";
        rowDiv.style.flex = "1";
        rowDiv.style.offsetWidth = "100%";
        for (let column = 0; column < gridSize; column++) {
            let square = document.createElement("div");
            square.style.flex = "1";
            square.classList.add("square");
            square.addEventListener("mousedown", () => {
                changeSquareColor(square);
            });
            square.addEventListener("mouseenter", () => {
                if (mouseDown) {
                    changeSquareColor(square);
                }
            });
            rowDiv.appendChild(square);
        }
        grid.appendChild(rowDiv);
    }
}

function toggleGridLines(showGridLines) {
    const squares = document.querySelectorAll(".square");
    if (showGridLines) {
        squares.forEach(square => {
            square.style.border = "0.5px solid grey";
        })
    } else {
        squares.forEach(square => {
            square.style.border = "0";
        })
    }
}

function turnOnButton(button) {
    if (!button.classList.contains("button-active")) {
        button.classList.add("button-active");
    }
}

function turnOffButton(button) {
    button.classList.remove("button-active");
}

function generateRandomColor() {
    r = Math.floor(Math.random() * (256 - 0)) + 0;
    g = Math.floor(Math.random() * (256 - 0)) + 0;
    b = Math.floor(Math.random() * (256 - 0)) + 0;
    return [r, g, b];
}

function changeSquareColor(square) {
    if (mode === "pen") {
        square.style.backgroundColor = penColorSelector.value;
    } else if (mode === "rainbow-pen") {
        // Generate a random rgb color
        rgbArray = generateRandomColor();
        square.style.backgroundColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
    } else if (mode === "eraser") {
        square.style.backgroundColor = grid.style.backgroundColor;
    }
}

// Detect when user clicks the mouse
body = document.querySelector("body");
body.addEventListener("mouseup", () => {
    mouseDown = false;
});
body.addEventListener("mousedown", () => {
    mouseDown = true;
});

// Display the squares at the beginning
createSquares(16);
toggleGridLines(true);

// Check which mode user selects (there are 3 modes: pen, rainbow-pen, and eraser)
let mode = "pen";
const modeButtons = document.querySelectorAll("#pen, #rainbow-pen, #eraser");
modeButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Toggle the buttons' colors
        modeButtons.forEach(turnOffButton);
        turnOnButton(button);
        // Set the mode based on button pressed
        mode = button.id;
    });
});

// Toggle the grid lines when user clicks the switch
const toggleSwitch = document.querySelector("#toggle-switch");
toggleSwitch.addEventListener("change", event => {
    toggleGridLines(event.currentTarget.checked);
});

// Change the number of squares when user changes the slider's value
const grid = document.querySelector("#grid");
const slider = document.querySelector("#size-slider");
slider.addEventListener("change", event => {
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
    createSquares(event.currentTarget.value);
    toggleGridLines(toggleSwitch.checked);
});


// Update the grid size's display while user is dragging the slider
const sliderDisplay = document.querySelector(".slider-display");
slider.addEventListener("input", event => {
    sliderDisplay.textContent = `${event.currentTarget.value} x ${event.currentTarget.value}`;
});

// Change background color when user selects a new color
const backgroundSelector = document.querySelector("#background-selector");
backgroundSelector.addEventListener("input", event => {
    grid.style.backgroundColor = event.currentTarget.value;
});

// Remove the colors when user clicks the clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
    createSquares(slider.value);
    toggleGridLines(toggleSwitch.checked);
});