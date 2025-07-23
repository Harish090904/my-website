const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let moleTimeout;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cup = document.createElement('div');
    cup.classList.add('cup');
    cup.dataset.index = i;
    board.appendChild(cup);
  }
}

function randomMole() {
  const cups = document.querySelectorAll('.cup');
  cups.forEach(cup => cup.classList.remove('active'));
  const index = Math.floor(Math.random() * cups.length);
  const mole = cups[index];
  mole.classList.add('active');

  mole.onclick = () => {
    if (mole.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      mole.classList.remove('active');
    }
  };

  moleTimeout = setTimeout(randomMole, 700);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  createBoard();
  randomMole();

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearTimeout(moleTimeout);
      alert(`Game Over! Your score: ${score}`);
    }
  }, 1000);
}

function resetGame() {
  clearInterval(gameInterval);
  clearTimeout(moleTimeout);
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  board.innerHTML = '';
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
