// init global vars
let cellSize;
let customFrameRate;
let createMazeSpeed;
let lightRed, yellowGreen, lightGreen, darkGreen, lightBlue, gray, white;
let maze, aStarAI;
let pause = false;


function setup() {
  // The size of each cell(node) of the maze 
  // Recommend cellSize: 10 - 160
  cellSize = floor(windowWidth / 80);

  // A custom frame rate which slows down the frames for a larger cell size
  customFrameRate = floor(2000 / cellSize);

  // Smaller cells = more cells in the maze
  // The more cells there are, the slower the maze is genorated
  // createMazeSpeed sets darw() loop to skip drawing every step of the maze genoration
  createMazeSpeed = cellSize > 99 ? 1 : floor(600 / cellSize);

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
  maze = new MazeGen(width, height);
  // Set Starting cell for maze gen
  maze.currentCell = maze.grid[0];

  // Set AI
  aStarAI = new AStarAI();
}

function draw() {
  // background(255); // looks better without right now
  maze.draw();

  /**
   * @todo: Need to figure out a better way of handling all these if statements in draw()
   */

  // Genorate randomized maze
  if (!maze.complete) {
    // Skips drawing eveny part of the maze genration
    for (i = 0; i < createMazeSpeed; i++) {
      maze.create();
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
  if (maze.complete && aStarAI.initialized && aStarAI.completed) {
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