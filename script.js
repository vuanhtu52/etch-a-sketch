let showGridLines = true;

function createSquares(gridSize) {
    const grid = document.querySelector("#grid");
    console.log(grid.offsetWidth);
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

function toggleGridLines() {
    const squares = document.querySelectorAll(".square");
    if (showGridLines) {
        squares.forEach(square => {
            square.style.border  = "0.5px solid grey";
        })
    }
}

createSquares(16);
toggleGridLines();