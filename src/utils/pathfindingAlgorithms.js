import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * The available algorithms, mapped to their respective functions,
 * and their respective shortened display names.
 */

export const algorithmMappings = {
  "Dijkstra's Algorithm": Dijkstra,
  "A* Search": AStar,
  "Greedy Best-First Search": GBFS,
  "Breadth-First Search": BFS,
  "Depth-First Search": DFS,
};

export const getAbbreviation = {
  "Dijkstra's Algorithm": "Dijkstra",
  "A* Search": "A*",
  "Greedy Best-First Search": "GBFS",
  "Breadth-First Search": "BFS",
  "Depth-First Search": "DFS",
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
  const parent = getParentGrid(grid);
  const pq = getPriorityQueue();

  pq.enqueue({
    pos: from,
    parentPos: { x: -1, y: -1 },
    currentDistance: 0,
    heuristicValue: -1,
  });
  while (!pq.isEmpty()) {
    const node = pq.dequeue();
    console.log(node.pos);
    if (!valid(node, grid)) continue;
    if (visited(node, parent)) continue;
    visitedCellsInOrder.push({ x: node.pos.x, y: node.pos.y });
    setParentNode(parent, node);
    if (node.pos.x == to.x && node.pos.y == to.y) break;

    const neighbours = getNeighbours(node);
    for (const neighbour of neighbours) {
      const newDistance = node.currentDistance + 1;
      pq.enqueue({
        ...neighbour,
        currentDistance: newDistance,
        heuristicValue: newDistance + manhattanDistance(neighbour.pos, to),
      });
    }
  }

  const shortestPathInOrder = constructPath(to, parent);
  return [visitedCellsInOrder, shortestPathInOrder];
}

function GBFS(grid, from, to) {
  const visitedCellsInOrder = [];
  const parent = getParentGrid(grid);
  const pq = getPriorityQueue();

  pq.enqueue({
    pos: from,
    parentPos: { x: -1, y: -1 },
    heuristicValue: -1,
  });
  while (!pq.isEmpty()) {
    const node = pq.dequeue();
    console.log(node.pos);
    if (!valid(node, grid)) continue;
    if (visited(node, parent)) continue;
    visitedCellsInOrder.push({ x: node.pos.x, y: node.pos.y });
    setParentNode(parent, node);
    if (node.pos.x == to.x && node.pos.y == to.y) break;

    const neighbours = getNeighbours(node);
    for (const neighbour of neighbours) {
      pq.enqueue({
        ...neighbour,
        heuristicValue: manhattanDistance(neighbour.pos, to),
      });
    }
  }

  const shortestPathInOrder = constructPath(to, parent);
  return [visitedCellsInOrder, shortestPathInOrder];
}

function BFS(grid, from, to) {
  const visitedCellsInOrder = [];
  const parent = getParentGrid(grid);

  const queue = [{ pos: from, parentPos: { x: -1, y: -1 } }];
  while (queue.length > 0) {
    const node = queue.shift();
    if (!valid(node, grid)) continue;
    if (visited(node, parent)) continue;
    visitedCellsInOrder.push({ x: node.pos.x, y: node.pos.y });
    setParentNode(parent, node);
    if (node.pos.x == to.x && node.pos.y == to.y) break;

    const neighbours = getNeighbours(node);
    for (const neighbour of neighbours) {
      queue.push(neighbour);
    }
  }

  const shortestPathInOrder = constructPath(to, parent);
  return [visitedCellsInOrder, shortestPathInOrder];
}

function DFS(grid, from, to) {
  const visitedCellsInOrder = [];
  const parent = getParentGrid(grid);

  const stack = [{ pos: from, parentPos: { x: -1, y: -1 } }];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!valid(node, grid)) continue;
    if (visited(node, parent)) continue;
    visitedCellsInOrder.push({ x: node.pos.x, y: node.pos.y });
    setParentNode(parent, node);
    if (node.pos.x == to.x && node.pos.y == to.y) break;

    const neighbours = getNeighbours(node);
    for (const neighbour of neighbours) {
      stack.push(neighbour);
    }
  }

  const shortestPathInOrder = constructPath(to, parent);
  return [visitedCellsInOrder, shortestPathInOrder];
}

/**
 * General helper functions
 */

function getPriorityQueue() {
  // Sorted in increasing order
  const comparator = (a, b) => {
    if (a.heuristicValue === b.heuristicValue) return 0;
    return a.heuristicValue > b.heuristicValue ? 1 : -1;
  };
  return new PriorityQueue(comparator);
}

function manhattanDistance(from, to) {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}

function getParentGrid(grid) {
  return Array(grid.length)
    .fill(0)
    .map((row, y) => {
      return Array(grid[0].length).fill(-1);
    });
}

function valid(node, grid) {
  return (
    node.pos.y >= 0 &&
    node.pos.y < grid.length &&
    node.pos.x >= 0 &&
    node.pos.x < grid[0].length &&
    grid[node.pos.y][node.pos.x].isWall === false
  );
}

function visited(node, parent) {
  return parent[node.pos.y][node.pos.x] !== -1;
}

function setParentNode(parent, node) {
  parent[node.pos.y][node.pos.x] = {
    x: node.parentPos.x,
    y: node.parentPos.y,
  };
}

function getNeighbours(node) {
  return [
    {
      pos: { x: node.pos.x + 1, y: node.pos.y },
      parentPos: { x: node.pos.x, y: node.pos.y },
    },
    {
      pos: { x: node.pos.x, y: node.pos.y + 1 },
      parentPos: { x: node.pos.x, y: node.pos.y },
    },
    {
      pos: { x: node.pos.x - 1, y: node.pos.y },
      parentPos: { x: node.pos.x, y: node.pos.y },
    },
    {
      pos: { x: node.pos.x, y: node.pos.y - 1 },
      parentPos: { x: node.pos.x, y: node.pos.y },
    },
  ];
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