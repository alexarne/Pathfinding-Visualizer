
export const getVisitedArrays = {
    "Dijkstra's Algorithm": Dijkstra,
    "A* Search": AStar,
    "Breadth First Search": BFS,
    "Depth First Search": DFS,
}

export const getAbbreviation = {
    "Dijkstra's Algorithm": "Dijkstra",
    "A* Search": "A*",
    "Breadth First Search": "BFS",
    "Depth First Search": "DFS",
}

export const pathfindingAlgorithms = Object.keys(getVisitedArrays)

function Dijkstra() {
    return "dijkjstra"
}

function AStar() {
    return "astar"
}

function BFS() {
    return "bfs"
}

function DFS() {
    return "dfs"
}