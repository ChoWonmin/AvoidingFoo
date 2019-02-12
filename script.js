const width = 1000;
const height = 720;

const speed = 5;
let tick = 0;

const playerImage = new ImageController();
const bombImage = new ImageController();

const Player = function () {
  const sizeX = 22;
  const sizeY = 32;
  const speed = 10;

  this.x = width/2;
  this.y = height - sizeY;
  this.live = true;

  playerImage.width = sizeX;
  playerImage.height = sizeY;

  playerImage.sw = 22;
  playerImage.sh = 32;

  this.draw = () => {
    playerImage.draw(this.x, this.y);
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
  this.size = 36;
  const speed = 5;

  this.x = Math.random() * width;
  this.y = 0;

  this.drop = () => {
    this.y += speed;
    if (this.y > height)
      this.y = 0;
  };

  bombImage.width = this.size;
  bombImage.height = this.size;

  this.draw = () => bombImage.draw(this.x, this.y);

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
    if (bombs.length < 2)
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


