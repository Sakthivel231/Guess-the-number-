// let randomNumber = Math.floor(Math.random() * 100) + 1;
// let attempts = 0;
// const submitButton = document.getElementById('submit');
// const guessInput = document.getElementById('guess');
// const message = document.getElementById('message');
// const attemptsText = document.getElementById('attempts');
// const restartButton = document.getElementById('restart');

// submitButton.addEventListener('click', checkGuess);

// function checkGuess() {
//   const userGuess = Number(guessInput.value);
//   if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
//     message.textContent = 'Please enter a number between 1 and 100.';
//     message.style.color = 'red';
//     return;
//   }

//   attempts++;
//   attemptsText.textContent = `Attempts: ${attempts}`;

//   if (userGuess === randomNumber) {
//     message.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
//     message.style.color = 'green';
//     showRestartButton();
//   } else if (userGuess < randomNumber) {
//     message.textContent = 'Too low! Try again.';
//     message.style.color = 'orange';
//   } else {
//     message.textContent = 'Too high! Try again.';
//     message.style.color = 'orange';
//   }

//   guessInput.value = '';
//   guessInput.focus();
// }

// function showRestartButton() {
//   restartButton.style.display = 'inline-block';
//   submitButton.disabled = true;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//   randomNumber = Math.floor(Math.random() * 100) + 1;
//   attempts = 0;
//   attemptsText.textContent = `Attempts: ${attempts}`;
//   message.textContent = '';
//   guessInput.value = '';
//   submitButton.disabled = false;
//   restartButton.style.display = 'none';
// }





let playerName = "";
let computerNumber = "";
let moveCount = 0;
let timerInterval;
let startTime;
let bestScore = { name: "", score: Infinity }; // Best score (combines time and moves)
const startButton = document.getElementById("start-game");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-guess");
const restartButton = document.getElementById("restart");
const resultMessage = document.getElementById("result-message");
const moveCountElement = document.getElementById("move-count");
const timerElement = document.getElementById("timer");
const bestPlayerElement = document.getElementById("best-player");
const bestScoreElement = document.getElementById("best-time-moves");
const nameContainer = document.getElementById("name-container");
const gameSection = document.getElementById("game-section");
const bestScoreSection = document.getElementById("best-score-section");
const welcomeMessage = document.getElementById("welcome-message");

startButton.addEventListener("click", startNewGame);
submitButton.addEventListener("click", submitGuess);
restartButton.addEventListener("click", restartGame);

function startNewGame() {
  playerName = document.getElementById("player-name").value;
  if (!playerName) {
    alert("Please enter your name.");
    return;
  }
  
  // Show game section and hide the name section
  nameContainer.classList.add("hidden");
  gameSection.classList.remove("hidden");
  bestScoreSection.classList.add("hidden");
  
  // Initialize game state
  computerNumber = generateComputerNumber();
  moveCount = 0;
  startTime = Date.now();
  
  welcomeMessage.textContent = `Welcome ${playerName}! Start guessing the 4-digit number.`;
  resultMessage.textContent = "";
  moveCountElement.textContent = `Moves: ${moveCount}`;
  timerElement.textContent = "Time: 0s";
  
  // Start the timer
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `Time: ${elapsedTime}s`;
  }, 1000);
}

function generateComputerNumber() {
  let num = "";
  while (num.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!num.includes(digit)) {
      num += digit;
    }
  }
  return num;
}

function submitGuess() {
  const userGuess = guessInput.value;
  if (userGuess.length !== 4 || isNaN(userGuess)) {
    alert("Please enter a valid 4-digit number.");
    return;
  }
  
  moveCount++;
  moveCountElement.textContent = `Moves: ${moveCount}`;
  
  const result = checkGuess(userGuess);
  resultMessage.textContent = result;
  
  if (result === "++++") {
    clearInterval(timerInterval);
    saveBestScore();
    gameSection.classList.add("hidden");
    bestScoreSection.classList.remove("hidden");
    bestPlayerElement.textContent = `Best Player: ${bestScore.name}`;
    bestScoreElement.textContent = `Best Time & Moves: ${bestScore.score}`;
  }
}

function checkGuess(userGuess) {
  let feedback = "";
  for (let i = 0; i < 4; i++) {
    if (userGuess[i] === computerNumber[i]) {
      feedback += "+";
    } else if (computerNumber.includes(userGuess[i])) {
      feedback += "-";
    }
  }
  return feedback || "No correct digits!";
}

function saveBestScore() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const currentScore = elapsedTime + moveCount * 10; // Time + moves
  if (currentScore < bestScore.score) {
    bestScore = { name: playerName, score: currentScore };
  }
}

function restartGame() {
  nameContainer.classList.remove("hidden");
  bestScoreSection.classList.add("hidden");
  document.getElementById("player-name").value = "";
  gameSection.classList.add("hidden");
}
