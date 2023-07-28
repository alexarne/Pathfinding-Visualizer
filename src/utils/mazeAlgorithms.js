
export const getMazeArray = {
    "Recursive Division": RecursiveDiv,
    // "Recursive Division (Vertical)": RecursiveDivVert,
    // "Recursive Division (Horizontal)": RecursiveDivHor,
    "Random Maze": RandomMaze,
    "Depth First Search": AdaptedDFS,
}

export const mazeAlgorithms = Object.keys(getMazeArray)

function RecursiveDiv() {
    return "recursediv"
}

// function RecursiveDivVert() {
//     return "recursedivvert"
// }

// function RecursiveDivHor() {
//     return "recursedivhor"
// }

function RandomMaze() {
    return "random maze"
}

function AdaptedDFS() {
    return "adapted dfs"
}