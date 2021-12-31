const image_index = Math.ceil(Math.random() * images_count);
const image_path = 'img/' + image_index + '.jpg';

const game = {
  node: document.getElementById('game'),
  overlay: document.getElementById('overlay'),
  grid: [
    [1,2,3],
    [4,5,6],
    [7,8,0]
  ],
  tiles: [],
  move: direction => {
    if (direction === 'up') {
      game.moveUp();
    } else if (direction === 'down') {
      game.moveDown();
    } else if (direction === 'left') {
      game.moveLeft();
    } else if (direction === 'right') {
      game.moveRight();
    }
    if (game.grid[0][0] === 1 && game.grid[0][1] === 2 && game.grid[0][2] === 3 &&
        game.grid[1][0] === 4 && game.grid[1][1] === 5 && game.grid[1][2] === 6 &&
        game.grid[2][0] === 7 && game.grid[2][1] === 8 && game.grid[2][2] === 0) {
      game.overlay.style.zIndex = '100';
      game.overlay.style.opacity = '1';
      confettis();
      fetch('./won.php').then();
    }
  },
  moveUp: () => {
    let tile = null;
    for (let i = 0; i < game.tiles.length; i++) {
      tile = game.tiles[i];
      if (tile.y - 1 >= 0 && game.grid[tile.y - 1][tile.x] === 0) {
        game.grid[tile.y][tile.x] = 0;
        tile.y--;
        game.grid[tile.y][tile.x] = tile.index;
        tile.node.style.top = String(33*tile.y + 1) + '%';
        return true;
      }
    }
    return false;
  },
  moveRight: () => {
    let tile = null;
    for (let i = 0; i < game.tiles.length; i++) {
      tile = game.tiles[i];
      if (tile.x + 1 <= 2 && game.grid[tile.y][tile.x + 1] === 0) {
        game.grid[tile.y][tile.x] = 0;
        tile.x++;
        game.grid[tile.y][tile.x] = tile.index;
        tile.node.style.left = String(33*tile.x + 1) + '%';
        return true;
      }
    }
    return false;
  },
  moveDown: () => {
    let tile = null;
    for (let i = 0; i < game.tiles.length; i++) {
      tile = game.tiles[i];
      if (tile.y + 1 <= 2 && game.grid[tile.y + 1][tile.x] === 0) {
        game.grid[tile.y][tile.x] = 0;
        tile.y++;
        game.grid[tile.y][tile.x] = tile.index;
        tile.node.style.top = String(33*tile.y + 1) + '%';
        return true;
      }
    }
    return false;
  },
  moveLeft: () => {
    let tile = null;
    for (let i = 0; i < game.tiles.length; i++) {
      tile = game.tiles[i];
      if (tile.x - 1 >= 0 && game.grid[tile.y][tile.x - 1] === 0) {
        game.grid[tile.y][tile.x] = 0;
        tile.x--;
        game.grid[tile.y][tile.x] = tile.index;
        tile.node.style.left = String(33*tile.x + 1) + '%';
        return true;
      }
    }
    return false;
  }
};

for (let i = 0; i < 8; i++) {
  const tile = {
    index: i + 1,
    x: i % 3,
    y: Math.floor(i / 3),
    node: document.createElement('div')
  };
  tile.node.className = 'game-tile';
  tile.node.id = 'tile-' + parseInt(i + 1);
  game.node.appendChild(tile.node);
  game.tiles.push(tile);
}

for (let i = 0; i < game.tiles.length; i++) {
  if (game.tiles[i].node.id !== 'tile-9') {
    game.tiles[i].node.style.backgroundImage = 'url(' + image_path + ')';
  }
}
game.overlay.style.backgroundImage = 'url(' + image_path + ')';

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const randomize = async steps => {
  const actions = [game.moveUp, game.moveRight, game.moveDown, game.moveLeft];
  let rand = null;
  let oldDirection = null;
  let i = 0;
  while (i < steps) {
    oldDirection = rand % 2;
    rand = Math.floor(Math.random() * 4);
    if (rand % 2 !== oldDirection) {
      await sleep(0);
      i += actions[rand]();
    }
  }
}
randomize(24).then();

document.onkeydown = e => {
  if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'k') {
    game.move('up');
  } else if (e.key === 'ArrowRight' ||e .key === 'd' || e.key === 'l') {
    game.move('right');
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'j') {
    game.move('down');
  } else if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'h') {
    game.move('left');
  }
};

let xDown = null;
let yDown = null;

const getTouches = evt => {
  return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
};

const handleTouchStart = evt => {
  evt.preventDefault();
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
  return false;
};

const handleTouchMove = evt => {
  evt.preventDefault();

  if ( ! xDown || ! yDown ) {
    return;
  }

  const xUp = evt.touches[0].clientX;
  const yUp = evt.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
    if ( xDiff > 0 ) {
      game.move('left');
    } else {
      game.move('right');
    }
  } else {
    if ( yDiff > 0 ) {
      game.move('up');
    } else {
      game.move('down');
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;

  return false;
};

game.node.addEventListener('touchstart', handleTouchStart, false);
game.node.addEventListener('touchmove', handleTouchMove, false);

const confettis = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}
