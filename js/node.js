class Node {
  col = 0;
  row = 0;
  cords = {};
  //       top, right, bot, left
  walls = [true, true, true, true];
  visited = false;

  constructor(col, row) {
    this.col = col;
    this.row = row;

    this.cords.x = this.col * nodeSize;
    this.cords.y = this.row * nodeSize;
    this.cords.centerX = floor(this.cords.x + (nodeSize / 2));
    this.cords.centerY = floor(this.cords.y + (nodeSize / 2));
  }

  drawNode() {
    let c = gray;

    if (this.visited)
      c = lightGreen;

    this.fillNode(c);
    this.drawWalls();
  }

  drawWalls() {
    noStroke();
    strokeWeight(floor(nodeSize / 8));
    strokeCap(SQUARE);
    stroke(lightBlue);

    const { x: x1, y: y1 } = this.cords;
    const x2 = x1 + nodeSize;
    const y2 = y1 + nodeSize;

    // Top wall
    if (this.walls[0]) {
      line(x1, y1, x2, y1);
    }
    // Right wall
    if (this.walls[1]) {
      line(x2, y1, x2, y2);
    }
    // Bottom wall
    if (this.walls[2]) {
      line(x2, y2, x1, y2);
    }
    // Left wall
    if (this.walls[3]) {
      line(x1, y1, x1, y2);
    }
  }

  highlight() {
    this.fillNode(yellowGreen);
  }

  fillNode(color) {
    noStroke();
    fill(color);

    rect(this.cords.x, this.cords.y, nodeSize, nodeSize);
  }

  fillNodeComplete() {
    const repeat = 4;

    for (let i = 0; i <= repeat; i++)
      this.fillNode(lightGreen);
  }
}