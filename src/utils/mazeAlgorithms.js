export const mazeMappings = {
  "Recursive Division": RecursiveDiv,
  "Random Maze": RandomMaze,
  "Depth First Search": AdaptedDFS,
};

export const mazeAlgorithms = Object.keys(mazeMappings);

/**
 * Interface: Call to getMazeArray gets the maze cells in the
 * proper animation order.
 * @returns Array of cell coordinates {x, y}: mazeCellsInOrder
 */

export function getMazeArray(algo, grid) {
  const height = grid.length;
  const width = grid[0].length;
  return mazeMappings[algo](height, width);
}

function RecursiveDiv(height, width) {
  return [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ];
}

function RandomMaze(height, width) {
  const PROBABILITY = 0.3;
  const mazeCellsInOrder = [];
  for (let h = 0; h < height; ++h) {
    for (let w = 0; w < width; ++w) {
      if (Math.random() < PROBABILITY) {
        mazeCellsInOrder.push({ x: w, y: h });
      }
    }
  }
  return mazeCellsInOrder;
}

function AdaptedDFS(height, width) {
  return "adapted dfs";
}
