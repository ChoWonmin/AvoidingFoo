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
    image(
      img,
      x,
      y,
      this.width,
      this.height,
      (i % this.rowNum) * this.sw,
      (j % this.colNum) * this.sh,
      this.sw,
      this.sh
    );
  };

  this.drawAll = () => {
    image(img, 0, 480, 1000, 140);
  };
};
