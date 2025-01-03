let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-btn"); // Corrected selector
let msgContainer = document.querySelector(".msg-container"); // Corrected selector
let msg = document.querySelector("#msg");

let turn = true; // player X player o

const winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
       
        if (turn) {
            box.innerText = "O";
            turn = false;
        } else {
            box.innerText = "X";
            turn = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

};


const checkDraw = () => { 
    let filledBoxes = 0; 
    for(let box of boxes) { 
        if(box.innerText !== "") {
         filledBoxes++;     
    } 
} 
    if(filledBoxes === 9) {
         msg.innerText = "It's a Draw!"; 
         msgContainer.classList.remove("hide"); 
        } 
}

const checkWinner = () => {
    for (let pattern of winpattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
       
               showWinner(pos1Val);
            }
        }
    }
    checkDraw();
};

// Add event listener for the "New Game" button
newGameBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turn = true; // Reset turn to player X
});

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);