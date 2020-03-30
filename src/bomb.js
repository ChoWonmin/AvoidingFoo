const Bomb = function() {
  let status = "drop";
  const statusMapper = {
    drop: { i: 0, j: 0 },
    explode: { i: 0, j: 0 }
  };
  const speed = 7;
  this.size = 36;
  this.x = Math.random() * width;
  this.y = Math.random() * -300;

  this.drop = () => {
    this.x += (Math.random() - 0.5) * 3;
    this.y += speed;

    const offset = 15;

    if (this.y > height - this.size) {
      status = "explode";
    }

    if (this.y > height) {
      this.x = Math.random() * width;
      this.y = -offset - this.size;
      status = "drop";
      score++;
    }
  };

  bombImage.width = this.size;
  bombImage.height = this.size;
  this.draw = () => {
    bombImage.draw(
      this.x,
      this.y,
      statusMapper[status].i,
      statusMapper[status].j
    );
  };
};
