const width = 1000;
const height = 720;

const speed = 5;
let tick = 0;

const Player = function () {


  const sizeX = 20;
  const sizeY = 20;
  const speed = 10;

  this.x = width/2;
  this.y = height - sizeY;
  this.live = true;

  this.draw = () => {
    rect(this.x, this.y, sizeX, sizeY);
  };

  this.moveRight = () => {
    if (this.live && this.x < width - sizeX)
      this.x += speed;
  };

  this.moveLeft = () => {
    if (this.live && this.x > 0)
      this.x -= speed;
  };

  this.conflict = (x, y, size) => {
    if (this.x > x && this.x - sizeX < x+size && this.y < y+size)
      this.live = false;
  };

};
const Bomb = function () {
  this.size = 30;
  const speed = 5;

  this.x = Math.random() * width;
  this.y = 0;

  this.drop = () => {
    this.y += speed;
    if (this.y > height)
      this.y = 0;
  };

  this.draw = () => rect(this.x, this.y, this.size, this.size);

};

const player = new Player();
const bombs = [];
bombs.push(new Bomb());

function setup() {
  createCanvas(width, height);
}

function update() {

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
    if (bombs.length < 70)
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


