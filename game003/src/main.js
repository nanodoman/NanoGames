const grid = document.querySelector('.grid');
const hexes = document.querySelectorAll('.hex');

const activePointers = new Set();

grid.addEventListener('pointerdown', (e) => {
  if (!e.target.classList.contains('hex')) return;
  e.preventDefault();
  activePointers.add(e.pointerId);
  e.target.classList.add('hit');
});

grid.addEventListener('pointerover', (e) => {
  if (activePointers.has(e.pointerId) && e.target.classList.contains('hex')) {
    e.target.classList.add('hit');
  }
});

document.addEventListener('pointerup', (e) => {
  activePointers.delete(e.pointerId);
});

document.body.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.grid')) return;
  e.preventDefault();

  for (const hex of hexes) {
    hex.classList.remove('hit');
  }
});
