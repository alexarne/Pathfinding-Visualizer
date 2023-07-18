import React, { useEffect, useRef, useState } from "react";
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
      paintMode: true,
      holdingSource: false,
      holdingTarget: false,
    },
    settings: {
      stepDelay: 100,
      algorithm: "dijkstra",
      paintWalls: true,
      showBorders: true,
    },
  });

  function loadSettings() {
    const settings = {
      stepDelay: 100,
      algorithm: "dijkstra",
      paintWalls: true,
      showBorders: true,
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
    setGrid(grid.slice());
  }

  function createGrid() {
    const [width, height] = getCellDimensions(visualizerRef);

    // Mouse actions for cells
    const mouseEnter = (x, y) => {
      if (!state.mouse.isPressed) return;
      if (state.mouse.holdingSource) {
        setGrid((grid) => {
          const newGrid = grid.slice();
          newGrid[state.sourcePosition.y][
            state.sourcePosition.x
          ].isSource = false;
          newGrid[y][x].isSource = true;
          state.sourcePosition = { x: x, y: y };
          return newGrid;
        });
        return;
      }
      if (state.mouse.holdingTarget) {
        setGrid((grid) => {
          const newGrid = grid.slice();
          newGrid[state.targetPosition.y][
            state.targetPosition.x
          ].isTarget = false;
          newGrid[y][x].isTarget = true;
          state.targetPosition = { x: x, y: y };
          return newGrid;
        });
        return;
      }
      const newGrid = grid.slice();
      newGrid[y][x].isWall = state.mouse.paintMode ? true : false;
      setGrid(newGrid);
    };
    const mouseDown = (x, y) => {
      // Drag source or target
      state.mouse.isPressed = true;
      if (x == state.sourcePosition.x && y == state.sourcePosition.y)
        state.mouse.holdingSource = true;
      if (x == state.targetPosition.x && y == state.targetPosition.y)
        state.mouse.holdingTarget = true;
      state.mouse.paintMode = !grid[y][x].isWall;
      mouseEnter(x, y);
    };
    const mouseUp = () => {
      state.mouse.isPressed = false;
      state.mouse.holdingSource = false;
      state.mouse.holdingTarget = false;
    };

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
                enter: () => mouseEnter(x, y),
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
        // Do nothing
      }
    });

    // Add source and target
    const y = Math.floor((height - 1) / 2);
    const sourceX = Math.floor((width + 1) / 2 / 2);
    state.sourcePosition = { x: sourceX, y: y };
    state.targetPosition = { x: width - 1 - state.sourcePosition.x, y: y };
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
      <div className="visualizer" ref={visualizerRef}>
        <div className={"grid" + (state.settings.showBorders ? " border" : "")}>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => {
                  return (
                    <Cell
                      key={colIndex}
                      node={cell}
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

  return [Math.floor(gridWidth / cellSize), Math.floor(gridHeight / cellSize)];
}

export default Visualizer;
