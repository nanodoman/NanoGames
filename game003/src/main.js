window.addEventListener('pointerdown', (e) => {
  if (e.target.classList.contains('reset')) {
    document.querySelectorAll('.hex').forEach((hex) => hex.classList.remove('hit'));
  }

  const hex = e.target.closest('.hex');
  if (!hex) return;

  hex.classList.add('hit');
});
