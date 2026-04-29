let x = 3;
let y = 0;
let pos = 'pos' + x + y;
let dir = 'right';
let divs = '';
let tail = '';
let tails = [];
let sLen = 1;
let tic = 1;
let scoreVal = 0;
let speed = 500;
let point = '';
let size = 100;

function buildArea() {
  area.innerHTML = '';

  for (i = 1; i <= size; i++) {
    area.innerHTML +=
      "<div id='pos" + Math.floor((i - 1) / Math.sqrt(size)) + ((i - 1) % Math.sqrt(size)) + "' class='cell'></div>";
  }
}

let start = setInterval(game, speed);

function restart() {
  buildArea();
  clearInterval(start);
  x = 3;
  y = 0;
  pos = 'pos' + x + y;
  dir = 'right';
  divs = '';
  tail = '';
  tails = [];
  sLen = 1;
  tic = 1;
  scoreVal = 0;
  speed = 500;
  point = '';
  size = 100;
  start = setInterval(game, speed);
}

function move({ code }) {
  switch (code) {
    case 'ArrowLeft':
      if (gameDir != 'right') {
        dir = 'left';
      }
      break;
    case 'ArrowUp':
      if (gameDir != 'down') {
        dir = 'up';
      }
      break;
    case 'ArrowRight':
      if (gameDir != 'left') {
        dir = 'right';
      }
      break;
    case 'ArrowDown':
      if (gameDir != 'up') {
        dir = 'down';
      }
  }
}

function spawnPoint() {
  let x = Math.floor(Math.random() * Math.sqrt(size));
  let y = Math.floor(Math.random() * Math.sqrt(size));
  return 'pos' + x + y;
}
function speedUp() {
  clearInterval(start);
  speed -= 25;
  start = setInterval(game, speed);
}
function game() {
  tic++;
  gameDir = dir;
  if (tic % 15 == 0) {
    point = spawnPoint();
  }
  switch (dir) {
    case 'left':
      if (y > 0) {
        y -= 1;
        tail = 'pos' + x + (y + 1);
      } else {
        gameOver();
      }
      break;
    case 'up':
      if (x > 0) {
        x -= 1;
        tail = 'pos' + (x + 1) + y;
      } else {
        gameOver();
      }
      break;
    case 'right':
      if (y < Math.sqrt(size) - 1) {
        y += 1;
        tail = 'pos' + x + (y - 1);
      } else {
        gameOver();
      }
      break;
    case 'down':
      if (x < Math.sqrt(size) - 1) {
        x += 1;
        tail = 'pos' + (x - 1) + y;
      } else {
        gameOver();
      }
  }
  pos = 'pos' + x + y;
  divs = document.getElementsByTagName('div');
  for (i = 1; i < divs.length; i++) {
    divs[i].classList.remove('myPos', 'tail', 'point');
  }
  for (i = 0; i < tails.length; i++) {
    document.getElementById(tails[i]).classList.add('tail');
  }
  if (tails.length <= sLen) {
  } else {
    tails.pop();
  }
  tails.unshift(pos);
  document.getElementById(pos).classList.add('myPos');
  for (i = 1; i < tails.length; i++) {
    if (pos === tails[i]) {
      gameOver();
    }
  }
  if (pos == point) {
    point = '';
    sLen++;
    scoreVal++;
    if (scoreVal % 5 == 0) {
      speedUp();
    }
  }
  if (point != '') {
    document.getElementById(point).classList.add('point');
  }

  score.value = scoreVal;
}
function gameOver() {
  clearInterval(start);
  document.getElementsByClassName('myPos')[0].style.background = '#ff0000';
  let x = document.getElementsByClassName('tail');
  for (i = 0; i < x.length; i++) {
    x[i].style.background = '#ff0000';
    x[i].style.filter = 'opacity(0.4)';
  }
}
