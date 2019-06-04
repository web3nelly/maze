class Maze {
  width = 0;
  height = 0;
  cols = 0;
  rows = 0;
  grid = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cols = floor(this.width / cellSize);
    this.rows = floor(this.height / cellSize);

    this.buildGridArray();
  }

  buildGridArray() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid.push(new Cell(col, row, cellSize));
      }
    }
  }

  draw() {
    for (let cell = 0; cell < this.grid.length; cell++) {
      this.grid[cell].drawCell();
    }
  }

  getIndex(col, row) {
    // return if invalid index
    if (col < 0 || row < 0 || col > this.cols - 1 || row > this.rows - 1)
      return -1;

    // return index
    return col + row * this.cols;
  }
}