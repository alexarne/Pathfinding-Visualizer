export const getMazeArray = {
  "Recursive Division": RecursiveDiv,
  "Random Maze": RandomMaze,
  "Depth First Search": AdaptedDFS,
};

export const mazeAlgorithms = Object.keys(getMazeArray);

function RecursiveDiv() {
  return "recursediv";
}

function RandomMaze() {
  return "random maze";
}

function AdaptedDFS() {
  return "adapted dfs";
}
