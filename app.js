let start = document.getElementById("start");
let play = document.querySelector(".play");
let home = document.querySelector(".home");
let reset = document.querySelector(".reset");
let page1 = document.querySelector(".page1");
let page2 = document.querySelector(".page2");
let page3 = document.querySelector(".page3");
let check1 = document.querySelector(".check1");
let check2 = document.querySelector(".check2");
let turn = document.querySelector(".turn");
let boxes = document.querySelectorAll(".box");
let bgm = document.querySelector("#bgm1")
let btnClick = document.querySelector("#btnClick")
let win1 = document.querySelector("#win1")
let win2 = document.querySelector("#win2")
let pick = document.querySelector("#pick")


let turnX = true;
let winner = ``;
let cross = [];
let circle = [];
const winArr = [
    ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['6', '4', '2']
];
let num = [0, 1, 2, 3, 4, 5, 6, 7, 8];

start.addEventListener("click", pageTwo);

check1.addEventListener('change', () => {
    if (check1.checked) {
        check2.checked = false;
    }
});

check2.addEventListener('change', () => {
    if (check2.checked) {
        check1.checked = false;
    }
});

play.addEventListener("click", () => {
    if (check1.checked || check2.checked) {
        pageThree();
    } else {
        alert(`Please select one mode`);
    }
});

home.addEventListener("click", () => {
    pageOne();
    resetGame();
});

reset.addEventListener("click", resetGame);

boxes.forEach(button => {
    button.addEventListener("click", () => {
        if (check2.checked) {
            pick.play();
            move(button);
            button.disabled = true;
            if (!checkWinner() && !checkDraw()) {
                turnChange();
            }
        } else if (check1.checked) {
            if (turnX) {
                move(button, "circle");
                pick.play();
                button.disabled = true;
                if (!checkWinner() && !checkDraw()) {
                    turnChange();
                    let computerMove = setTimeout(() => {
                        computerPlay();
                        btnClick.play();
                        turnChange();
                        checkWinner();
                    }, 1000);
                }
            }
        }
    });
});

function checkDraw() {
    if (winner === `` && cross.length + circle.length === 9) {
        turn.innerHTML = `<h1>The Game is Draw </h1>`;
        win2.play();
        return true;
    }
    return false;
}

function checkWinner() {
    for (let i = 0; i < winArr.length; i++) {
        if (arraysEqual(cross, winArr[i])) {
            winner = `Cross`;
            disableBtn();
            showWinner();
            return true;
        } else if (arraysEqual(circle, winArr[i])) {
            winner = `Circle`;
            disableBtn();
            showWinner();
            return true;
        }
    }
    return false;
}

function showWinner() {
    win1.play();
    if (winner === `Circle`) {
        turn.innerHTML = `<h1>Winner is : </h1><img src="circle.png" width="30px" alt=""></img>`;
    } else if (winner === `Cross`) {
        turn.innerHTML = `<h1>Winner is : </h1><img src="cross.png" width="30px" alt=""></img>`;
    }
}

function arraysEqual(arr1, arr2) {
    return arr2.every(element => arr1.includes(element));
}

function resetGame() {
    boxes.forEach(button => {
        button.innerHTML = "";
        button.disabled = false;
    });
    winner = ``;
    btnClick.play();
    defaultTurn();
    enableBtn();
}

function move(box, player = turnX ? "cross" : "circle") {
    if (player === "cross") {
        box.innerHTML = `<img src="cross.png" width="80px" alt="">`;
        cross.push(box.getAttribute('id'));
    } else {
        box.innerHTML = `<img src="circle.png" width="80px" alt="">`;
        circle.push(box.getAttribute('id'));
    }
}

function pageTwo() {
    btnClick.play();
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
    page3.classList.add("hidden");
}

function pageThree() {
    btnClick.play();
    page1.classList.add("hidden");
    page2.classList.add("hidden");
    page3.classList.remove("hidden");
}

function pageOne() {
    btnClick.play();
    page1.classList.remove("hidden");
    page2.classList.add("hidden");
    page3.classList.add("hidden");
}

function defaultTurn() {
    turnX = true;
    turn.innerHTML = `<h1>Turn : </h1><img src="cross.png" width="30px" alt="">`;
    cross = [];
    circle = [];
}

function turnChange() {
    if (turnX) {
        turn.innerHTML = `<h1>Turn : </h1><img src="cross.png" width="30px" alt="">`;
    } else {
        turn.innerHTML = `<h1>Turn : </h1><img src="circle.png" width="30px" alt="">`;
    }
    turnX = !turnX;
}

function disableBtn() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

function enableBtn() {
    boxes.forEach(box => {
        box.disabled = false;
    });
}

function computerPlay() {
    let availableBoxes = Array.from(boxes).filter(box => !box.innerHTML);
    if (availableBoxes.length > 0) {
        let randIdx = Math.floor(Math.random() * availableBoxes.length);
        let box = availableBoxes[randIdx];
        move(box, "cross");
        box.disabled = true;
        checkWinner();
        checkDraw();
    }
}
