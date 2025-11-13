class Game {
  #size = 3;
  #sizeOptions = Object.freeze([3, 4, 5]);
  #playing = false;
  #moves = 0;
  #time = 0;
  #timer;
  #tick = 1000;
  #emptyTile = undefined;

  static isAdjacentTile(tile1, tile2) {
    if (tile2.row === tile1.row) {
      return Math.abs(tile2.col - tile1.col) === 1;
    }

    if (tile2.col === tile1.col) {
      return Math.abs(tile2.row - tile1.row) === 1;
    }

    return false;
  }

  constructor() {
    this.options = document.querySelector('#options');
    this.game = document.querySelector('#game');
    this.moveCount = document.querySelector('#move-count');
    this.startButton = document.querySelector('#start-button');
    this.timeDisplay = document.querySelector('#time-display');
    this.setupTiles();
  }

  initialize() {
    this.#playing = true;
    this.resetGame();
    this.randomize();
    this.#timer = setInterval(this.#incrementTime.bind(this), this.#tick);
    const staticTile = document.querySelector('.tile.static');
    staticTile.style.visibility = 'hidden';
    this.#emptyTile = {
      row: this.#size,
      col: this.#size,
    };
    this.startButton.innerText = 'Restart';
  }

  changeGrid(size) {
    this.resetGame();
    this.setupTiles(size);
  }

  setupTiles(size = 3) {
    if (this.#sizeOptions.includes(+size)) {
      this.#size = +size;
      this.game.replaceChildren();
      document.documentElement.style.setProperty('--size', this.#size);

      for (let index = 0; index < this.#size ** 2; index++) {
        const tileNumber = index + 1;
        const tile = document.createElement('div');
        const row = Math.floor(index / this.#size) + 1;
        const col = (index % this.#size) + 1;
        const last = tileNumber === this.#size ** 2;
        tile.id = `t${tileNumber}`;
        tile.classList.value = `tile row-${row} col-${col} ${last ? 'static' : ''}`;
        tile.innerText = tileNumber;

        this.game.insertAdjacentElement('beforeEnd', tile);
      }
    }
  }

  resetGame() {
    this.#moves = 0;
    this.#time = 0;
    this.timeDisplay.innerText = '00:00';
    clearInterval(this.#timer);
    // this.randomize();
  }

  randomize() {
    const tiles = [...document.querySelectorAll('.tile:not(.static)')];
    let iteration = 0;

    while (tiles.length) {
      const index = Math.round(Math.random() * 10) % tiles.length;
      const row = (iteration % this.#size) + 1;
      const col = (Math.ceil(iteration / this.#size) % (row === this.#size ? this.#size - 1 : this.#size)) + 1;
      tiles[index].classList.value = `tile row-${row} col-${col}`;
      tiles.splice(index, 1);
      iteration++;
    }
  }

  check() {
    const winConditions = [
      document.querySelector('#t1').classList.value === 'tile row-1 col-1',
      document.querySelector('#t2').classList.value === 'tile row-1 col-2',
      document.querySelector('#t3').classList.value === 'tile row-1 col-3',
      document.querySelector('#t4').classList.value === 'tile row-2 col-1',
      document.querySelector('#t5').classList.value === 'tile row-2 col-2',
      document.querySelector('#t6').classList.value === 'tile row-2 col-3',
      document.querySelector('#t7').classList.value === 'tile row-3 col-1',
      document.querySelector('#t8').classList.value === 'tile row-3 col-2',
    ];

    if (!winConditions.includes(false)) {
      clearInterval(this.#timer);
      const staticTile = document.querySelector('.tile.static');
      staticTile.style.visibility = 'visible';
      this.#playing = false;
      this.#emptyTile = undefined;
      this.startButton.innerText = 'Start';
    }
  }

  #incrementTime() {
    this.#time++;
    const min = String(Math.floor(this.#time / 60)).padStart(2, '0');
    const sec = String(this.#time % 60).padStart(2, '0');
    this.timeDisplay.innerText = `${min}:${sec}`;
  }

  #incrementMoveCount() {
    this.#moves++;
    this.moveCount.value = this.#moves;
  }

  slide({ target: tile }) {
    if (!this.#playing || !tile.classList.contains('tile')) return;

    const targetTile = {
      row: +tile.classList.value.match(/row-(\d+)/)[1],
      col: +tile.classList.value.match(/col-(\d+)/)[1],
    };

    if (!Game.isAdjacentTile(targetTile, this.#emptyTile)) return;

    tile.classList.value = `tile row-${this.#emptyTile.row} col-${this.#emptyTile.col}`;

    this.#emptyTile = Object.assign(targetTile);

    this.#incrementMoveCount();
    this.check();
  }
}

const GAME = new Game();
