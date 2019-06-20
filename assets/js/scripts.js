const buttons = document.querySelectorAll('button');
let round = 0;

function addScore(e) {
    if (e.type != 'click') return;
    const playerSelection = this.getAttribute('data-choice');
    const computerSelection = computerPlay();

    const winner = playRound(playerSelection, computerSelection );

    if (winner != 'tie') {
        const winnerElem = document.querySelector(`[data-winner="${winner}"]`);
        let winnerCurrScore = Number(winnerElem.textContent);
        winnerCurrScore += 1;
        winnerElem.textContent = winnerCurrScore;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', addScore);
})

function computerPlay() {

    let randomNumber = Math.floor(Math.random() * 3); //assigns random number between 0 and 2
    let choice;

    switch(randomNumber) {
        case 0:
            choice = 'Rock';
            break;
        case 1:
            choice = 'Paper';
            break;
        case 2:
            choice = 'Scissors';
            break;
        default:
            alert('Unexpected Random Number');
    }

    return choice;
}

function displayResult(resultMsg) {
    const roundElem = document.querySelector('.round');
    roundElem.textContent = 'Round ' + round;

    const roundMsg = document.querySelector('.message');
    roundMsg.textContent = resultMsg;

}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.toLowerCase().slice(1, playerSelection.length);
    computerSelection = computerSelection[0].toUpperCase() + computerSelection.toLowerCase().slice(1, computerSelection.length);

    let resultMsg;
    let winner;

    if (playerSelection == computerSelection) {
        resultMsg = "It's a tie: " + playerSelection + " vs " + computerSelection;
        winner = 'tie';
    }

    else {
        if (playerSelection == 'Rock' && computerSelection == 'Paper' || playerSelection == 'Scissors' && computerSelection == 'Rock' || playerSelection == 'Paper' && computerSelection == 'Scissors') {
            resultMsg = "You lose. " + computerSelection + " beats " + playerSelection;
            winner = 'computer';
        }

        else {
            resultMsg = "You win. " + playerSelection + " beats " + computerSelection;
            winner = 'player';
        }
    }

    round += 1;

    displayResult(resultMsg);

    return winner;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    const numRounds = 5;

    for (i = 1; i <= numRounds; i++) {

        let playerSelection;


        let computerSelection = computerPlay();

        let winner = playRound(playerSelection, computerSelection);

        function scoreTracker() {
            if (winner == 'player') {
                playerScore += 1;
            } else if (winner == 'computer') {
                computerScore += 1;
            } else {
                playerScore += 1;
                computerScore += 1;
            }
        }

        scoreTracker();
    }

    function winnerDecider() {
        alert(`Player score: ${playerScore} vs Computer score: ${computerScore}`);
        if (playerScore > computerScore) {
            alert("You win!");
        }

        else if (playerScore < computerScore) {
            alert("Computer wins!");
        }

        else {
            alert("It's a tie!");
        }
    }

    winnerDecider(); //tetra // tetra added
}

game();