import React, { useCallback, useEffect, useRef, useState } from "react";
import Controller from "./Controller/Controller";
import Cell from "./Cell/Cell";
import "./Visualizer.css";

function Visualizer() {
  const [state, setState] = useState({
    currentlyVisualizingAlgorithm: false,
    currentlyGeneratingMaze: false,
    sourcePosition: {
      x: 0,
      y: 0,
    },
    targetPosition: {
      x: 1,
      y: 0,
    },
    mouse: {
      isPressed: false,
      holdingSource: false,
      holdingTarget: false,
    },
    settings: {
      stepDelay: 100,
      algorithm: "dijkstra",
      paintWalls: true,
      showBorders: true,
      paintWeight: 3,
    },
  });

  function loadSettings() {
    const settings = {
      stepDelay: 100,
      algorithm: "dijkstra",
      paintWalls: true,
      showBorders: true,
      paintWeight: 3,
    };
    state.settings = settings;
  }

  function saveSettings() {
    const settings = state.settings;
  }

  // Initialize grid and settings
  const visualizerRef = useRef(null);
  const [grid, setGrid] = useState([[]]);
  useEffect(() => {
    setGrid(createGrid());
    loadSettings();
  }, []);

  function reloadGrid() {
    setGrid([...grid]);
  }

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

      grid[y][x].weight = state.settings.paintWeight;
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

  function setBorders(show) {
    if (state.settings.showBorders == show) return;
    state.settings.showBorders = show;
    reloadGrid();
  }

  return (
    <>
      <div
        className={"visualizer" + (state.settings.showBorders ? " border" : "")}
        ref={visualizerRef}
      >
        <div className={"grid" + (state.settings.showBorders ? " border" : "")}>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => {
                  return (
                    <Cell
                      key={rowIndex + "-" + colIndex}
                      x={cell.position.x}
                      y={cell.position.y}
                      mouseDown={cell.mouse.down}
                      mouseEnter={cell.mouse.enter}
                      isWall={cell.isWall}
                      isVisited={cell.isVisited}
                      isShortestPath={cell.isShortestPath}
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
      <Controller state={state} reloadGrid={reloadGrid} />
    </>
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