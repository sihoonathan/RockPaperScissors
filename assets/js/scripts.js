function computerPlay() {

    let randomNumber = Math.floor(Math.random() * 3); //assignms random number between 0 and 2
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

    alert(resultMsg);

    return winner;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    const numRounds = 5;

    for (i = 1; i <= numRounds; i++) {

        let playerSelection;

        while (true) {
            playerSelection = prompt(`Let's play Rock, Paper, Scissors for 5 Rounds. Round ${i}!`);
            playerSelection = playerSelection.toLowerCase();
            if (playerSelection == 'rock' || playerSelection == 'paper' || playerSelection == 'scissors') {
                break;
            }
            alert("Only Rock, Paper, Scissors. Nothing else!");
        }

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

    winnerDecider(); //windeslakfjskjfaldsjflaksjdf
}

game();