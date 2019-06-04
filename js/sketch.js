// init global vars
let nodeSize;
let customFrameRate;
let createMazeSpeed;
let lightRed, yellowGreen, lightGreen, darkGreen, lightBlue, gray, white;
let maze, aStarAI;
let pause = false;


function setup() {
  // The size of each node(node) of the maze 
  // Recommend nodeSize: 10 - 160
  nodeSize = floor(windowWidth / 80);

  // A custom frame rate which slows down the frames for a larger node size
  customFrameRate = floor(2000 / nodeSize);

  // Smaller nodes = more nodes in the maze
  // The more nodes there are, the slower the maze is genorated
  // createMazeSpeed sets darw() loop to skip drawing every step of the maze genoration
  createMazeSpeed = nodeSize > 99 ? 1 : floor(600 / nodeSize);

  createCanvas(windowWidth, windowHeight); // Dynamic canvas size
  frameRate(customFrameRate);

  // Define colors the program will use
  lightRed = color(201, 68, 48, 300);
  yellowGreen = color(250, 250, 100, 200);
  lightGreen = color(74, 178, 101, 50);
  darkGreen = color(0, 125, 25, 200);
  lightBlue = color(0, 140, 255, 200);
  gray = color(180, 180, 200, 200);
  white = color(250, 250, 250, 250);

  // Int Maze
  maze = new MazeDFSGen(width, height);
  // Set Starting node for maze gen
  maze.currentNode = maze.grid[0];

  // Set AI
  aStarAI = new AStarAI();
}

function draw() {
  // background(255); // looks better without right now
  maze.draw();

  /**
   * @todo: Need to figure out a better way of handling all these if statements in draw()
   */

  // Generate randomized maze
  if (!maze.complete) {
    // Skips drawing eveny part of the maze genration
    for (i = 0; i < createMazeSpeed; i++) {
      maze.generate();
    }
    return;
  }

  // Maze was genorated, now we init the AI
  if (maze.complete && !aStarAI.initialized) {
    clear();
    maze.cleanUp();
    aStarAI.init(maze);
    // console.log('init', aStarAI)
    return;
  }

  //  aStarAI solved the maze!
  if (maze.complete && aStarAI.initialized && aStarAI.complete) {
    aStarAI.fillVisited();
    aStarAI.fillOpenStack();
    aStarAI.drawSolving();
    maze.draw();
    noLoop();
    // console.log('Solved!!', aStarAI);
    return;
  }

  // aStarAI: solve the maze
  if (maze.complete && aStarAI.initialized) {
    aStarAI.solve();
    return;
  }
}

// Mouse click pauses program 
function mouseClicked() {
  pause = pause ? false : true;

  if (pause) {
    // console.log('openStack', aStarAI.openStack);
    noLoop();
  }
  else
    loop();
}