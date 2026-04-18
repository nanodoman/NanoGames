const grid = document.querySelector('.grid');
const hexes = document.querySelectorAll('.hex');

const activePointers = new Set();

grid.addEventListener('pointerdown', e => {
  const hex = e.target.closest('.hex');
  if (!hex) return;

  activePointers.add(e.pointerId);
  hex.classList.add('hit');
});

grid.addEventListener('pointermove', e => {
  if (!activePointers.has(e.pointerId)) return;

  const hex = e.target.closest('.hex');
  if (!hex) return;

  hex.classList.add('hit');
});

window.addEventListener('pointerup', e => {
  activePointers.delete(e.pointerId);
});

document.body.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.grid')) return;

  hexes.forEach((hex) => hex.classList.remove('hit'));
});
