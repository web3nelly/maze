// https://en.wikipedia.org/wiki/Depth-first_search

class MazeDFSGen extends Maze {
  stack = [];
  currentCell = [];
  complete = false;

  create() {
    //Depth-first search
    this.currentCell.visited = true;
    this.currentCell.highlight();

    // console.log(this.currentCell)
    const nextCell = this.getRandomNeighbor(this.currentCell);

    if (nextCell) {
      //STEP 1 
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
}