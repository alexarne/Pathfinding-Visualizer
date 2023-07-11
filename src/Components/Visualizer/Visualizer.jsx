import React, { useEffect, useState } from 'react'
import Controller from './Controller/Controller'
import Cell from './Cell/Cell'
import "./Visualizer.css"

function Visualizer() {
  const [state, setState] = useState({
    currentlyVisualizingAlgorithm: false,
    currentlyGeneratingMaze: false,
    mouse: {
      isPressed: false,
      paintMode: true,
      holdingSource: false,
      holdingTarget: false,
    },
    properties: {
      stepDelay: 100,
      algorithm: "Dijkstra",
      paintWalls: true,
    },
  })
  
  const [grid, setGrid] = useState([[]])
  useEffect(() => setGrid(createGrid(9, 9)), [])

  function createGrid(width, height) {
    const mouseEnter = (x, y) => {
      if (!state.mouse.isPressed) return
      const newGrid = grid.slice()
      newGrid[y][x].isWall = state.mouse.paintMode ? true : false
      setGrid(newGrid)
    }
    const mouseUp = (x, y) => {setState(state => {state.mouse.isPressed = false; return state})}
    const mouseDown = (x, y) => {
      setState(state => {
        state.mouse.isPressed = true
        state.mouse.paintMode = !grid[y][x].isWall
        return state
      }); 
      mouseEnter(x, y)
    }

    const grid = Array(height).fill(0).map((row, y) => {
      return Array(width).fill(0).map((cell, x) => {
        return {
          position: {
            x: x,
            y: y,
          },
          mouse: {
            down: () => mouseDown(x, y),
            up: () => mouseUp(x, y),
            enter: () => mouseEnter(x, y),
          },
          isWall: false,
          isVisited: false,
          isShortestPath: false,
        }
      })
    })
    return grid
  }



  return (
    <>
      <div className="visualizer">
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => {
                return <Cell key={colIndex} node={cell} />
              })}
            </div> 
          })}
        </div>
      </div>
      <Controller />
    </>
  )
}

export default Visualizer