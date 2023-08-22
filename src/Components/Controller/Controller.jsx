import React, { useState, useEffect } from "react";
import "./Controller.css";
import { Dropdown, DropdownMenu, DropdownItem } from "./Dropdown/Dropdown";
import {
  getVisitedArrays,
  getAbbreviation,
  pathfindingAlgorithms,
} from "../../utils/pathfindingAlgorithms";
import { getMazeArray, mazeAlgorithms } from "../../utils/mazeAlgorithms";
import {
  getAnimationDelay,
  animationSpeeds,
  getWeight,
  cellWeights,
} from "../../utils/settings";
import useParams from "../Context";

function Controller() {
  console.log("render controller");
  const state = useParams();
  const settings = getSettings();
  const [algorithm, setAlgorithm] = useState(settings.algorithm);
  const [animationSpeed, setAnimationSpeed] = useState(settings.animationSpeed);
  const [showBorders, setShowBorders] = useState(settings.showBorders);

  state.settings.algorithm = algorithm;
  state.settings.animationSpeed = animationSpeed;
  state.settings.showBorders = showBorders;
  state.settings.setAlgorithm = setAlgorithm;
  state.settings.setAnimationSpeed = setAnimationSpeed;
  state.settings.setShowBorders = setShowBorders;

  function getSettings() {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (settings === null)
      return {
        algorithm: "Dijkstra's Algorithm",
        animationSpeed: "Normal",
        showBorders: true,
      };
    return settings;
  }

  function saveSettings() {
    const settings = {
      animationSpeed: state.settings.animationSpeed,
      algorithm: state.settings.algorithm,
      showBorders: state.settings.showBorders,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  useEffect(() => {
    state.reloadGrid();
  }, [state.settings.showBorders]);

  useEffect(saveSettings, [
    state.settings.animationSpeed,
    state.settings.algorithm,
    state.settings.showBorders,
  ]);

  return (
    <div className="controller">
      <div className="controls">
        <Dropdown icon="Mode">
          <DropdownMenu name="modes-front">
            <DropdownItem type={"title"}>Paint Mode</DropdownItem>

            {cellWeights.map((weightType) => (
              <DropdownItem
                key={weightType}
                closeOnClick={true}
                rightIcon={getWeight[weightType]}
                onClick={() => {
                  state.settings.paintWalls = false;
                  state.settings.paintWeight = getWeight[weightType];
                }}
              >
                {weightType}
              </DropdownItem>
            ))}

            <DropdownItem
              key={"Wall"}
              closeOnClick={true}
              rightIcon={"∞"}
              onClick={() => {
                state.settings.paintWalls = true;
              }}
            >
              Wall
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown icon="Set">
          <DropdownMenu name="settings-front">
            <DropdownItem type={"title"}>Settings</DropdownItem>
            <DropdownItem
              goToMenu={"settings-algorithm"}
              rightIcon={getAbbreviation[state.settings.algorithm] + ">"}
            >
              Algorithm
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-speed"}
              rightIcon={state.settings.animationSpeed + ">"}
            >
              Animation Speed
            </DropdownItem>
            <DropdownItem goToMenu={"settings-maze"} rightIcon={">"}>
              Generate Maze
            </DropdownItem>
            <DropdownItem
              leftIcon={"grid"}
              rightIcon={state.settings.showBorders ? "ON" : "OFF"}
              onClick={() => {
                state.settings.setShowBorders(!state.settings.showBorders);
              }}
            >
              Toggle Grid
            </DropdownItem>
            <DropdownItem
              closeOnClick={true}
              leftIcon={"trashcan"}
              onClick={() => {
                state.visualizer.resetPathfinder();
                state.visualizer.clearWalls();
              }}
            >
              Clear Board
            </DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-algorithm">
            <DropdownItem
              leftIcon={"<"}
              goToMenu={"settings-front"}
              type={"title"}
            >
              Algorithm
            </DropdownItem>

            {pathfindingAlgorithms.map((algo) => (
              <DropdownItem
                key={algo}
                goToMenu={"settings-front"}
                onClick={() => {
                  state.settings.setAlgorithm(algo);
                }}
              >
                {algo}
              </DropdownItem>
            ))}
          </DropdownMenu>

          <DropdownMenu name="settings-maze">
            <DropdownItem
              leftIcon={"<"}
              goToMenu={"settings-front"}
              type={"title"}
            >
              Generate Maze
            </DropdownItem>

            {mazeAlgorithms.map((algo) => (
              <DropdownItem
                key={algo}
                closeOnClick={true}
                goToMenu={"settings-front"}
                onClick={() => {
                  state.visualizer.clearWalls();
                  state.visualizer.resetPathfinder();
                  const mazeCellsInOrder = getMazeArray(algo, state.grid);
                  const delay =
                    getAnimationDelay[state.settings.animationSpeed];
                  if (delay === 0 || algo === "Random Maze") {
                    state.setGrid((grid) => {
                      for (let i = 0; i < mazeCellsInOrder.length; ++i) {
                        const x = mazeCellsInOrder[i].x;
                        const y = mazeCellsInOrder[i].y;
                        if (
                          !state.grid[y][x].isTarget &&
                          !state.grid[y][x].isSource
                        ) {
                          grid[y][x].isWall = true;
                        }
                      }
                      return grid;
                    });
                    return;
                  }

                  async function animate(index) {
                    if (index >= mazeCellsInOrder.length) return;
                    const x = mazeCellsInOrder[index].x;
                    const y = mazeCellsInOrder[index].y;
                    if (
                      !state.grid[y][x].isTarget &&
                      !state.grid[y][x].isSource
                    ) {
                      state.setGrid((grid) => {
                        grid[y][x].isWall = true;
                        return [...grid];
                      });

                      // Wait before next action
                      if (delay !== 0) {
                        await new Promise((r) => setTimeout(r, delay));
                      }
                    }

                    animate(index + 1);
                  }
                  animate(0);
                }}
              >
                {algo}
              </DropdownItem>
            ))}
          </DropdownMenu>

          <DropdownMenu name="settings-speed">
            <DropdownItem
              leftIcon={"<"}
              goToMenu={"settings-front"}
              type={"title"}
            >
              Animation Speed
            </DropdownItem>

            {animationSpeeds.map((speed) => (
              <DropdownItem
                key={speed}
                goToMenu={"settings-front"}
                rightIcon={getAnimationDelay[speed]}
                onClick={() => {
                  state.settings.setAnimationSpeed(speed);
                }}
              >
                {speed}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <div className="separator"></div>
        <button onClick={() => state.visualizer.playAlgorithm()}>Play</button>
      </div>
    </div>
  );
}

export default Controller;
