const gridSizeBtn = document.querySelector("#gridSizeBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const shadeBtn = document.querySelector("#shadeBtn");
const container = document.querySelector("#container");
const CONTAINER_SIZE = 768;

let rainbowMode = false;
let shadeMode = false;

function colorSquare(target) {
    if (shadeMode) {
        let targetStyle = window.getComputedStyle(target);
        if (!target.classList.contains("colored")) {
            if (targetStyle.getPropertyValue("opacity") === "1") {
                target.style.opacity = "0.1";
            }else {
                target.style.opacity = String(parseFloat(targetStyle.getPropertyValue("opacity")) + 0.1);
            }
            if (targetStyle.getPropertyValue("opacity") === "1") {
                target.classList.add("colored");
            }
            target.style.backgroundColor = "#000000";
        }
    }else if (rainbowMode) {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
        target.style.opacity = "1";
        target.classList.add("colored");
    }else {
        target.style.backgroundColor = "#000000";
        target.style.opacity = "1";
        target.classList.add("colored");
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
    let squareSize = CONTAINER_SIZE / n
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
    if (rainbowMode) {
        rainbowBtn.style.backgroundColor = "#bdffbdff";
    }else {
        rainbowBtn.style.backgroundColor = "#ffffff";
    }
    shadeBtn.style.backgroundColor = "#ffffff";
    shadeMode = false;
});

shadeBtn.addEventListener("click", () => {
    shadeMode = !shadeMode;
    if (shadeMode) {
        shadeBtn.style.backgroundColor = "#bdffbdff";
    }else {
        shadeBtn.style.backgroundColor = "#ffffff";
    }
    rainbowBtn.style.backgroundColor = "#ffffff";
    rainbowMode = false;
})
