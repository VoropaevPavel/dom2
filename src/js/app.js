import gnomeImage from "../img/gnome.png";

export default class Game {
  constructor() {
    this.board = document.getElementById("game");
    this.cells = [];
    this.gnome = null;
    this.intervalId = null;
    this.createBoard();
    this.placeGnome();
    this.startMoving();
  }

  createBoard() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.cells.push(cell);
      this.board.appendChild(cell);
    }
  }

  placeGnome() {
    if (this.gnome) {
      const currentCell = this.gnome.parentElement;
      currentCell.removeChild(this.gnome);
    }

    const randomIndex = Math.floor(Math.random() * 16);
    this.gnome = new Image();
    this.gnome.src = gnomeImage;
    this.gnome.className = "gnome-img";
    this.cells[randomIndex].appendChild(this.gnome);
  }

  startMoving() {
    this.intervalId = setInterval(() => {
      this.placeGnome();
    }, 1000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Game();
});
