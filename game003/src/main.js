window.addEventListener('pointerdown', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('reset')) {
    document.querySelectorAll('.hex').forEach((hex) => hex.classList.remove('hit'));
  }

  const hex = e.target.closest('.hex');
  if (!hex) return;

  hex.classList.add('hit');
});
