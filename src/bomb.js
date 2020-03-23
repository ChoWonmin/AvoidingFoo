const Bomb = function() {
  let status = "drop";
  const statusMapper = {
    drop: { i: 0, j: 0 },
    explode: { i: 0, j: 0 }
  };
  const speed = 10;
  this.size = 36;
  this.x = Math.random() * width;
  this.y = 0;

  this.drop = () => {
    this.y += speed;

    if (this.y > height - 40) status = "explode";

    if (this.y > height) {
      this.x = Math.random() * width;
      this.y = -20;
      status = "drop";
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
