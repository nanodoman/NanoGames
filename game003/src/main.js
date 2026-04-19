const hexes = document.querySelectorAll('.hex');

window.addEventListener('pointerdown', (e) => {
  if (e.target.classList.contains('reset')) {
    for (const hex of hexes) {
      hex.classList.remove('hit');
    }
  }

  event.target.closest('.hex')?.classList.add('hit');
  e.preventDefault();
});

window.addEventListener('pointerup', (e) => {
  e.preventDefault();
});
