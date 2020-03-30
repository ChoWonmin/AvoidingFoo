const width = 800;
const height = 600;

const speed = 2;
let score = 0;

let scoreList = [0];
let maxScore = window.localStorage.getItem("maxScore");

if (maxScore !== null) {
  scoreList.push(maxScore);
}

document.getElementsByClassName("score")[1].innerHTML = Math.max(...scoreList);

let tick = 0;

const playerImage = new ImageController();
const bombImage = new ImageController();

const mapImage = new ImageController();

const alarm = new Alarm();
const player = new Player();
let bombs = [];
for (let i = 0; i < 3; i++) {
  bombs.push(new Bomb());
}

// 0: stop
// 1: left
// 2:right
let controller = 0;

function setup() {
  createCanvas(width, height).parent("content");
  mapImage.preLoad("ice.jpeg");
  playerImage.preLoad("player.png");
  bombImage.preLoad("bomb.png");
}

function update() {
  if (keyIsPressed === false) player.stop();

  if (keyIsDown(LEFT_ARROW) || controller === 1) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW) || controller === 2) {
    player.moveRight();
  }

  if (player.status !== "die") {
    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];
      bomb.drop();
      player.conflict(bomb.x, bomb.y, bomb.size);

      document.getElementsByClassName("score")[0].innerHTML = score;
    }
  } else {
    scoreList.push(score);
    maxScore = Math.max(...scoreList);
    document.getElementsByClassName("score")[1].innerHTML = maxScore;
    window.localStorage.setItem("maxScore", maxScore);
  }
}

function draw() {
  update();
  tick++;

  background(255, 255, 255);
  mapImage.drawAll();

  if (tick % 600 === parseInt(Math.random() * 10)) {
    if (bombs.length < 18) bombs.push(new Bomb());
  }

  for (let i = 0; i < bombs.length; i++) {
    const bomb = bombs[i];
    bomb.draw();
  }

  player.draw();

  if (player.status === "die") {
    fill("#DB4437");
    alarm.draw(width / 2, height / 2, "사회적 거리두기 실패...");
  }
}

const restartBtn = document.getElementById("newGame");
restartBtn.addEventListener("click", () => {
  tick = 0;
  score = 0;
  player.rebirth();
  bombs = [];
  for (let i = 0; i < 3; i++) {
    bombs.push(new Bomb());
  }
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
