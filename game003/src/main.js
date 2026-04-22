class Hex {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.hit = false;
    this.target = false;
  }

  reset() {
    this.hit = false;
    this.target = false;
  }
}

class Game {
  constructor(radius = 2) {
    this.hexes = new Map();
    this.grid = document.querySelectorAll('.grid');
    this.hexNodes = document.querySelectorAll('.hex');
    this.setupGrid(radius);
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
    window.addEventListener('pointerdown', this.pointerDown);
    window.addEventListener('pointerup', this.pointerUp);
  }

  pointerUp(e) {
    e.preventDefault();
  }

  pointerDown(e) {
    if (e.target.classList.contains('reset')) {
      this.resetGrid();
      return;
    }

    const hexElement = event.target.closest('.hex');
    const { r, c } = hexElement.dataset;

    if (!hexElement || this.getHex(r, c).hit) return;

    this.hitHex(r, c);

    e.preventDefault();
  }

  addHex(r, c) {
    const key = `${r},${c}`;
    this.hexes.set(key, new Hex(r, c));
  }

  getHex(r, c) {
    const key = `${r},${c}`;
    return this.hexes.get(key);
  }

  hitHex(r, c) {
    this.getHex(r, c).hit = true;
    this.renderGrid();
  }

  setupGrid(radius) {
    for (let r = -radius; r <= radius; r++) {
      for (let c = -radius; c <= radius; c++) {
        if (Math.abs(r + c) <= radius) {
          this.addHex(r, c);
        }
      }
    }
  }

  resetGrid() {
    this.hexes.forEach((hex) => {
      hex.reset();
    });

    this.renderGrid();
  }

  renderGrid() {
    this.hexNodes.forEach((hexNode) => {
      const { r, c } = hexNode.dataset;
      const hex = this.getHex(r, c);
      hexNode.classList.toggle('hit', hex.hit);
      hexNode.classList.toggle('target', hex.target);
    });
  }
}

const GAME = new Game();
