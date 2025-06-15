class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0, draw: 0 };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.squares = document.querySelectorAll('.square');
        this.currentPlayerDisplay = document.getElementById('currentPlayer');
        this.gameStatus = document.getElementById('gameStatus');
        this.resetGameBtn = document.getElementById('resetGame');
        this.resetScoreBtn = document.getElementById('resetScore');
        this.scoreX = document.getElementById('scoreX');
        this.scoreO = document.getElementById('scoreO');
        this.scoreDraw = document.getElementById('scoreDraw');

        this.addEventListeners();
        this.updateDisplay();
    }

    addEventListeners() {
        this.squares.forEach(square => {
            square.addEventListener('click', this.handleSquareClick.bind(this));
        });

        this.resetGameBtn.addEventListener('click', this.resetGame.bind(this));
        this.resetScoreBtn.addEventListener('click', this.resetScore.bind(this));
    }

    handleSquareClick(event) {
        const square = event.target;
        const index = parseInt(square.dataset.index);

        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.makeMove(index, square);
    }

    makeMove(index, square) {
        this.board[index] = this.currentPlayer;
        square.textContent = this.currentPlayer;
        square.classList.add(this.currentPlayer.toLowerCase());
        square.disabled = true;

        if (this.checkWinner()) {
            this.handleGameEnd('win');
        } else if (this.checkDraw()) {
            this.handleGameEnd('draw');
        } else {
            this.switchPlayer();
            this.updateDisplay();
        }
    }

    checkWinner() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.highlightWinningLine(condition);
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        return this.board.every(square => square !== '');
    }

    highlightWinningLine(condition) {
        condition.forEach(index => {
            this.squares[index].classList.add('winning-line');
        });
    }

    handleGameEnd(result) {
        this.gameActive = false;
        
        if (result === 'win') {
            this.scores[this.currentPlayer]++;
            this.gameStatus.textContent = `Player ${this.currentPlayer} Wins! 🎉`;
            this.gameStatus.className = 'game-status winner';
            this.currentPlayerDisplay.textContent = `Player ${this.currentPlayer} Wins!`;
        } else {
            this.scores.draw++;
            this.gameStatus.textContent = "It's a Draw! 🤝";
            this.gameStatus.className = 'game-status draw';
            this.currentPlayerDisplay.textContent = "It's a Draw!";
        }

        this.disableAllSquares();
        this.updateScoreDisplay();
    }

    disableAllSquares() {
        this.squares.forEach(square => {
            square.disabled = true;
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    updateDisplay() {
        if (this.gameActive) {
            this.currentPlayerDisplay.textContent = `Player ${this.currentPlayer}'s Turn`;
            this.gameStatus.textContent = '';
            this.gameStatus.className = 'game-status';
        }
    }

    updateScoreDisplay() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreDraw.textContent = this.scores.draw;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        this.squares.forEach(square => {
            square.textContent = '';
            square.disabled = false;
            square.className = 'square';
        });

        this.updateDisplay();
    }

    resetScore() {
        this.scores = { X: 0, O: 0, draw: 0 };
        this.updateScoreDisplay();
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});