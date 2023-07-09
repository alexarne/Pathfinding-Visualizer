import React from 'react'

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
      onPointerDown={node.pointerDown}
      onPointerUp={node.pointerUp}
      onPointerEnter={node.pointerEnter}>
        Cell
    </div>
  )
}

export default Cell