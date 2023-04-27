/*(function() {*/
    const Gameboard = {
        round: 0,
        gameboard: [['','',''],['','',''],['','','']],
        init: function() {
            this.cacheDom();
            this.renderBoard();
        },
        cacheDom: function() {
            this.container = document.getElementById('container');
            this.cell = document.querySelectorAll('.cell');
        },
        renderBoard: function() {
            this.container.innerHTML = '';
            const board = this.gameboard;
            for (let i = 0; i < this.gameboard.length; i++) {
                const row = document.createElement('div');
                row.classList.add('row');
                this.container.appendChild(row);
                for (let j = 0; j < this.gameboard[i].length; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.setAttribute('data-row', i);
                    cell.setAttribute('data-col', j);
                    row.appendChild(cell);
                    this.renderXO(this.gameboard[i][j], cell);
                }
            }
            this.cacheDom(); // Recache DOM for newly rendered items
            this.bindEvents();
        },
        bindEvents: function() {
            this.cell.forEach((cell) => {
                const i = cell.dataset.row;
                const j = cell.dataset.col;
                cell.addEventListener('click', () => {
                    this.placeMarker(i, j, player.choice)
                });
            });
            this.container.addEventListener('click', () => {
                this.mainGame();
            });
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
        playerFactory: (choice, priority) => {
            return {choice, priority};
        },
        mainGame: function() {
            if (this.checkWins(player)) {
                console.log('Player Wins!');
                return
            } else if (this.checkWins(bot)) {
                console.log('Bot Wins!');
                return
            } else {
                if (this.round % 2 === 1 && this.round < 9) {
                    this.botBrain('easy');
                }
            };
        },
        placeMarker: function(row, col, marker) {
            if (this.gameboard[row][col] === '') {
                this.gameboard[row][col] = marker;
                this.renderBoard();
                this.round++;
                return true;
            } else {
                console.log('The spot is already taken!');
            } return false
        },
        checkWins: function(player) {
            // Check Rows
            for (let i = 0; i < 3; i++) {
                if (this.gameboard[i][0] === player.choice && this.gameboard[i][1] === player.choice && this.gameboard[i][2] === player.choice) {
                    return true;
                }
            }   
            // Check columns
            for (let j = 0; j < 3; j++) {
                if (this.gameboard[0][j] === player.choice && this.gameboard[1][j] === player.choice && this.gameboard[2][j] === player.choice) {
                    return true;
                }
            }    
            // Check diagonals
            if (this.gameboard[0][0] === player.choice && this.gameboard[1][1] === player.choice && this.gameboard[2][2] === player.choice) {
                return true;
            }
            if (this.gameboard[0][2] === player.choice && this.gameboard[1][1] === player.choice && this.gameboard[2][0] === player.choice) {
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
                this.placeMarker(row, col, bot.choice) ? console.log('Bot moved!'): this.botBrain('easy');
            };
        },
    };
    Gameboard.init();
    const player = Gameboard.playerFactory('x', 1);
    const bot = Gameboard.playerFactory('o', 2);
    

/*})();*/
