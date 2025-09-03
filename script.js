const gridSizeRange = document.querySelector("#gridSizeRange");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const rainbowBtn = document.querySelector("#rainbowBtn");
const shadeBtn = document.querySelector("#shadeBtn");
const eraseBtn = document.querySelector("#eraseBtn");
const colorPicker = document.querySelector("#colorPicker");
const container = document.querySelector("#container");
const CONTAINER_SIZE = 768;

let rainbowMode = false;
let shadeMode = false;
let eraseMode = false;
let color = "#000000";

function colorSquare(target) {

    if (rainbowMode && !eraseMode) {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        color = `rgb(${red}, ${green}, ${blue})`
    }

    if (shadeMode && !eraseMode) {
        let targetStyle = window.getComputedStyle(target);
        if (!target.classList.contains("shaded")) {
            if (targetStyle.getPropertyValue("opacity") === "1") {
                target.style.opacity = "0.1";
            }else {
                target.style.opacity = String(parseFloat(targetStyle.getPropertyValue("opacity")) + 0.1);
            }
            if (targetStyle.getPropertyValue("opacity") === "1") {
                target.classList.add("shaded");
            }
            target.style.backgroundColor = color;
        }
    } else {
        target.style.backgroundColor = color;
        target.style.opacity = "1";
        target.classList.remove("shaded");
    }
}

function chooseGridSize(size) {
    for (let square of document.querySelectorAll(".square")) {
        square.remove();
    }
    createSquares(size);
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

gridSizeRange.addEventListener("input", e => {
    let value = e.target.value;
    chooseGridSize(e.target.value);
    gridSizeLabel.textContent = `${value}x${value}`
});

colorPicker.addEventListener("input", e => {
    color = e.target.value;
})

rainbowBtn.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    if (rainbowMode) {
        rainbowBtn.style.backgroundColor = "#7300ff";
        rainbowBtn.style.boxShadow = "0 0 16px #bdbdbd"
        rainbowBtn.style.color = "#ffffff";
    }else {
        rainbowBtn.style.backgroundColor = "#2e0066";
        rainbowBtn.style.boxShadow = "0 0 8px #bdbdbd"
        rainbowBtn.style.color = "#bdbdbd";
        if (eraseMode) {
           color = "#ffffff";
        }else {
           color = colorPicker.value;
        }
    }
});

shadeBtn.addEventListener("click", () => {
    shadeMode = !shadeMode;
    if (shadeMode) {
        shadeBtn.style.backgroundColor = "#7300ff";
        shadeBtn.style.boxShadow = "0 0 16px #bdbdbd"
        shadeBtn.style.color = "#ffffff";
    } else {
        shadeBtn.style.backgroundColor = "#2e0066";
        shadeBtn.style.boxShadow = "0 0 8px #bdbdbd"
        shadeBtn.style.color = "#bdbdbd";
    }
})

eraseBtn.addEventListener("click", () => {
    eraseMode = !eraseMode;
    if (eraseMode) {
        eraseBtn.style.backgroundColor = "#7300ff";
        eraseBtn.style.boxShadow = "0 0 16px #bdbdbd"
        eraseBtn.style.color = "#ffffff";
        color = "#ffffff";
    }else {
        eraseBtn.style.backgroundColor = "#2e0066";
        eraseBtn.style.boxShadow = "0 0 8px #bdbdbd"
        eraseBtn.style.color = "#bdbdbd";
        color = colorPicker.value;
    }
})
