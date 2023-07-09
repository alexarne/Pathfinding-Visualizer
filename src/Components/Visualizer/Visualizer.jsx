import React, { useState } from 'react'
import Controller from './Controller/Controller'
import Cell from './Cell/Cell'
import "./Visualizer.css"

function Visualizer() {
  const [grid, setGrid] = useState([[1,2,3], [1,2,3]])

  return (
    <>
      <div className="grid">
        {grid.map((row, rowIndex) => {
          return <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              return <Cell key={colIndex} node={cell} />
            })}
          </div> 
        })}
      </div>
      <Controller />
    </>
  )
}

export default Visualizer