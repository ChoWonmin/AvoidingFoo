const Alarm = function() {
  const width = 500;
  const height = 140;

  this.draw = (x, y, content) => {
    x = x - width / 2;
    y = y - height / 2;
    rect(x, y, width, height);

    const textW = width / 2;
    const textH = 24;

    textSize(textH);
    fill(230, 230, 230);
    text(
      content,
      x + width / 2 - textW / 2,
      y + height / 2 - textH / 2,
      textW,
      textH
    );
  };
};
