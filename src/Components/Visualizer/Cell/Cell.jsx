import React from 'react'
import './Cell.css'

function Cell({ node }) {
  let nodeClass = "cell"
  if (node.isWall) {
    nodeClass += " wall"
  } else {
    if (node.isVisited) nodeClass += " visited"
    if (node.isShortestPath) nodeClass += " shortest"
  }

  return (
    <div className={nodeClass}
      onPointerDown={node.mouse.down}
      onPointerUp={node.mouse.up}
      onPointerEnter={node.mouse.enter}>
    </div>
  )
}

export default Cell