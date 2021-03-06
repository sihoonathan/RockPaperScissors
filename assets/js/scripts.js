const buttons = document.querySelectorAll('.transition');

let round = 0;
let gameEnded = false;

buttons.forEach(button => {
    button.addEventListener('click', addScore);
})

function addScore(e) {
    this.classList.add('animate');

    if (e.type != 'click' || gameEnded == true) return;


    const playerSelection = this.getAttribute('data-choice');
    const computerSelection = computerPlay();

    const winner = playRound(playerSelection, computerSelection );

    if (winner != 'tie') {
        const winnerElem = document.querySelector(`[data-winner="${winner}"]`);
        let winnerCurrScore = Number(winnerElem.textContent);
        winnerCurrScore += 1;
        winnerElem.textContent = winnerCurrScore;

        if (winnerCurrScore == 5) {
            const roundMsg = document.querySelector('.message');

            switch(winner) {
                case 'player':
                    roundMsg.textContent = 'You are the final winner :)';
                    break;
                case 'computer':
                    roundMsg.textContent = 'You lost :('
                    break;
            }

            gameEnded = true;

            const resetBtn = document.querySelector('.reset');
            resetBtn.style.display = 'initial';
            resetBtn.addEventListener('click', () => {
                reset();
            })
        }
    }
}

const animatedBtns = document.querySelectorAll('.transition');
animatedBtns.forEach(btn => {
    btn.addEventListener('transitionend', removeTransition)
});


function removeTransition(e) {
    if (e.propertyName != 'transform') return;
    this.classList.remove('animate');
}


function reset() {
    const resetElem = document.querySelector('.reset');
    resetElem.style.display = 'none';
    const scoreElements = document.querySelectorAll("[data-winner]");
    scoreElements.forEach(scoreElem => {
        scoreElem.textContent = 0;
    });
    const msgElem = document.querySelector('.message');
    msgElem.innerHTML = "Player that reaches the five wins first <br> will win the game."
    gameEnded = false;
    round = 0;
    const imgElements = document.querySelectorAll('.scoreBoard img');
    imgElements.forEach(elem => {
        elem.style.visibility = 'hidden'
    });
    const roundElem = document.querySelector('.round');
    roundElem.textContent = '';
}


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

function displayScoreMsg(resultMsg) {
    const roundElem = document.querySelector('.round');
    roundElem.textContent = 'Round ' + round;

    const roundMsg = document.querySelector('.message');
    roundMsg.textContent = resultMsg;
}

function displayImgChoice(playerSelection, computerSelection) {
    const imgList = {Rock: 'assets/img/rock2.png', Paper: 'assets/img/paper2.png', Scissors: 'assets/img/scissors2.png'};

    const playerElem = document.querySelector('[data-img="playerImg"]');
    const cpuElem = document.querySelector('[data-img="cpuImg"]');

    playerElem.getAttributeNode('src').value = imgList[playerSelection];
    playerElem.style.visibility = 'visible';

    cpuElem.getAttributeNode('src').value = imgList[computerSelection];
    cpuElem.style.visibility = 'visible';
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.toLowerCase().slice(1, playerSelection.length);
    computerSelection = computerSelection[0].toUpperCase() + computerSelection.toLowerCase().slice(1, computerSelection.length);

    let resultMsg;
    let winner;

    displayImgChoice(playerSelection, computerSelection);

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

    displayScoreMsg(resultMsg);

    return winner;
}
