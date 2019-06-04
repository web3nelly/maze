// https://en.wikipedia.org/wiki/Depth-first_search

class MazeGen extends Maze {
  stack = [];
  currentCell = [];
  complete = false;

  create() {
    //Depth-first search
    this.currentCell.visited = true;
    this.currentCell.highlight();

    const nextCell = this.getRandomNeighbor();

    if (nextCell) {
      // STEP 1 in Depth-first search
      nextCell.visited = true;
      //STEP 2     
      this.stack.push(this.currentCell);
      //STEP 3
      this.removeWalls(this.currentCell, nextCell);
      //STEP 4
      this.currentCell = nextCell;
    }
    // Backtracking
    else if (this.stack.length > 0) {
      this.currentCell = this.stack.pop();
    }
    // Maze completed
    else {
      this.complete = true;
    }
  }

  checkNeighbors() {
    const neighbors = [];

    const { col, row } = this.currentCell;

    const top = this.grid[this.getIndex(col, row - 1)];
    const right = this.grid[this.getIndex(col + 1, row)];
    const bottom = this.grid[this.getIndex(col, row + 1)];
    const left = this.grid[this.getIndex(col - 1, row)];

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

  getRandomNeighbor() {
    const neighbors = this.checkNeighbors();

    if (neighbors.length > 0) {
      const rn = floor(random(0, neighbors.length));
      // return random neighbor
      return neighbors[rn];
    }

    // no avaliable neighbors
    return null;
  }

  cleanUp() {
    this.grid.forEach(cell => {
      cell.visited = false;
    });
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
}