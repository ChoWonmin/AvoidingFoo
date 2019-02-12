const width = 1000;
const height = 720;

const speed = 5;
let tick = 0;

const playerImage = new ImageController();
const bombImage = new ImageController();

const Player = function () {

  let tick = 0;
  let time = 0;
  const sizeX = 44;
  const sizeY = 64;
  const speed = 10;
  let status = 'live';
  const statusMapper = {
    live: [{i:2, j:0}],
    die: [{i:2, j:0}, {i:2, j:1}, {i:2, j:2}, {i:2, j:3}],
    right: [{i:0, j:1}, {i:1, j:1}, {i:2, j:1}, {i:3, j:1}, {i:4, j:1}],
    left: [{i:0, j:3}, {i:1, j:3}, {i:2, j:3}, {i:3, j:3}, {i:4, j:3}],
  };

  const accMax = 10;
  const acc = 0.3;
  let accRight = 0;
  let accLeft = 0;

  this.x = width/2;
  this.y = height - sizeY;

  playerImage.width = sizeX;
  playerImage.height = sizeY;

  playerImage.sw = 21;
  playerImage.sh = 32;

  playerImage.rowNum = 4;
  playerImage.colNum = 5;

  this.draw = () => {
    tick++;
    if(tick%10===0)
      time++;
    const len = statusMapper[status].length;
    playerImage.draw(this.x, this.y, statusMapper[status][time%len].i, statusMapper[status][time%len].j);
  };

  this.stop = () => {
    if (status!=='die') {
      status = 'live';
      accRight = 0;
      accLeft = 0;
    }

  };

  this.moveRight = () => {
    if (status === 'die')
      return;

    if (this.x < width - sizeX) {
      if (accRight < accMax)
        accRight += acc;
      this.x += speed + accRight;
    }
    status = 'right';
  };

  this.moveLeft = () => {
    if (status === 'die')
      return;

    if (this.x > 0) {
      if (accLeft < accMax)
        accLeft += acc;
      this.x -= speed + accLeft;
    }

    status = 'left';
  };

  this.conflict = (x, y, size) => {
    if (this.x > x && this.x - sizeX < x+size && this.y < y+size)
      status = 'die';
  };

};
const Bomb = function () {

  let status = 'drop';
  const statusMapper = {
    drop: {i:0, j:0},
    explode: {i:0, j:3}
  };
  const speed = 8;
  this.size = 36;
  this.x = Math.random() * width;
  this.y = 0;

  this.drop = () => {
    this.y += speed;

    if (this.y > height - 40)
      status = 'explode';

    if (this.y > height) {
      this.x = Math.random() * width;
      this.y = 0;
      status = 'drop';
    }

  };

  bombImage.width = this.size;
  bombImage.height = this.size;

  this.draw = () => {
    bombImage.draw(this.x, this.y, statusMapper[status].i, statusMapper[status].j);
  };

};

const player = new Player();
const bombs = [];
bombs.push(new Bomb());

function setup() {
  createCanvas(width, height);
  playerImage.preLoad('bomberman-movement.png');
  bombImage.preLoad('bomberman-effect.png');

}

function update() {

  if (keyIsPressed===false)
    player.stop();

  if (keyIsDown(LEFT_ARROW))
    player.moveLeft();
  else if (keyIsDown(RIGHT_ARROW))
    player.moveRight();

  for (let i=0; i<bombs.length; i++) {
    const bomb = bombs[i];
    bomb.drop();
  }
}

function draw() {
  update();
  background(100, 100, 0);
  fill(255);
  tick++;

  if (tick%60===0) {
    if (bombs.length < 60)
      bombs.push(new Bomb());
  }

  for (let i=0; i<bombs.length; i++) {
    const bomb = bombs[i];
    bomb.draw();

    player.conflict(bomb.x, bomb.y, 30);
  }

  if (!player.live)
    fill(255,0,0);
  player.draw();

}
