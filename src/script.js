const width = 1000;
const height = 720;

const speed = 2;
let score = 0;
let tick = 0;

const playerImage = new ImageController();
const bombImage = new ImageController();

const mapImage = new ImageController();
const player = new Player();
let bombs = [];
bombs.push(new Bomb());

// 0: stop
// 1: left
// 2:right
let controller = 0;

function setup() {
  createCanvas(width, height).parent("content");
  mapImage.preLoad("ice.jpeg");
  playerImage.preLoad("bomberman-movement.jpg");
  bombImage.preLoad("bomberman-effect.jpg");
}

function update() {
  if (keyIsPressed === false) player.stop();

  if (keyIsDown(LEFT_ARROW) || controller === 1) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW) || controller === 2) {
    player.moveRight();
  }

  if (player.status !== "die") {
    score++;
    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];
      bomb.drop();
      player.conflict(bomb.x, bomb.y, bomb.size);
    }
  }
}

function draw() {
  update();

  background(255, 255, 255);
  mapImage.drawAll();

  tick++;

  if (tick % 50 === parseInt(Math.random() * 50)) {
    if (bombs.length < 3) bombs.push(new Bomb());
  }

  for (let i = 0; i < bombs.length; i++) {
    const bomb = bombs[i];
    bomb.draw();
  }

  player.draw();
}

const restartBtn = document.getElementById("newGame");
restartBtn.addEventListener("click", () => {
  tick = 0;
  score = 0;
  player.rebirth();
  bombs = [];
});

const leftBtn = document.getElementById("left-btn");
leftBtn.addEventListener("click", () => {
  controller = 1;
});

const rightBtn = document.getElementById("right-btn");
rightBtn.addEventListener("click", () => {
  controller = 2;
});

const stopBtn = document.getElementById("stop-btn");
stopBtn.addEventListener("click", () => {
  controller = 0;
});

setInterval(() => {
  document.getElementsByClassName("score")[0].innerHTML = score;
}, 1000);
