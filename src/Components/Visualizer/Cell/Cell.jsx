import React from 'react'
import './Cell.css'

function Cell({ node }) {
  let nodeClass = "cell"
  if (node.isSource) nodeClass += " source"
  if (node.isTarget) nodeClass += " target"
  if (node.isWall) {
    nodeClass += " wall"
  } else {
    if (node.isVisited) nodeClass += " visited"
    if (node.isShortestPath) nodeClass += " shortest"

  }

  return (
    <div className={nodeClass} data-x={node.position.x} data-y={node.position.y}
      onPointerDown={(e) => {e.preventDefault(); node.mouse.down()}}
      onPointerEnter={(e) => {e.preventDefault(); node.mouse.enter()}}
      >
    </div>
  )
}

export default Cell