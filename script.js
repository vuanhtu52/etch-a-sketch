
function createSquares(gridSize) {
    const grid = document.querySelector("#grid");
    for (let row = 0; row < gridSize; row++) {
        let rowDiv = document.createElement("div")
        rowDiv.style.display = "flex";
        rowDiv.style.flex = "1";
        rowDiv.style.offsetWidth = "100%";
        for (let column = 0; column < gridSize; column ++) {
            let square = document.createElement("div");
            square.style.flex = "1";
            square.classList.add("square");
            rowDiv.appendChild(square);
        }
        grid.appendChild(rowDiv);
    }
}

function toggleGridLines(showGridLines) {
    const squares = document.querySelectorAll(".square");
    if (showGridLines) {
        squares.forEach(square => {
            square.style.border  = "0.5px solid grey";
        })
    } else {
        squares.forEach(square => {
            square.style.border  = "0";
        })
    }
}

// Display the squares at the beginning
createSquares(16);
toggleGridLines(true);

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
console.log(backgroundSelector);
backgroundSelector.addEventListener("input", event => {
    grid.style.backgroundColor = event.currentTarget.value;
});
