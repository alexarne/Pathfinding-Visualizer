import React from "react";
import "./Controller.css";
import { Dropdown, DropdownMenu, DropdownItem } from "./Dropdown/Dropdown";
import {
  getVisitedArrays,
  getAbbreviation,
  pathfindingAlgorithms,
} from "../../../utils/pathfindingAlgorithms";
import { getMazeArray, mazeAlgorithms } from "../../../utils/mazeAlgorithms";
import {
  getAnimationDelay,
  animationSpeeds,
  getWeight,
  cellWeights,
} from "../../../utils/settings";
import useParams from "../../Context";

function Controller() {
  const state = useParams();

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
              closeOnClick={true}
              leftIcon={"trashcan"}
              onClick={() => {
                // Action
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
                  state.setAlgorithm(algo);
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
                  // click action
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
                  state.setAnimationSpeed(speed);
                }}
              >
                {speed}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <div className="separator"></div>
        <button>Play</button>
      </div>
    </div>
  );
}

export default Controller;
