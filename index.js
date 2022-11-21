const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const gridContainer = document.querySelector("#gridContainer");

let computerChoice;

//winConditions is a 2Dimentional array of indices
//We need to check if 3 cells all have the same character
const winConditions = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals
    [0, 4, 8],
    [2, 4, 6],
];

//We need an array of placeholder
let options = ["", "", "", "", "", "", "", "", ""];

//We need to keep track of current player
let currentPlayer = "X";

//A variable to keep track if the game is running
let running = false;

initializeGame();



function initializeGame(){
    running = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    
    statusText.textContent = `${currentPlayer} TURN`;

    
}
function cellClicked(){
    //We'll check to see if the index number within our [options] are not empty
    //We'll only want to update our cell if there's nothing there
    const cellIndex = this.getAttribute("cellIndex"); //[this] = the button we clicked

    if(options[cellIndex] != "" || !running){ //If this the case
        return; //we'll not do anything
    }

    updateCell(this, cellIndex);
    checkWinner(); //checks and changes player
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if(currentPlayer == "X"){
        cell.style.color = "#31c4be";
        cell.innerHTML = "<i class='fa-solid fa-xmark' id='xSign'></i>";
    }
    else{
        cell.style.color = "#f2b238";
        cell.innerHTML = "<i class='fa-solid fa-o' id='oSign'></i>";
    }
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} TURN`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        //We'll iterate over each inner array within [winConditions]
        const condition = winConditions[i];
        //Each row has 3 indices
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} WINS`;
        running = false;
    }
    else if(!options.includes("")){ //If our array doesn't include any "spaces"
        statusText.textContent = `DRAW`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} TURN`;
    //We need to clear each cell
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "";
    });
    running = true;
}

function computerTurn(){ //if currentPlayer == O
    computerChoice = Math.floor(Math.random() * 9 + 1);
}