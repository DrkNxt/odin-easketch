const gridSizeBtn = document.querySelector("#gridSizeBtn");
const container = document.querySelector("#container");
const CONTAINER_SIZE = 512;

function colorSquare(target) {
    target.style.backgroundColor = "black";
}

function chooseGridSize() {
    size = prompt("Grid Size (1-100):");
    if (size == null || size < 1 || size > 100) {
        console.log("Invalid size")
    } else {
        for (let square of document.querySelectorAll(".square")) {
            square.remove();
        }
        createSquares(size);
        console.log(size);
    }
}

function createSquares(n) {
    let squareSize = CONTAINER_SIZE / n -2
    for (let i=0; i<n*n; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.width = squareSize + ("px");
        square.style.height = squareSize + ("px");
        container.appendChild(square);
        square.addEventListener("mouseenter", e => colorSquare(e.target));
    }
}

createSquares(16);
gridSizeBtn.addEventListener("click", chooseGridSize);
