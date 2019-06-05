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
  currentNode = {};
  complete = false;
  initialized = false;

  init(maze) {

    this.maze = { ...maze };
    //Delete unused props of maze obj, should I?
    delete this.maze.stack;
    delete this.maze.currentNode;

    this.grid = [...maze.grid];
    this.start = this.grid[0];
    this.goal = this.grid[maze.getIndex(maze.cols - 1, maze.rows - 1)];

    this.initAStar();

    this.initialized = true;
  }

  initAStar() {
    // For the first node(start), that value is completely heuristic.
    this.start.h = this.heuristicCostEstimate(this.start, this.goal);
    // The cost of going from start to start is zero.
    this.start.g = 0;
    // For the first node, that value is completely heuristic.
    // f = g + h
    this.start.f = this.start.g + this.start.h;
    this.start.previous = false;

    // Initially, only the start node is known.
    this.openStack.push(this.start);
  }

  solve() {
    if (this.openStack.length > 0) {
      // Keep solving
      this.currentNode = this.getLowestFScoreNode();
      const current = this.currentNode;
      this.updatePath();

      current.visited = true;

      if (current === this.goal) {
        this.complete = true;
        return;
      }

      this.removeFromOpenStack(current);
      this.closedStack.push(current);

      const neighbors = this.getAvaliableNeighbors(current);

      // if (neighbors) {
      for (const neighbor of neighbors) {
        const tentativeGScore = floor(current.g + 1);

        if (!this.openStack.includes(neighbor)) {
          neighbor.h = this.heuristicCostEstimate(neighbor, this.goal);
          this.openStack.push(neighbor);
        }
        else if (tentativeGScore >= neighbor.g)
          return;

        // This path is the best until now. Record it!
        neighbor.previous = current;
        // For each node, the cost of getting from the start node to that node.
        neighbor.g = tentativeGScore;
        // f(n)=g(n)+h(n)
        neighbor.f = neighbor.g + neighbor.h;
      }

      this.drawSolving();
    }
    else {
      // Can NOT solve!
      console.log('No solution found!');
      this.complete = true;
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

    if (top && !walls[0] && !closedStack.includes(top))
      neighbors.push(top);

    if (right && !walls[1] && !closedStack.includes(right))
      neighbors.push(right);

    if (bottom && !walls[2] && !closedStack.includes(bottom))
      neighbors.push(bottom);

    if (left && !walls[3] && !closedStack.includes(left))
      neighbors.push(left);

    return neighbors;
  }

  removeFromOpenStack(node) {
    for (let i = this.openStack.length; i >= 0; i--)
      if (this.openStack[i] === node)
        this.openStack.splice(i, 1);
  }

  updatePath() {
    this.path = [];

    let temp = this.currentNode;
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
    // this.fillOpenStack();
    this.drawPath();
  }

  // Draw path with shape
  // drawPath() {
  //   beginShape();
  //   noFill();
  //   strokeWeight(floor(nodeSize / 6));
  //   strokeCap(ROUND);
  //   stroke(white);

  //   for (let i = 0; i < this.path.length; i++) {
  //     vertex(this.path[i].cords.centerX, this.path[i].cords.centerY)
  //   }

  //   endShape();
  // }

  drawPath() {
    const current = this.currentNode;
    console.log(current);

    if (current.previous) {
      noFill();
      strokeWeight(floor(nodeSize / 6));
      strokeCap(ROUND);

      const r = floor((255 * this.path.length) / 255);
      console.log('r:', r);
      const c = color(r, 250, 250, 200);
      stroke(c);
      line(
        current.cords.centerX,
        current.cords.centerY,
        current.previous.cords.centerX,
        current.previous.cords.centerY
      );
    }
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