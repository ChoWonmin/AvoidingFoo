
const ImageController = function() {

  let img = '';

  this.preLoad = (path) => img = (loadImage(`/images/${path}`));

  this.width = 36;
  this.height = 36;

  this.sw = 24;
  this.sh = 24;

  this.draw = (x, y) => image(img, x, y, this.width, this.height, 0, 0, this.sw, this.sh );

};


