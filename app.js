/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

const player1 = document.querySelector("#current-0")
const player2 = document.querySelector("#current-1")
const playerPanel1 = document.querySelector(".player-0-panel")
const playerPanel2 = document.querySelector(".player-1-panel")
const diceDOM = document.querySelector(".dice");
const name1 = document.querySelector("#name-0")
const name2 = document.querySelector("#name-1")
const score1 = document.querySelector("#score-0")
const score2 = document.querySelector("#score-1")

init();

diceDOM.style.display = "none";
document.querySelector(".btn-roll").addEventListener("click", button);

function button(){
    if (gamePlaying){
        let dice = Math.floor(Math.random() * 6) + 1
    
        diceDOM.style.display = "block";
        diceDOM.src = "dice_" + dice + ".png";
        gameLogic(dice)
    }
}

function gameLogic(dice){
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      otherPlayer()
    }
}

function otherPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    toggleBetweenPlayers()
}

function toggleBetweenPlayers(){
    player1.textContent = "0";
    player2.textContent = "0";
    playerPanel1.classList.toggle("active");
    playerPanel2.classList.toggle("active");
    diceDOM.style.display = "none"
}

document.querySelector(".btn-hold").addEventListener("click", holdButton)

function holdButton(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        winner();
    }
}

function winner(){
    if (scores[activePlayer] >= 100){
        winnerDisplay()
        gamePlaying = false
    } else {
        otherPlayer();
    }
}

function winnerDisplay(){
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    diceDOM.style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
}

document.querySelector(".btn-new").addEventListener("click", init)

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    clearStatus()
}

function clearStatus(){
    diceDOM.style.display = "none";
    score1.textContent = "0";
    score2.textContent = "0";
    player1.textContent = "0";
    player2.textContent = "0";
    playerPanel()
}

function playerPanel(){
    name1.textContent = "Player 1";
    name2.textContent = "Player 2";
    playerPanel1.classList.remove("active")
    playerPanel2.classList.remove("active")
    playerPanel1.classList.remove("winner")
    playerPanel2.classList.remove("winner")
    playerPanel1.classList.add("active")
}