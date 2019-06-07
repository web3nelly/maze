class Maze {
  cols = 0;
  rows = 0;
  grid = [];

  constructor(width, height) {
    this.cols = floor(width / nodeSize);
    this.rows = floor(height / nodeSize);

    this.buildGrid();

    /**
     * @todo: Need to debug clearCenterWalls, causes no solution about 5% of the time
     * I beleive this is caused by no checking diagonal nodes while solving.
     */
    // this.clearCenterWalls();
  }

  buildGrid() {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++)
        this.grid.push(new Node(col, row, nodeSize));
  }

  draw() {
    for (const node of this.grid)
      node.drawNode();
  }

  getRandomNeighbor(node) {
    const neighbors = this.getAvailableNeighbors(node);

    if (neighbors.length > 0) {
      const rn = floor(random(0, neighbors.length));
      // return random neighbor
      return neighbors[rn];
    }

    // no avaliable neighbors
    return null;
  }

  getNeighbors(node) {
    const { col, row } = node;

    const top = this.grid[this.getIndex(col, row - 1)] || null;
    const right = this.grid[this.getIndex(col + 1, row)] || null;
    const bottom = this.grid[this.getIndex(col, row + 1) || null];
    const left = this.grid[this.getIndex(col - 1, row) || null];

    return [top, right, bottom, left];
  }

  getAvailableNeighbors(node) {
    const neighbors = this.getNeighbors(node);
    const availables = [];

    neighbors.forEach(node => {
      if (node && !node.visited)
        availables.push(node)
    });

    return availables;
  }

  removeWalls(curr, next) {
    const x = curr.col - next.col;
    if (x === 1) {
      curr.walls[3] = false; // LEFT
      next.walls[1] = false; // Right
    }
    else if (x === -1) {
      curr.walls[1] = false; // Right
      next.walls[3] = false; // LEFT
    }

    const y = curr.row - next.row;
    if (y === 1) {
      curr.walls[0] = false; // TOP
      next.walls[2] = false; // BOTTOM
    }
    else if (y === -1) {
      curr.walls[2] = false; // BOTTOM
      next.walls[0] = false; // TOP
    }
  }

  // clearCenterWalls() {
  //   if (this.cols > 9 && this.rows > 4) {
  //     const center = this.getIndex(floor(this.cols / 2), floor(this.rows / 2));
  //     const centerNode = this.grid[center];
  //     const neighbors = this.getNeighbors(centerNode);

  //     // remove center walls
  //     for (let i = 0; i < 4; i++)
  //       centerNode.walls[i] = false;

  //     // Top neighbor bottom wall
  //     neighbors[0].walls[2] = false;
  //     // Right neighbor left wall
  //     neighbors[1].walls[3] = false;
  //     // Bottom neightbor top wall
  //     neighbors[2].walls[0] = false;
  //     // Left neightbor right wall
  //     neighbors[3].walls[1] = false;

  //   }
  // }

  cleanUp() {
    this.grid.forEach(node => node.visited = false);
  }

  getIndex(col, row) {
    const invalidIndex = (
      col < 0 ||
      row < 0 ||
      col > this.cols - 1 ||
      row > this.rows - 1
    );

    if (invalidIndex)
      return -1;

    // return index
    return col + row * this.cols;
  }
}