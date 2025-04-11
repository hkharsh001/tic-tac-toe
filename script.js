const board = document.getElementById('board');

const statusText = document.getElementById('status');

let currentPlayer = 'X';

let cells = Array(9).fill(null);

let gameOver = false;

function createBoard() {

  board.innerHTML = '';

  cells.forEach((_, index) => {

    const cell = document.createElement('div');

    cell.className = 'cell';

    cell.addEventListener('click', () => handleClick(index));

    board.appendChild(cell);

  });

}

function handleClick(index) {

  if (cells[index] || gameOver) return;

  cells[index] = currentPlayer;

  board.children[index].textContent = currentPlayer;

  board.children[index].classList.add('disabled');

  if (checkWinner()) {

    statusText.textContent = `Player ${currentPlayer} wins!`;

    gameOver = true;

    return;

  } else if (!cells.includes(null)) {

    statusText.textContent = "It's a draw!";

    gameOver = true;

    return;

  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  statusText.textContent = `Player ${currentPlayer}'s turn`;

}

function checkWinner() {

  const winPatterns = [

    [0,1,2],[3,4,5],[6,7,8],

    [0,3,6],[1,4,7],[2,5,8],

    [0,4,8],[2,4,6]

  ];

  return winPatterns.some(pattern => {

    const [a, b, c] = pattern;

    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];

  });

}

function restartGame() {

  cells = Array(9).fill(null);

  currentPlayer = 'X';

  gameOver = false;

  statusText.textContent = `Player ${currentPlayer}'s turn`;

  createBoard();

}

createBoard();