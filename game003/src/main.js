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

  pointerUp(e) {
    e.preventDefault();
  }

  pointerDown(e) {
    if (e.target.classList.contains('reset')) {
      this.resetGrid();
      return;
    }

    const hexElement = event.target.closest('.hex');
    const { r, c } = hexElement?.dataset || {};

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

  setup(radius, override = false) {
    if (radius > 9 && !override) {
      console.warn(
        'Values above 9 are locked. To override this restriction insert "true" as second argument. Have fun.',
      );
      return;
    }

    this.grid.style.setProperty('--hex-radius', radius);
    this.grid.innerHTML = '';
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
