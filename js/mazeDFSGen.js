// https://en.wikipedia.org/wiki/Depth-first_search

class MazeDFSGen extends Maze {
  stack = [];
  currentNode = [];
  complete = false;

  create() {
    //Depth-first search
    this.currentNode.visited = true;
    this.currentNode.highlight();

    // console.log(this.currentNode)
    const nextNode = this.getRandomNeighbor(this.currentNode);

    if (nextNode) {
      //STEP 1 
      nextNode.visited = true;
      //STEP 2     
      this.stack.push(this.currentNode);
      //STEP 3
      this.removeWalls(this.currentNode, nextNode);
      //STEP 4
      this.currentNode = nextNode;
    }
    // Backtracking
    else if (this.stack.length > 0) {
      this.currentNode = this.stack.pop();
    }
    // Maze completed
    else {
      this.complete = true;
    }
  }
}