class Maze {
  width = 0;
  height = 0;
  cols = 0;
  rows = 0;
  grid = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cols = floor(this.width / nodeSize);
    this.rows = floor(this.height / nodeSize);

    this.buildGridArray();
  }

  buildGridArray() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid.push(new Node(col, row, nodeSize));
      }
    }
  }

  draw() {
    for (let node = 0; node < this.grid.length; node++) {
      this.grid[node].drawNode();
    }
  }

  getRandomNeighbor(node) {
    const neighbors = this.checkNeighbors(node);

    if (neighbors.length > 0) {
      const rn = floor(random(0, neighbors.length));
      // return random neighbor
      return neighbors[rn];
    }

    // no avaliable neighbors
    return null;
  }

  checkNeighbors(node) {
    const { col, row } = node;

    const top = this.grid[this.getIndex(col, row - 1)];
    const right = this.grid[this.getIndex(col + 1, row)];
    const bottom = this.grid[this.getIndex(col, row + 1)];
    const left = this.grid[this.getIndex(col - 1, row)];

    const neighbors = [];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    return neighbors;
  }

  removeWalls(curr, next) {

    const x = curr.col - next.col;
    if (x === 1) {
      curr.walls[3] = false;
      next.walls[1] = false;
    }
    else if (x === -1) {
      curr.walls[1] = false;
      next.walls[3] = false;
    }

    const y = curr.row - next.row;
    if (y === 1) {
      curr.walls[0] = false;
      next.walls[2] = false;
    }
    else if (y === -1) {
      curr.walls[2] = false;
      next.walls[0] = false;
    }
  }

  cleanUp() {
    this.grid.forEach(node => {
      node.visited = false;
    });
  }

  getIndex(col, row) {
    // return if invalid index
    if (col < 0 || row < 0 || col > this.cols - 1 || row > this.rows - 1)
      return -1;

    // return index
    return col + row * this.cols;
  }
}