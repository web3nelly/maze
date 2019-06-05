# Maze Intro
Creates a randomized maze with Depth-first Search algorithm. Then uses the A* algorithm to solve the maze. 

Currently not using JS modules so the program can run without a server. Just open `index.html` in a browser that supports canvas and ES6(2015) ei: [Chrome](https://www.google.com/chrome/).

## Maze Dependences
- [p5.js](https://p5js.org/get-started/) library, for rendering graphic to the canvas

## Current Features
- Mouse click toggles pausing the program wherever it’s at.

## Todos and Upcoming Features
- Open up some walls in the map that is over a given size, to enable more options for solving.
- Refactor to asynchronous programming where possible.
- Comment all method params and returns.
- User input for Node size.
- User selects the Goal(finish) after maze is generated.
- Try to use gulp with Babel to modularize this program.
- Expand the A* algorithm in to a better AI, by checking if the path will be intersected.
- Add more algorithms that can solve the maze.
- Compare the algorithms that solve the maze visually.
