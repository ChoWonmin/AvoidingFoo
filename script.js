const width = 1000;
const height = 1000;

const bombs = [];

for (let i=0; i<30; i++) {
  bombs.push({x:Math.random()*width, y:0});
}

function setup() {
  createCanvas(width, height);
}

function update() {
  for (let i=0; i<bombs.length; i++) {
    const bomb = bombs[i];
    bomb.y += 1;
  }
}

function draw() {
  update();
  background(255);

  ellipse(80, 80, 80, 80);

  for (let i=0; i<bombs.length; i++) {
    const bomb = bombs[i];
    ellipse(bomb.x, bomb.y, 80, 80);
  }

}


