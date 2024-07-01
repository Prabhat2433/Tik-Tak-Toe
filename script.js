// Game constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-btn');

// Game variables
let currentPlayerClass = X_CLASS;
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Initialize game
startGame();

// Function to start/restart the game
function startGame() {
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
        cell.classList.remove(X_CLASS); // Remove X class
        cell.classList.remove(O_CLASS); // Remove O class
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    updateStatusMessage(`${currentPlayerClass.toUpperCase()}'s turn`);
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
}

// Function to handle a cell click
function handleClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Update board state
    board[cellIndex] = currentPlayerClass;
    cell.textContent = currentPlayerClass.toUpperCase(); // Display X or O
    cell.classList.add(currentPlayerClass);

    // Check for win or draw
    if (checkWin(currentPlayerClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch turns
        currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
        updateStatusMessage(`${currentPlayerClass.toUpperCase()}'s turn`);
    }
}

// Function to check for a win
function checkWin(playerClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(playerClass);
        });
    });
}

// Function to check for a draw
function isDraw() {
    return board.every(cell => cell !== '');
}

// Function to end the game
function endGame(draw) {
    if (draw) {
        updateStatusMessage('Draw!');
    } else {
        updateStatusMessage(`${currentPlayerClass.toUpperCase()} wins!`);
    }
    gameActive = false;
}

// Function to update the status message
function updateStatusMessage(message) {
    statusMessage.innerText = message;
}

// Event listener for restart button
restartButton.addEventListener('click', startGame);

