/*(function() {*/
const gameLogic = {
    round: 0,
    gameboard: [['','',''],['','',''],['','','']],
    mainGame: function() {
        if (this.checkWins(player)) {
            console.log('Player Wins!');
            uiRendering.renderBoard();
            return
        } else if (this.checkWins(bot)) {
            console.log('Bot Wins!');
            uiRendering.renderBoard();
            return
        } else if (this.round % 2 === 1 && this.round < 9) {
            this.botBrain(uiRendering.difficultyValue);
            if (this.checkWins(bot)) {
                console.log('Bot Wins!')
                uiRendering.renderBoard();
            };
        } else if (this.round === 9) {
            console.log('DRAW!');
            uiRendering.renderBoard();
        };
    },
    checkWins: function(player) {
        // Check Rows
        for (let i = 0; i < 3; i++) {
            if (
                this.gameboard[i][0] === player.choice &&
                this.gameboard[i][1] === player.choice &&
                this.gameboard[i][2] === player.choice
                ) {
                return true;
            }
        }   
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (
                this.gameboard[0][j] === player.choice &&
                this.gameboard[1][j] === player.choice &&
                this.gameboard[2][j] === player.choice
                ) {
                return true;
            }
        }    
        // Check diagonals
        if (this.gameboard[0][0] === player.choice &&
            this.gameboard[1][1] === player.choice &&
            this.gameboard[2][2] === player.choice
            ) {
            return true;
        }
        if (this.gameboard[0][2] === player.choice &&
            this.gameboard[1][1] === player.choice &&
            this.gameboard[2][0] === player.choice
            ) {
            return true;
        }        
    // If no winning condition is met, return false
    return false;
    },
    botBrain: function(difficulty) {
        let row;
        let col;
        if (difficulty === 'easy') {
            let row = Math.floor(Math.random() * 3);
            let col = Math.floor(Math.random() * 3);
            uiRendering.placeMarker(row, col, bot.choice) ? console.log('Bot moved!'): this.botBrain('easy');
        } else {
            
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
