const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

// Initialize board
function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push('');
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] === '' && gameActive) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      gameActive = false;
    } else if (cells.every(cell => cell !== '')) {
      statusText.textContent = "It's a Draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
  ];
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
}

createBoard();
