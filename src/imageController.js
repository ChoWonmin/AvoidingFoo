const ImageController = function() {
  let img = "";

  this.preLoad = path => (img = loadImage(`/images/${path}`));

  this.width = 36;
  this.height = 36;

  this.sw = 60;
  this.sh = 60;

  this.rowNum = 1;
  this.colNum = 1;

  this.draw = (x, y, i = 0, j = 0) => {
    if (j === 3) {
      console.log({ x, y, i: i % this.rowNum, j: j % this.colNum });
    }
    image(
      img,
      x,
      y,
      this.width,
      this.height,
      (i % this.colNum) * this.sw,
      (j % this.rowNum) * this.sh,
      this.sw,
      this.sh
    );
  };

  this.drawAll = () => {
    image(img, 0, 480, 1000, 140);
  };
};
