import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

export default function useParams() {
  return useContext(context);
}

export function ParamsProvider({ children }) {
  //   const [mode, setmode] = useState(null);
  //   const [run, setrun] = useState(false);
  //   const [grid, setgrid] = useState(getGrid(50, 25));
  //   const [editing, seteditFlag] = useState(false);
  //   const [res, setres] = useState(false);
  //   const start = useRef({ x: 25, y: 12 });
  //   const end = useRef({ x: 48, y: 23 });

  const state = {
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
      // animationSpeed, // Declared in Visualizer.jsx
      // algorithm,
      // showBorders: true,
      paintWalls: true,
      paintWeight: 3,
      // setShowBorders,
      // setAlgorithm,
      // setAnimationSpeed,
    },
  };

  return (
    <>
      <context.Provider value={state}>{children}</context.Provider>
    </>
  );
}
