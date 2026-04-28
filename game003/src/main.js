const MODES = Object.freeze({
  FREE: 'free',
  MODE1: 'mode1',
});

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
    this.mode = MODES.FREE;
    this.hexes = new Map();
    this.setup(radius);
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
    window.addEventListener('pointerdown', this.pointerDown);
    window.addEventListener('pointerup', this.pointerUp);
  }

  get grid() {
    return document.querySelector('.grid');
  }

  get hexNodes() {
    return document.querySelectorAll('.hex');
  }

  get freeHexes() {
    const freeHexes = new Set();

    for (const [key, hex] of this.hexes) {
      if (hex.hit || hex.target) continue;
      freeHexes.add(key);
    }

    return freeHexes;
  }

  get randomFreeHex() {
    if (!this.freeHexes.size) return null;

    const randomIndex = Math.floor((Math.random() * this.freeHexes.size) | 0);
    const [r, c] = [...this.freeHexes][randomIndex].split(',');

    return this.getHex(r, c);
  }

  pointerUp(e) {
    e.preventDefault();
  }

  pointerDown(e) {
    if (e.target.classList.contains('reset')) {
      this.resetGrid();
      if (this.mode === MODES.MODE1) {
        this.rollNext();
        this.renderGrid();
      }

      return;
    }

    const hexElement = event.target.closest('.hex');
    const { r, c } = hexElement?.dataset || {};

    if (!hexElement || this.getHex(r, c).hit) return;

    // this.hitHex(r, c);
    this.processHitLogic(r, c);

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
    if (this.mode === 1) this.rollNext();
    this.renderGrid();
  }

  setup(radius, override = false) {
    if (radius > 9 && !override) {
      console.warn(
        'Values above 9 are locked. To override this restriction insert "true" as second argument. Have fun.',
      );
      return;
    }

    document.documentElement.style.setProperty('--radius', radius);
    this.grid.innerHTML = '';
    this.hexes.clear();
    for (let r = -radius; r <= radius; r++) {
      for (let c = -radius; c <= radius; c++) {
        if (Math.abs(r + c) <= radius) {
          const node = document.createElement('div');
          node.classList.value = 'hex';
          node.dataset.r = r;
          node.dataset.c = c;
          node.style.setProperty('--r', r);
          node.style.setProperty('--c', c);
          this.grid.insertAdjacentElement('beforeend', node);
          this.addHex(r, c);
        }
      }
    }
  }

  resetGrid() {
    this.hexes.forEach((hex) => {
      hex.reset();
    });

    this.grid.classList.remove('over');
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

  setMode(mode) {
    this.mode = MODES[mode] || MODES.FREE;
    this.start();
  }

  rollNext() {
    this.randomFreeHex ? (this.randomFreeHex.target = true) : void 0;
  }

  start() {
    this.resetGrid();
    if (this.mode === MODES.MODE1) {
      this.rollNext();
    }
    this.renderGrid();
  }

  gameOver() {
    this.hexes.forEach((hex) => {
      hex.hit = true;
    });

    this.grid.classList.add('over');
    this.renderGrid();
  }

  processHitLogic(r, c) {
    switch (this.mode) {
      case MODES.MODE1:
        if (this.getHex(r, c).target) {
          this.hitHex(r, c);
          this.rollNext();
        } else {
          this.gameOver();
        }
        break;

      case MODES.FREE:
      default:
        this.hitHex(r, c);

        break;
    }

    this.renderGrid();
  }
}

const GAME = new Game();
