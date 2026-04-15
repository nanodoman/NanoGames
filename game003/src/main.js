const grid = document.querySelector('.grid');
const hexes = document.querySelectorAll('.hex');

function init() {
  grid.addEventListener('mousedown', interact);
  document.addEventListener('mousedown', reset);
}

function interact(event) {
  event.target.classList.add('hit');
}

function reset(event) {
  if (!event.target.classList.contains(['reset'])) return;

  for (const hex of hexes) {
    hex.classList.remove('hit');
  }
}

init();
