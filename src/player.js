const Player = function () {
  let tick = 0;
  let time = 0;
  const sizeX = 48;
  const sizeY = 60;
  const speed = 0.6;

  const statusMapper = {
    live: [{ i: 1, j: 0 }],
    die: [
      { i: 1, j: 0 },
      { i: 1, j: 1 },
      { i: 1, j: 2 },
      { i: 1, j: 3 },
    ],
    right: [
      { i: 0, j: 1 },
      { i: 1, j: 1 },
      { i: 2, j: 1 },
    ],
    left: [
      { i: 0, j: 3 },
      { i: 1, j: 3 },
      { i: 2, j: 3 },
    ],
  };

  const accMax = 15;
  const acc = 1.1;
  let accRight = 0;
  let accLeft = 0;

  this.status = "live";
  this.x = width / 2 - sizeX;
  this.y = height - sizeY;

  playerImage.width = sizeX;
  playerImage.height = sizeY;

  playerImage.sw = 36;
  playerImage.sh = 43;

  playerImage.rowNum = 4;
  playerImage.colNum = 3;

  this.draw = () => {
    tick++;
    if (tick % 20 === 0) time++;
    const len = statusMapper[this.status].length;
    playerImage.draw(
      this.x,
      this.y,
      statusMapper[this.status][time % len].i,
      statusMapper[this.status][time % len].j
    );
  };

  this.rebirth = () => {
    this.status = "live";
    this.x = width / 2;
    accRight = 0;
    accLeft = 0;
  };

  this.stop = () => {
    if (this.status !== "die") {
      this.status = "live";
      accRight = 0;
      accLeft = 0;
    }
  };

  this.moveRight = () => {
    if (this.status === "die") return;

    if (this.x < width - sizeX) {
      if (accRight < accMax) accRight += acc * acc;
      this.x += speed + accRight;
    }
    this.status = "right";
  };

  this.moveLeft = () => {
    if (this.status === "die") return;

    if (this.x > 0) {
      if (accLeft < accMax) accLeft += acc * acc;
      this.x -= speed + accLeft;
    }

    this.status = "left";
  };

  this.conflict = (x, y, boomSize) => {
    const offset = 10;
    const rangeX = [this.x + offset, this.x + sizeX - offset];

    if (this.y < y - boomSize && height - offset > y) {
      if (rangeX[0] < x && rangeX[1] > x) {
        this.status = "die";
      } else if (rangeX[0] < x + boomSize && rangeX[1] > x + boomSize) {
        this.status = "die";
      }
    }
  };
};
