import React, { useCallback, useEffect, useRef, useState } from "react";
import Cell from "./Cell/Cell";
import "./Visualizer.css";
import useParams from "../Context";
import { getVisitedArrays } from "../../utils/pathfindingAlgorithms";
import { getAnimationDelay } from "../../utils/settings";

function Visualizer() {
  console.log("render visualizer");
  const state = useParams();

  // Initialize grid and settings
  const visualizerRef = useRef(null);
  const [grid, setGrid] = useState([[]]);
  state.grid = grid;
  state.setGrid = setGrid;
  useEffect(() => {
    setGrid(createGrid());
    state.reloadGrid = () => {
      setGrid((prev) => prev.slice());
    };
  }, []);

  state.visualizer.resetPathfinder = () => {
    state.setGrid((grid) => {
      return grid.map((row) => {
        return row.map((node) => {
          node.isVisited = false;
          node.isShortestPath = false;
          node.isNotFound = false;
          return node;
        });
      });
    });
  };

  state.visualizer.clearWalls = () => {
    state.setGrid((grid) => {
      return grid.map((row) => {
        return row.map((node) => {
          node.weight = 1;
          node.isWall = false;
          return node;
        });
      });
    });
  };

  state.visualizer.playAlgorithm = () => {
    state.visualizer.resetPathfinder();
    const [visitedCellsInOrder, shortestPathInOrder] = getVisitedArrays(
      state.settings.algorithm,
      state.grid,
      state.sourcePosition,
      state.targetPosition
    );
    async function markCell(cells, index, type, callback) {
      const x = cells[index].x;
      const y = cells[index].y;
      setGrid((grid) => {
        grid[y][x][type] = true;
        return [...grid];
      });

      // Wait before next action
      const delay = getAnimationDelay[state.settings.animationSpeed];
      if (delay !== 0) {
        await new Promise((r) => setTimeout(r, delay));
      }

      if (index === cells.length - 1) {
        callback();
      } else {
        // Go next cell
        markCell(cells, index + 1, type, callback);
      }
    }
    // First mark visiteds
    markCell(visitedCellsInOrder, 0, "isVisited", () => {
      // When done, mark path if exists, otherwise mark all red
      if (shortestPathInOrder.length > 0) {
        markCell(shortestPathInOrder, 0, "isShortestPath", () => {});
      } else {
        setGrid((grid) => {
          for (const pos of visitedCellsInOrder) {
            grid[pos.y][pos.x].isNotFound = true;
          }
          return [...grid];
        });
      }
    });
  };

  // Mouse actions for cells
  const mouseEnter = (x, y) => {
    if (!state.mouse.isPressed) return;

    if (state.mouse.holdingSource) {
      setGrid((grid) => {
        grid[state.sourcePosition.y][state.sourcePosition.x].isSource = false;
        grid[y][x].isSource = true;
        state.sourcePosition = { x: x, y: y };
        return [...grid];
      });
      return;
    }
    if (state.mouse.holdingTarget) {
      setGrid((grid) => {
        grid[state.targetPosition.y][state.targetPosition.x].isTarget = false;
        grid[y][x].isTarget = true;
        state.targetPosition = { x: x, y: y };
        return [...grid];
      });
      return;
    }

    setGrid((grid) => {
      if (
        !(x == state.sourcePosition.x && y == state.sourcePosition.y) &&
        !(x == state.targetPosition.x && y == state.targetPosition.y)
      )
        grid[y][x].isWall = state.settings.paintWalls;

      if (!state.settings.paintWalls) {
        grid[y][x].weight = state.settings.paintWeight;
        grid[y][x].isWall = false;
      }
      return [...grid];
    });
  };
  const mouseDown = (x, y) => {
    // Drag source or target
    state.mouse.isPressed = true;
    if (x == state.sourcePosition.x && y == state.sourcePosition.y)
      state.mouse.holdingSource = true;
    if (x == state.targetPosition.x && y == state.targetPosition.y)
      state.mouse.holdingTarget = true;
    mouseEnter(x, y);
  };
  const mouseUp = () => {
    state.mouse.isPressed = false;
    state.mouse.holdingSource = false;
    state.mouse.holdingTarget = false;
  };
  const mouseEnterCallback = useCallback((x, y) => {
    mouseEnter(x, y);
  }, []);

  function createGrid() {
    let [width, height] = getCellDimensions(visualizerRef);
    const grid = Array(height)
      .fill(0)
      .map((row, y) => {
        return Array(width)
          .fill(0)
          .map((cell, x) => {
            return {
              position: {
                x: x,
                y: y,
              },
              mouse: {
                down: () => mouseDown(x, y),
                enter: () => mouseEnterCallback(x, y),
              },
              isWall: false,
              isVisited: false,
              isShortestPath: false,
              isNotFound: false,
              isSource: false,
              isTarget: false,
              weight: 1,
            };
          });
      });
    document.addEventListener("pointerup", mouseUp);

    // Add general listener for touch moves on mobile devices
    document.addEventListener("touchmove", (e) => {
      try {
        const touch = e.changedTouches[0];
        const elem = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!elem.classList.contains("cell")) return;
        mouseEnter(elem.dataset.x, elem.dataset.y);
      } catch (error) {
        return;
      }
    });

    // Add source and target
    // Swap to vertical layout on mobile (tall screen)
    const vertical = width < height && true;
    if (vertical) [width, height] = [height, width];
    const y = Math.floor((height - 1) / 2);
    const sourceX = Math.floor((width + 1) / 2 / 2);
    state.sourcePosition = { x: sourceX, y: y };
    state.targetPosition = { x: width - 1 - state.sourcePosition.x, y: y };

    if (vertical) {
      [state.sourcePosition.x, state.sourcePosition.y] = [
        state.sourcePosition.y,
        state.sourcePosition.x,
      ];
      [state.targetPosition.x, state.targetPosition.y] = [
        state.targetPosition.y,
        state.targetPosition.x,
      ];
    }

    grid[state.sourcePosition.y][state.sourcePosition.x].isSource = true;
    grid[state.targetPosition.y][state.targetPosition.x].isTarget = true;
    return grid;
  }

  return (
    <div
      className={"visualizer" + (state.settings.showBorders ? " border" : "")}
      ref={visualizerRef}
    >
      <div className={"grid" + (state.settings.showBorders ? " border" : "")}>
        {grid.map((row, y) => {
          return (
            <div key={y} className="row">
              {row.map((cell, x) => {
                return (
                  <Cell
                    key={y + "-" + x}
                    x={cell.position.x}
                    y={cell.position.y}
                    mouseDown={cell.mouse.down}
                    mouseEnter={cell.mouse.enter}
                    isWall={cell.isWall}
                    isVisited={cell.isVisited}
                    isShortestPath={cell.isShortestPath}
                    isNotFound={cell.isNotFound}
                    isSource={cell.isSource}
                    isTarget={cell.isTarget}
                    weight={cell.weight}
                    showBorders={state.settings.showBorders}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getCellDimensions(visualizerRef) {
  const gridHeight = visualizerRef.current.clientHeight;
  const gridWidth = visualizerRef.current.clientWidth;

  // Hack to get cell size
  const root = document.getElementById("root");
  const cell = document.createElement("div");
  cell.classList.add("cell");
  root.appendChild(cell);
  const cellSize = cell.offsetWidth;
  root.removeChild(cell);

  let dims = [
    Math.floor(gridWidth / cellSize),
    Math.floor(gridHeight / cellSize),
  ];

  // // Increase to span borders
  // dims[0] += dims[0] % 2 == 0 ? 1 : 2;
  // dims[1] += dims[1] % 2 == 0 ? 1 : 2;

  return dims;
}

export default Visualizer;
