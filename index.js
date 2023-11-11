const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const wrapperJS = document.querySelector(".wrapper");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialise the game 
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI par bhi boxes ko empty karna padega
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise box with CSS properties again
        box.classList  = `box box${index+1}`;
        // background colour again reset
        wrapperJS.classList.remove("active");

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    wrapperJS.classList.remove("active");
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position)=>{
        // all three boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !="" && gameGrid[position[1]] !="" && gameGrid[position[2]] !="") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            // check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";    
            });

            wrapperJS.classList.add("active");

            //now we know X/O is the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${currentPlayer}`;
        newGameBtn.classList.add("active");
        return ;
    }

    // when game is tied 
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    //if board is filled then game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }   
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check koi jeet toh nahi gaya hai
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


