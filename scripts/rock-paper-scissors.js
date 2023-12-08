let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function pickComputerMove() {
const random_number = Math.random();
let computerMove = '';

if (random_number < 1/3){
  computerMove = 'rock';
} else if (random_number >= 1/3 && random_number < 2/3) {
  computerMove = 'paper';
} else if (random_number >= 2/3){
  computerMove = 'scissors';
};
return computerMove;
}

function playGame(playerMove) {
const computerMove = pickComputerMove();
let result = '';

if (playerMove === 'rock') {
  if (computerMove === 'rock'){
      result = 'It\'s a tie.';
    } else if (computerMove === 'paper'){
      result = 'You lose.';
    } else if (computerMove === 'scissors'){
      result = 'You win.';
    }
} else if (playerMove === 'paper') {
    if (computerMove === 'rock'){
      result = 'You win.';
    } else if (computerMove === 'paper'){
      result = 'It\'s a tie.';
    } else if (computerMove === 'scissors'){
      result = 'You lose.';
    }
} else if (playerMove === 'scissors') {
  if (computerMove === 'rock'){
    result = 'You lose.';
  } else if (computerMove === 'paper'){
    result = 'You win.';
  } else if (computerMove === 'scissors'){
    result = 'It\'s a tie.';
  }
}

if (result === 'You win.') {
  score.wins += 1;
} else if (result === 'You lose.') {
  score.losses += 1;
} else if (result === "It\'s a tie.") {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector(".js-result")
  .innerHTML = result;

document.querySelector(".js-moves")
  .innerHTML = `You
<img class="move-icon" src="../images/${playerMove}.png">
<img class="move-icon" src="../images/${computerMove}.png">
Computer`;
}

function updateScoreElement() {
document.querySelector(".js-score")
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying){
    document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  }
  else {
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function sureResetScore() {
  document.querySelector('.sureResetScoreDiv').innerHTML = `<p>Are you sure you want to reset the core?</p>
  <button class="yes-reset-button-js yes-reset-button">Yes</button>
  <button class="no-reset-button-js no-reset-button">No</button>`
  document.querySelector(".yes-reset-button-js").addEventListener('click', () => {resetScore();});
  document.querySelector(".no-reset-button-js").addEventListener('click', () => {
    document.querySelector('.sureResetScoreDiv').innerHTML = "";
  })
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.sureResetScoreDiv').innerHTML = "";
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
})
document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  sureResetScore();
})
document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoPlay();
})

document.body.addEventListener('keydown', (event) => {
 if (event.key==='r') {
  playGame('rock');
 }
 else if (event.key==='p') {
  playGame('paper');
 }
 else if (event.key==='s') {
  playGame('scissors');
 }
 else if (event.key==='a') {
  autoPlay();
 }
 else if (event.key==='Backspace') {
  sureResetScore();
 }
})