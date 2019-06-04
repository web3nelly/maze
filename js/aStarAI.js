// https://en.wikipedia.org/wiki/A*_search_algorithm

class AStarAI {
  maze = {};
  // Array of cells in maze
  grid = [];

  path = [];
  // The set of nodes already evaluated
  closedStack = [];
  // The set of currently discovered nodes that are not evaluated yet.
  openStack = [];
  // For each node, which node it can most efficiently be reached from.
  // If a node can be reached from many nodes, cameFrom will eventually contain the
  // most efficient previous step.
  // cameFrom = [];

  start = {};
  goal = {};
  completed = false;
  initialized = false;

  init(maze) {

    this.maze = { ...maze };
    //Delete unused props of maze obj
    //delete this.maze.grid;
    delete this.maze.stack;
    delete this.maze.currentCell;

    this.grid = [...maze.grid];

    this.initAI();

    this.initialized = true;
  }

  initAI() {
    //let { start, goal, grid } = this;

    this.start = this.grid[0];
    this.goal = this.grid[maze.getIndex(maze.cols - 1, maze.rows - 1)];

    // For the first node(start), that value is completely heuristic.
    this.start.h = this.heuristicCostEstimate(this.start, this.goal);
    // The cost of going from start to start is zero.
    this.start.g = 0;
    // For the first node, that value is completely heuristic.
    // f = g + h
    this.start.f = this.start.g + this.start.h;
    this.start.previous = false;

    // Initially, only the start node/cell is known.
    // console.log(this.start);

    this.openStack.push(this.start);

    // console.log(this.start, this.openStack[0]);
  }
  drawSolving() {
    // color open set
    this.openStack.forEach(cell => cell.fillCell(yellowGreen));
    // color closed set
    //this.closedStack.forEach(cell => cell.fillCell(darkGreen));
    // Color start and finish cells
    this.start.fillCell(darkGreen);
    this.goal.fillCell(lightRed);

    this.drawPath();
  }

  solve() {
    this.drawSolving();

    if (this.openStack.length > 0) {
      // Keep solving
      const current = this.getLowestFScoreCell();
      this.updatePath(current);

      current.visited = true;

      if (current === this.goal) {
        this.completed = true;
        return;
      }

      this.removeFromOpenStack(current);
      this.closedStack.push(current);

      const neighbors = this.getAvaliableNeighbors(current);

      // if (neighbors) {
      for (const neighbor of neighbors) {
        const tentativeGScore = floor(current.g + 1);

        if (!this.openStack.includes(neighbor)) {
          this.openStack.push(neighbor);
        }
        else if (tentativeGScore >= neighbor.g) {
          return;
        }
        // This path is the best until now. Record it!
        //cameFrom[neighbor] = current
        neighbor.previous = current;
        // For each node, the cost of getting from the start node to that node.
        neighbor.g = tentativeGScore;
        neighbor.f = neighbor.g + this.heuristicCostEstimate(neighbor, this.goal)

      }
      // }

    }
    else {
      // Can NOT solve!
      console.log('No solution found!');
      this.completed = true;
    }
  }

  heuristicCostEstimate(neighbor, goal) {
    // Euclidean distance (Moving diagonal)
    let d = dist(neighbor.cords.x, neighbor.cords.y, goal.cords.x, goal.cords.y);

    // Manhattan distance (Not moving diagonal)
    // const d = abs(neighbor.cords.centerX, neighbor.cords.centerY) + abs(goal.cords.centerX, goal.cords.centerY);

    return floor(d);
  }

  getLowestFScoreCell() {
    const { openStack } = this;
    let winner = 0;

    for (let i = 0; i < openStack.length; i++)
      if (openStack[i].f < openStack[winner].f)
        winner = i;

    return openStack[winner];
  }

  getAvaliableNeighbors(cell) {
    const neighbors = [];

    const { col, row, walls } = cell;
    const { grid, closedStack } = this;

    const top = grid[this.getIndex(col, row - 1)];
    const right = grid[this.getIndex(col + 1, row)];
    const bottom = grid[this.getIndex(col, row + 1)];
    const left = grid[this.getIndex(col - 1, row)];

    if (top && !walls[0] && !closedStack.includes(top)) {
      // console.log('top Wall false', top);
      neighbors.push(top);
    }
    if (right && !walls[1] && !closedStack.includes(right)) {
      // console.log('right Wall false', right);
      neighbors.push(right);
    }
    if (bottom && !walls[2] && !closedStack.includes(bottom)) {
      // console.log('bottom Wall false', bottom);
      neighbors.push(bottom);
    }
    if (left && !walls[3] && !closedStack.includes(left)) {
      // console.log('left Wall false', left);
      neighbors.push(left);
    }

    return neighbors;
  }

  removeFromOpenStack(cell) {
    for (let i = this.openStack.length; i >= 0; i--)
      if (this.openStack[i] === cell)
        this.openStack.splice(i, 1);
  }

  updatePath(current) {
    this.path = [];

    let temp = current;
    this.path.push(temp);

    while (temp.previous) {
      this.path.push(temp.previous);
      temp = temp.previous;
    }
  }

  drawPath() {
    beginShape();
    noFill();
    strokeWeight(cellSize / 10);
    strokeCap(ROUND);
    stroke(white);

    for (let i = 0; i < this.path.length; i++) {
      vertex(this.path[i].cords.centerX, this.path[i].cords.centerY)
    }

    endShape();
  }

  fillVisited() {
    this.closedStack.forEach(cell => cell.fillCellComplete());
  }

  getIndex(col, row) {
    // return if invalid index
    if (col < 0 || row < 0 || col > this.maze.cols - 1 || row > this.maze.rows - 1)
      return -1;

    // return index
    return col + row * this.maze.cols;
  }
}