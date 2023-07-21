import React, { useRef } from "react";
import "./Cell.css";

function Cell({ node, showBorders }) {
  const ref = useRef();

  let nodeClass = "cell";
  if (showBorders) nodeClass += " anti-border";
  if (node.isSource) nodeClass += " source";
  if (node.isTarget) nodeClass += " target";
  if (!node.isSource && !node.isTarget) nodeClass += " animate";

  if (node.isWall) {
    nodeClass += " wall";
  } else {
    switch (node.weight) {
      case 3:
        nodeClass += " grass";
        break;
      case 5:
        nodeClass += " water";
        break;
      default:
        break;
    }
  }

  let visitedClass = "cell cell-overlay";
  if (showBorders) visitedClass += " border";
  if (node.isVisited) visitedClass += " visited";
  if (node.isShortestPath) visitedClass += " shortest";

  return (
    <div
      className="cell-container"
      onPointerDown={(e) => {
        e.preventDefault();
        node.mouse.down();
      }}
      onPointerEnter={(e) => {
        e.preventDefault();
        node.mouse.enter();
      }}
    >
      <div ref={ref} className={nodeClass}></div>
      <div
        className={visitedClass}
        data-x={node.position.x}
        data-y={node.position.y}
      ></div>
    </div>
  );
}

export default Cell;
