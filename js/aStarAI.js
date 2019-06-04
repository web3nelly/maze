// https://en.wikipedia.org/wiki/A*_search_algorithm

class AStarAI {
  maze = {};
  // Array of nodes in maze
  grid = [];
  // Fastest known patch from start to goal
  path = [];
  // The set of nodes already evaluated
  closedStack = [];
  // The set of currently discovered nodes that are not evaluated yet.
  openStack = [];

  start = {};
  goal = {};
  completed = false;
  initialized = false;

  init(maze) {

    this.maze = { ...maze };
    //Delete unused props of maze obj, should I?
    delete this.maze.stack;
    delete this.maze.currentNode;

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

    // Initially, only the start node/node is known.
    this.openStack.push(this.start);
  }

  solve() {

    if (this.openStack.length > 0) {
      // Keep solving
      const current = this.getLowestFScoreNode();
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
        neighbor.previous = current;
        // For each node, the cost of getting from the start node to that node.
        neighbor.g = tentativeGScore;
        // f(n)=g(n)+h(n)
        neighbor.f = neighbor.g + this.heuristicCostEstimate(neighbor, this.goal);
      }

      this.drawSolving();
    }
    else {
      // Can NOT solve!
      console.log('No solution found!');
      this.completed = true;
    }
  }

  heuristicCostEstimate(neighbor, goal) {
    // Euclidean distance (Moving diagonal)
    const d = dist(neighbor.cords.centerX, neighbor.cords.centerY, goal.cords.centerX, goal.cords.centerY);

    // Manhattan distance (Not moving diagonal)
    // const d =
    //   abs(neighbor.cords.centerX, neighbor.cords.centerY) +
    //   abs(goal.cords.centerX, goal.cords.centerY);

    return floor(d);
  }

  getLowestFScoreNode() {
    const { openStack } = this;
    let winner = 0;

    for (let i = 0; i < openStack.length; i++)
      if (openStack[i].f < openStack[winner].f)
        winner = i;

    return openStack[winner];
  }

  getAvaliableNeighbors(node) {
    const { col, row, walls } = node;
    const { grid, closedStack } = this;

    const top = grid[this.getIndex(col, row - 1)];
    const right = grid[this.getIndex(col + 1, row)];
    const bottom = grid[this.getIndex(col, row + 1)];
    const left = grid[this.getIndex(col - 1, row)];

    const neighbors = [];

    if (top && !walls[0] && !closedStack.includes(top)) {
      neighbors.push(top);
    }
    if (right && !walls[1] && !closedStack.includes(right)) {
      neighbors.push(right);
    }
    if (bottom && !walls[2] && !closedStack.includes(bottom)) {
      neighbors.push(bottom);
    }
    if (left && !walls[3] && !closedStack.includes(left)) {
      neighbors.push(left);
    }

    return neighbors;
  }

  removeFromOpenStack(node) {
    for (let i = this.openStack.length; i >= 0; i--)
      if (this.openStack[i] === node)
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

  drawSolving() {
    // Color start and finish nodes
    this.start.fillNode(darkGreen);
    this.goal.fillNode(lightRed);
    // color open set
    this.fillOpenStack();

    this.drawPath();
  }

  drawPath() {
    beginShape();
    noFill();
    strokeWeight(floor(nodeSize / 6));
    strokeCap(ROUND);
    stroke(white);

    for (let i = 0; i < this.path.length; i++) {
      vertex(this.path[i].cords.centerX, this.path[i].cords.centerY)
    }

    endShape();
  }

  fillVisited() {
    this.closedStack.forEach(node => node.fillNodeComplete());
  }

  fillOpenStack() {
    this.openStack.forEach(node => node.fillNode(yellowGreen));
  }

  getIndex(col, row) {
    // return if invalid index
    if (col < 0 || row < 0 || col > this.maze.cols - 1 || row > this.maze.rows - 1)
      return -1;

    // return index
    return col + row * this.maze.cols;
  }
}