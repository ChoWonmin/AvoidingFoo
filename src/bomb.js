const Bomb = function() {
  let status = "drop";
  const statusMapper = {
    drop: { i: 0, j: 0 },
    explode: { i: 0, j: 0 }
  };
  const speed = 6;
  this.size = 36;
  this.x = Math.random() * width;
  this.y = 0;

  this.drop = (height) => {
    this.x += (Math.random() - 0.5) * 5;
    this.y += speed;

    const offset = 15;

    // if (this.y > height - this.size) {
    //   status = "explode";
    // }

    console.log(this.y, height);
    if (this.y > height) {
      this.x = Math.random() * width;
      this.y = -30;
      status = "drop";
      console.log('new bomb');
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
