
const ImageController = function() {

  let img = '';

  this.preLoad = (path) => img = (loadImage(`/images/${path}`));

  this.width = 36;
  this.height = 36;

  this.sw = 24;
  this.sh = 24;

  this.rowNum = 5;
  this.colNum = 9;

  this.draw = (x, y, i=0, j=0) => {
    image(img, x, y, this.width, this.height, i%this.rowNum * this.sw, j%this.colNum * this.sh, this.sw, this.sh );
  };

  this.drawAll = () => {
    image(img, 0, 700, 1000, 20);
  };

};


