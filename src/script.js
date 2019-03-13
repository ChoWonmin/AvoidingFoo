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

function setup() {
  createCanvas(width, height).parent('content');
  mapImage.preLoad('ice.jpeg');
  playerImage.preLoad('bomberman-movement.png');
  bombImage.preLoad('bomberman-effect.png');
}

function update() {
  if (player.status==='live')
    score++;

  if (keyIsPressed===false)
    player.stop();

  if (keyIsDown(LEFT_ARROW))
    player.moveLeft();
  else if (keyIsDown(RIGHT_ARROW))
    player.moveRight();

  for (let i=0; i<bombs.length; i++) {
    const bomb = bombs[i];
    bomb.drop();
    player.conflict(bomb.x, bomb.y, bomb.size);
  }
}

function draw() {
  update();
  background(255, 255, 255);
  mapImage.drawAll();
  fill(255);
  tick++;

  if (tick%50===parseInt(Math.random()*50)) {
    if (bombs.length < 20)
      bombs.push(new Bomb());
  }

  for (let i=0; i<bombs.length; i++) {
    const bomb = bombs[i];
    bomb.draw();
  }

  if (!player.live)
    fill(255,0,0);
  player.draw();

}

const restartBtn = document.getElementById('newGame');
restartBtn.addEventListener('click', ()=>{
  tick = 0;
  score = 0;
  player.rebirth();
  bombs = [];
});
setInterval(()=>{document.getElementsByClassName('score')[0].innerHTML = score;}, 500);
