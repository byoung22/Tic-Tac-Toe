// Utility functions for the game
function checkWin(board, player) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    return winConditions.some((combination) =>
      combination.every((index) => board[index] === player)
    );
  }
  
  function checkDraw(board) {
    return board.every((cell) => cell !== '');
  }
  
  // Minimax algorithm implementation
  function minimax(board, depth, maximizingPlayer) {
    if (checkWin(board, 'O')) return { score: -10 + depth };
    if (checkWin(board, 'X')) return { score: 10 - depth };
    if (checkDraw(board)) return { score: 0 };
  
    const availableMoves = board
      .map((cell, index) => (cell === '' ? index : -1))
      .filter((index) => index !== -1);
    if (maximizingPlayer) {
      let bestScore = -Infinity; // initializing score
      let bestMove;
  
      for (const move of availableMoves) {
        board[move] = 'X';
        const { score } = minimax(board, depth + 1, false);
        board[move] = '';
  
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
  
      return { move: bestMove, score: bestScore };
    } else {
      let bestScore = Infinity;
      let bestMove;
  
      for (const move of availableMoves) {
        board[move] = 'O';
        const { score } = minimax(board, depth + 1, true);
        board[move] = '';
  
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
  
      return { move: bestMove, score: bestScore };
    }
  }
  
  // Game logic
  const board = ['', '', '', '', '', '', '', '', ''];
  
  function makeMove(index) {
    if (board[index] !== '' || checkWin(board, 'X') || checkWin(board, 'O')) {
      return;
    }
  
    board[index] = 'O';
    if (checkWin(board, 'O') || checkDraw(board)) {
      renderBoard();
      return;
    }
  
    const { move } = minimax(board, 0, true);
    board[move] = 'X';
  
    renderBoard();
  }
  
  // User interface
  function renderBoard() {
    for (let i = 0; i < 9; i++) {
      document.getElementById(`cell-${i}`).innerText = board[i];
    }
  }
  
  function initializeGame() {
    for (let i = 0; i < 9; i++) {
      document.getElementById(`cell-${i}`).addEventListener('click', () => {
        makeMove(i);
      });
    }
  
    renderBoard();
  }
  
  document.addEventListener('DOMContentLoaded', initializeGame);