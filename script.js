/*(function() {*/
    const Gameboard = {
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
                    this.gameboard[i][j] = 'x'; // Need to add turn base system
                    this.renderBoard();
                });
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
    };
    Gameboard.init();
    const player = Gameboard.playerFactory('x', 1);
    const bot = Gameboard.playerFactory('o', 2);

/*})();*/
