
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const playAgainBtn = document.querySelector("#play-again");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    gameActive = true;
    boxes.forEach(box => {
        box.textContent = "";
        box.removeAttribute("data-mark");
        box.style.backgroundColor = "";
        box.disabled = false;
    });
    msgContainer.classList.remove("show");
};

const checkDraw = () => {
    return [...boxes].every(box => box.textContent !== "");
};

const showWinner = (winner) => {
    msg.textContent = `${winner} Victory!`;
    msgContainer.classList.add("show");
    gameActive = false;
};

const showDraw = () => {
    msg.textContent = "Draw!";
    msgContainer.classList.add("show");
    gameActive = false;
};

const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "rgba(172, 200, 229, 0.5)";
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const valA = boxes[a].textContent;
        const valB = boxes[b].textContent;
        const valC = boxes[c].textContent;

        if (valA && valA === valB && valA === valC) {
            highlightWinner(pattern);
            showWinner(valA);
            return true;
        }
    }

    if (checkDraw()) {
        showDraw();
        return true;
    }

    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.textContent !== "") return;

        const mark = turnO ? "O" : "X";
        box.textContent = mark;
        box.setAttribute("data-mark", mark);
        turnO = !turnO;

        if (checkWinner()) return;
    });
});

[resetBtn, newGameBtn, playAgainBtn].forEach(button => {
    button.addEventListener("click", resetGame);
});

// Initialize game
resetGame();