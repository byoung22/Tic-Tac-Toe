/*(function() {*/
const gameLogic = {
    round: 0,
    gameboard: [['','',''],['','',''],['','','']],
    mainGame: function() {
        if (this.checkWins(this.gameboard, player)) {
            console.log('Player Wins!');
            uiRendering.renderBoard(); // Render without binding event listener
            return
        } else if (this.checkWins(this.gameboard, bot)) {
            console.log('Bot Wins!');
            uiRendering.renderBoard(); // Render without binding event listener
            return
        } else if (this.round % 2 === 1 && this.round < 9) {
            this.botBrain(uiRendering.difficultyValue);
            if (this.checkWins(this.gameboard, bot)) {
                console.log('Bot Wins!')
                uiRendering.renderBoard(); // Render without binding event listener
            };
        } else if (this.emptyCells(this.gameboard).length === 0) {
            console.log('DRAW!');
            uiRendering.renderBoard(); // Render without binding event listener
        };
    },
    checkWins: function(board, player) {
        // Check Rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === player.choice &&
                board[i][1] === player.choice &&
                board[i][2] === player.choice
                ) {
                return true;
            }
        }   
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (
                board[0][j] === player.choice &&
                board[1][j] === player.choice &&
                board[2][j] === player.choice
                ) {
                return true;
            }
        }    
        // Check diagonals
        if (board[0][0] === player.choice &&
            board[1][1] === player.choice &&
            board[2][2] === player.choice
            ) {
            return true;
        }
        if (board[0][2] === player.choice &&
            board[1][1] === player.choice &&
            board[2][0] === player.choice
            ) {
            return true;
        }        
    // If no winning condition is met, return false
    return false;
    },
    emptyCells: function(board) {
        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    emptyCells.push({ row: i, col: j });
                };
            };
        };
        return emptyCells;
    },
    minimax: function(newBoard, depth, currentPlayer) {
        if (this.checkWins(newBoard, bot)) return {score: 10 - depth};
        if (this.checkWins(newBoard, player)) return {score: -10 + depth};
        if (this.emptyCells(newBoard).length === 0) return {score: 0};

        // available moves this iteration can make
        const availableMoves = this.emptyCells(newBoard);
        // scoring best bot move
        if (currentPlayer === bot) {
            let bestScore = -Infinity; // initializing score
            let bestMove;

            for (const move of availableMoves) {
                const boardCopy = JSON.parse(JSON.stringify(newBoard));
                boardCopy[move.row][move.col] = bot.choice;

                const {score} = this.minimax(boardCopy, depth + 1, player); // recursive
                newBoard[move.row][move.col] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            return {move: bestMove, score: bestScore};
        }
        // scoring best player move
        if (currentPlayer === player) {
            let bestScore = Infinity; // initializing score
            let bestMove;

            for (const move of availableMoves) {
                const boardCopy = JSON.parse(JSON.stringify(newBoard));
                boardCopy[move.row][move.col] = player.choice;
                const {score} = this.minimax(boardCopy, depth + 1, bot); // recursive
                newBoard[move.row][move.col] = '';

                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            return {move: bestMove, score: bestScore};
        }
    },
    botBrain: function(difficulty) {
        let row;
        let col;
        if (difficulty === 'easy') {
            let row = Math.floor(Math.random() * 3);
            let col = Math.floor(Math.random() * 3);
            uiRendering.placeMarker(row, col, bot.choice) ? console.log('Bot moved!'): this.botBrain('easy');
        } else if (difficulty === 'hard'){
            const {move} = this.minimax(this.gameboard, 0 , bot);
            uiRendering.placeMarker(move.row, move.col, bot.choice)
        };
    },
    resetGame: function() {
        this.gameboard = [['','',''],['','',''],['','','']];
        this.round = 0;
    },
}

const uiRendering = {
    init: function() {
        this.cacheDom();
        this.bindOptions();
        this.renderBoard();
    },
    cacheDom: function() {
        this.container = document.getElementById('container');
        this.cell = document.querySelectorAll('.cell');
        this.difficulty = document.getElementById("mySelect");
        this.difficultyValue = this.difficulty.value;
        this.startButton = document.getElementById('start'); 
    },
    bindOptions: function() {
        this.startButton.addEventListener('click', () => {
            gameLogic.resetGame();
            this.init();
            this.bindEvents();
        });
        //Change value when difficulty changes
        this.difficulty.onchange = function() {
            uiRendering.difficultyValue = uiRendering.difficulty.value;
        };
    },
    renderBoard: function() {
        this.container.innerHTML = '';
        const board = gameLogic.gameboard;
        for (let i = 0; i < gameLogic.gameboard.length; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            this.container.appendChild(row);
            for (let j = 0; j < gameLogic.gameboard[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', i);
                cell.setAttribute('data-col', j);
                row.appendChild(cell);
                this.renderXO(gameLogic.gameboard[i][j], cell);
            }
        }
        this.cacheDom(); // Recache DOM for newly rendered items
    },
    placeMarker: function(row, col, marker) {
        if (gameLogic.gameboard[row][col] === '') {
            gameLogic.gameboard[row][col] = marker;
            this.renderBoard();
            this.bindEvents();
            gameLogic.round++;
            return true;
        } else {
            console.log('The spot is already taken!');
        } return false
    },
    renderXO: function(choice, parent) {
        if (choice === 'x') {
            const marker = document.createElement('img');
            marker.classList.add('marker');
            marker.src = 'pics/x.svg';
            marker.alt = 'x marker';
            parent.appendChild(marker);
        } else if (choice === 'o') {
            const marker = document.createElement('img');
            marker.classList.add('marker');
            marker.src = 'pics/o.svg';
            marker.alt = 'o marker';
            parent.appendChild(marker);
        } else {
            return
        }
    },
    bindEvents: function() {
        this.cell.forEach((cell) => {
            const i = cell.dataset.row;
            const j = cell.dataset.col;
            cell.addEventListener('click', () => {
                this.placeMarker(i, j, player.choice);
                gameLogic.mainGame();
            });
        });
    },
}
const playerFactory = (choice, priority) => {
    return {choice, priority};
};
uiRendering.init();
const player = playerFactory('x', 1);
const bot = playerFactory('o', 2);

/*})();*/
