const gridSizeBtn = document.querySelector("#gridSizeBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const container = document.querySelector("#container");
const CONTAINER_SIZE = 768;

let rainbowMode = false;

function colorSquare(target) {
    if (!rainbowMode) {
        target.style.backgroundColor = "black";
    }else {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    }
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
rainbowBtn.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
})
