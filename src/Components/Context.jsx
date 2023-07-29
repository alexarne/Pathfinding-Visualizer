import { createContext, useContext, useState } from "react";

const context = createContext();

export default function useParams() {
  return useContext(context);
}

export function ParamsProvider({ children }) {
  //   const [mode, setmode] = useState(null);
  const [algorithm, setAlgorithm] = useState("Dijkstra's Algorithm");
  const [animationSpeed, setAnimationSpeed] = useState("Normal");
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
      animationSpeed,
      algorithm,
      paintWalls: true,
      showBorders: true,
      paintWeight: 3,
    },
    setAlgorithm,
    setAnimationSpeed,
  };

  return (
    <>
      <context.Provider value={state}>{children}</context.Provider>
    </>
  );
}
