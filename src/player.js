const Player = function () {

  let tick = 0;
  let time = 0;
  const sizeX = 44;
  const sizeY = 64;
  const speed = 3;
  let status = 'live';
  const statusMapper = {
    live: [{i:2, j:0}],
    die: [{i:2, j:0}, {i:2, j:1}, {i:2, j:2}, {i:2, j:3}],
    right: [{i:0, j:1}, {i:1, j:1}, {i:2, j:1}, {i:3, j:1}, {i:4, j:1}],
    left: [{i:0, j:3}, {i:1, j:3}, {i:2, j:3}, {i:3, j:3}, {i:4, j:3}],
  };

  const accMax = 25;
  const acc = 2;
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
    if (this.x > x && this.x < x+size && this.y < y+size)
      status = 'die';
    else if (this.x < x && this.x + this.width < x && this.y < y+size)
      status = 'die';
  };

};
