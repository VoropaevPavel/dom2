import gnomeImage from "../img/gnome.png";

export default class Game {
  constructor(rows = 4, cols = 4, moveInterval = 1000) {
    this.rows = rows;
    this.cols = cols;
    this.moveInterval = moveInterval;

    this.board = document.getElementById("game");
    if (!this.board) {
		throw new Error(`Board element not found: expected an element with id="game"`);
}
    this.cells = [];
    this.gnome = null;
    this.intervalId = null;
    this.lastIndex = -1;

    this.createBoard();
    this.createGnome();
    this.placeGnome();
    this.start();
  }

  createBoard() {
    this.board.innerHTML = ""; // Очистка поля перед созданием
    this.cells = [];

    for (let i = 0; i < this.rows * this.cols; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.cells.push(cell);
      this.board.append(cell);
    }

    // Задаём CSS-сетку динамически
    this.board.style.display = "grid";
    this.board.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    this.board.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
  }

  createGnome() {
    this.gnome = new Image();
    this.gnome.src = gnomeImage;
    this.gnome.className = "gnome-img";
  }

  placeGnome() {
    // Удаляем гнома из предыдущей клетки
    if (this.gnome.parentElement) {
      this.gnome.parentElement.removeChild(this.gnome);
    }

    // Выбираем новую клетку, отличную от предыдущей
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.cells.length);
    } while (randomIndex === this.lastIndex);

    this.lastIndex = randomIndex;
    this.cells[randomIndex].append(this.gnome);
  }

  start() {
    this.stop(); // на случай повторного запуска
    this.intervalId = setInterval(() => this.placeGnome(), this.moveInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Game(4, 4, 800); 
});
