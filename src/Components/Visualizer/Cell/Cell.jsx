import React, { useEffect, useRef, useState } from "react";
import "./Cell.css";

function Cell({ node, showBorders }) {
  const ref = useRef();

  let nodeClass = "cell";
  if (showBorders) nodeClass += " border";
  if (node.isSource) nodeClass += " source";
  if (node.isTarget) nodeClass += " target";

  if (!node.isSource && !node.isTarget) {
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
  }

  let visitedClass = "";
  if (node.isVisited) nodeClass += "visited";
  if (node.isShortestPath) nodeClass += "shortest";

  return (
    <div
      ref={ref}
      className={nodeClass}
      data-x={node.position.x}
      data-y={node.position.y}
      onPointerDown={(e) => {
        e.preventDefault();
        node.mouse.down();
      }}
      onPointerEnter={(e) => {
        e.preventDefault();
        node.mouse.enter();
      }}
    ></div>
  );
}

export default Cell;
