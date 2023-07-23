import React, { useRef } from "react";
import "./Cell.css";

function Cell({
  x,
  y,
  mouseDown,
  mouseEnter,
  isWall,
  isVisited,
  isShortestPath,
  isSource,
  isTarget,
  weight,
  showBorders,
}) {
  const ref = useRef();
  // console.log(x, y);
  let nodeClass = "cell";
  if (showBorders) nodeClass += " anti-border";
  if (isSource) nodeClass += " source";
  if (isTarget) nodeClass += " target";
  if (!isSource && !isTarget) nodeClass += " animate";

  if (isWall) {
    nodeClass += " wall";
  } else {
    switch (weight) {
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
  if (isVisited) visitedClass += " visited";
  if (isShortestPath) visitedClass += " shortest";

  return (
    <div
      className="cell-container"
      onPointerDown={(e) => {
        e.preventDefault();
        mouseDown();
      }}
      onPointerEnter={(e) => {
        e.preventDefault();
        mouseEnter();
      }}
    >
      <div ref={ref} className={nodeClass}></div>
      <div className={visitedClass} data-x={x} data-y={y}></div>
    </div>
  );
}

export default React.memo(Cell);
