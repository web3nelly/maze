class Cell {
  col = 0;
  row = 0;
  cords = {};
  walls = [true, true, true, true];
  visited = false;

  constructor(col, row) {
    this.col = col;
    this.row = row;

    this.cords.x = this.col * cellSize;
    this.cords.y = this.row * cellSize;
    this.cords.centerX = floor(this.cords.x + (cellSize / 2));
    this.cords.centerY = floor(this.cords.y + (cellSize / 2));
  }

  drawCell() {
    this.drawWalls();
    let c = gray;

    if (this.visited)
      c = lightGreen;

    this.fillCell(c);
  }

  drawWalls() {

    strokeWeight(4);
    strokeCap(SQUARE);
    stroke(lightBlue);

    const { x: x1, y: y1 } = this.cords;
    const x2 = x1 + cellSize;
    const y2 = y1 + cellSize;

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
    this.fillCell(yellowGreen);
  }

  fillCell(color) {
    noStroke();
    fill(color);

    rect(this.cords.x, this.cords.y, cellSize, cellSize);
  }
}