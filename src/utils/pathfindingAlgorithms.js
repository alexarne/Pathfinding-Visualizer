/**
 * The available algorithms, mapped to their respective functions,
 * and their respective shortened display names.
 */

export const algorithmMappings = {
  "Dijkstra's Algorithm": Dijkstra,
  "A* Search": AStar,
  "Breadth First Search": BFS,
  "Depth First Search": DFS,
};

export const getAbbreviation = {
  "Dijkstra's Algorithm": "Dijkstra",
  "A* Search": "A*",
  "Breadth First Search": "BFS",
  "Depth First Search": "DFS",
};

export const pathfindingAlgorithms = Object.keys(algorithmMappings);

/**
 * Node objects in grid:
 */
// {
//     position: {
//       x: x,
//       y: y,
//     },
//     mouse: {
//       down: () => mouseDown(x, y),
//       enter: () => mouseEnterCallback(x, y),
//     },
//     isWall: false,
//     isVisited: false,
//     isShortestPath: false,
//     isSource: false,
//     isTarget: false,
//     weight: 1,
// }

/**
 * Interface: Call to getVisitedArrays gets the proper traversal of
 * running the given algorithm on the given grid with designated
 * start and end nodes.
 * @returns Array containing two Arrays of cell coordinates {x, y}:
 *  [
 *      visitedCellsInOrder
 *      shortestPathInOrder
 *  ]
 */

export function getVisitedArrays(algo, grid, from, to) {
  return algorithmMappings[algo](grid, from, to);
}

function Dijkstra(grid, from, to) {
  const visitedCellsInOrder = [];
  const shortestPathInOrder = [];
  return ["dijkstra", shortestPathInOrder];
}

function AStar(grid, from, to) {
  const visitedCellsInOrder = [];
  const shortestPathInOrder = [];
  return ["astar", shortestPathInOrder];
}

function BFS(grid, from, to) {
  const visitedCellsInOrder = [];

  const parent = Array(grid.length)
    .fill(0)
    .map((row, y) => {
      return Array(grid[0].length).fill(-1);
    });

  const queue = [{ pos: from, parentPos: { x: -1, y: -1 } }];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!valid(node, grid)) continue;
    if (parent[node.pos.y][node.pos.x] !== -1) continue;

    visitedCellsInOrder.push({ x: node.pos.x, y: node.pos.y });
    parent[node.pos.y][node.pos.x] = {
      x: node.parentPos.x,
      y: node.parentPos.y,
    };
    if (node.pos.x == to.x && node.pos.y == to.y) break;

    pushNeighbours(queue, node);
  }

  const shortestPathInOrder = constructPath(to, parent);

  return [visitedCellsInOrder, shortestPathInOrder];
}

function DFS(grid, from, to) {
  const visitedCellsInOrder = [];

  const parent = Array(grid.length)
    .fill(0)
    .map((row, y) => {
      return Array(grid[0].length).fill(-1);
    });

  const stack = [{ pos: from, parentPos: { x: -1, y: -1 } }];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!valid(node, grid)) continue;
    if (parent[node.pos.y][node.pos.x] !== -1) continue;

    visitedCellsInOrder.push({ x: node.pos.x, y: node.pos.y });
    parent[node.pos.y][node.pos.x] = {
      x: node.parentPos.x,
      y: node.parentPos.y,
    };
    if (node.pos.x == to.x && node.pos.y == to.y) break;

    pushNeighbours(stack, node);
  }

  const shortestPathInOrder = constructPath(to, parent);

  return [visitedCellsInOrder, shortestPathInOrder];
}

/**
 * General helper functions
 */

function valid(node, grid) {
  return (
    node.pos.y >= 0 &&
    node.pos.y < grid.length &&
    node.pos.x >= 0 &&
    node.pos.x < grid[0].length &&
    grid[node.pos.y][node.pos.x].isWall === false
  );
}

function pushNeighbours(struct, node) {
  struct.push({
    pos: { x: node.pos.x + 1, y: node.pos.y },
    parentPos: { x: node.pos.x, y: node.pos.y },
  });
  struct.push({
    pos: { x: node.pos.x, y: node.pos.y + 1 },
    parentPos: { x: node.pos.x, y: node.pos.y },
  });
  struct.push({
    pos: { x: node.pos.x - 1, y: node.pos.y },
    parentPos: { x: node.pos.x, y: node.pos.y },
  });
  struct.push({
    pos: { x: node.pos.x, y: node.pos.y - 1 },
    parentPos: { x: node.pos.x, y: node.pos.y },
  });
}

function constructPath(end, parent) {
  const shortestPathInOrder = [];
  if (parent[end.y][end.x] !== -1) {
    shortestPathInOrder.push(end);
    let current = parent[end.y][end.x];
    while (current.x !== -1 && current.y !== -1) {
      shortestPathInOrder.unshift(current);
      current = parent[current.y][current.x];
    }
  }
  return shortestPathInOrder;
}
