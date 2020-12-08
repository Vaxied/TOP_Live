// Need to fix a bug when the game ends that changes the size of the window

function computerPlay()
{
    //Selects and option randomly for the computer to play
    let items = ["Rock", "Paper", "Scissors"];
    var randomSelect = items[Math.floor(Math.random() * 3)];
    //console.log(randomSelect);
    return randomSelect;
}

let playRound = (userSelection) => 
{
    let result = "Please choose an option and hit play";
    let message = "";
    computerSelection = computerPlay();
    console.log(computerSelection);
    switch (true) {
        case ((userSelection == "Rock") && (computerSelection == "Scissors")):
            ++playerScore;    
            result = `You Win! ${userSelection} beats ${computerSelection}`;
            break;
        case ((userSelection == "Paper") && (computerSelection == "Rock")):
            ++playerScore;
            result = `You Win! ${userSelection} beats ${computerSelection}`;
            break;
        case ((userSelection == "Scissors") && (computerSelection == "Paper")):
            ++playerScore;
            result = `You Win! ${userSelection} beats ${computerSelection}`;
            break;
        case ((userSelection == "Scissors") && (computerSelection == "Rock")):
            ++computerScore;
            result = `You Lose! ${computerSelection} beats ${userSelection}`;
            break;
        case ((userSelection == "Rock") && (computerSelection == "Paper")):
            ++computerScore;
            result = `You Lose! ${computerSelection} beats ${userSelection}`;
            break;
        case ((userSelection == "Paper") && (computerSelection == "Scissors")):
            ++computerScore;
            result = `You Lose! ${computerSelection} beats ${userSelection}`;
            break;
        case (userSelection == computerSelection):
            result = "You tie! Try again";
            break;       
    }
    document.querySelector(".message").textContent = result;
    message = document.querySelector(".message").textContent;
    return message;
}

function checkWinner() 
{
    //let result = "";
    let message = "";
    if (playerScore > computerScore && playerScore == 3)
    {   
        gameOver = true;
        result = "Congratulations! You Won!";
        console.log("you win");
        document.querySelector("#play-button").textContent = "Play again"
        document.querySelector(".message").textContent = result;
        message = document.querySelector(".message").textContent;
    }
    else if (playerScore < computerScore && computerScore == 3)
    {
        gameOver = true;
        result = "You lose! Try harder the next time!";
        console.log("you lose");
        document.querySelector("#play-button").textContent = "Play again!"
        document.querySelector(".message").textContent = result;
        message = document.querySelector(".message").textContent;
    }
    return message;
}

let setScore = () => 
{
    //console.log(document.querySelector(".playerScore"));
    document.querySelector(".playerScore").textContent = playerScore;
    document.querySelector(".computerScore").textContent = computerScore;
}

let resetGame = () => 
{
    console.log("Game reset");
    playerScore = 0;
    computerScore = 0;
    document.querySelector("#play-button").textContent = "Start Game"
    document.querySelector(".playerScore").textContent = playerScore;
    document.querySelector(".computerScore").textContent = computerScore;
    document.querySelector(".message").textContent = "Play Rock Paper Scissors!"
    gameOver = false;
    userInput = "";
}

function playGame()
{
    //console.log("active");
    console.log(gameOver);
    if(gameOver == true) 
    {
        resetGame();
        //console.log("Fake reset");
    }
    else
    {
        console.log("No reset yet")
        document.querySelector("#play-button").textContent = "Choose an option"
        let button = document.querySelector("#play-button");
        button.addEventListener('click', console.log((playRound(userInput))));
        setScore();
        checkWinner();
        userInput= "";
        console.log(playerScore);
        console.log(computerScore);
    }
    //console.log(gameOver);
}

const loadButtons = () => 
{
    console.log("im here");
    buttons.forEach(button =>
    {
        button.addEventListener('click', () => 
        {
            userInput = button.textContent;
            if (gameOver == false)
            {
                document.querySelector("#play-button").textContent = `Play ${userInput}`;
                console.log(userInput);
            }
        });
    });
    playbutton = document.querySelector("#play-button");
    playbutton.addEventListener('click', playGame);
}

let playerScore = 0;
let computerScore = 0;
var gameOver = false;
var userInput = "";
var buttons = document.querySelectorAll(".selection-button");
let body = document.querySelector("body");
body.onload = () => loadButtons();