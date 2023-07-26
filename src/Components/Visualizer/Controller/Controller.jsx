import React, { useState } from "react";
import "./Controller.css";
import { Dropdown, DropdownMenu, DropdownItem } from "./Dropdown/Dropdown";

function Controller({ state, reloadGrid }) {
  const [activeModesMenu, setActiveModesMenu] = useState("modes-front");
  const [activeSettingsMenu, setActiveSettingsMenu] =
    useState("settings-front");

  return (
    <div className="controller">
      <div className="controls">
        <Dropdown icon="Mode" activeMenu={activeModesMenu}>
          <DropdownMenu name="modes-front">
            <DropdownItem>Paint Mode</DropdownItem>
            <DropdownItem
              onClick={() => {
                // set mode
              }}
              closeOnClick={true}
            >
              kek2
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                // set mode
              }}
              closeOnClick={true}
            >
              kek3
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                // set mode
              }}
              closeOnClick={true}
            >
              kek4
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown icon="Set" activeMenu={activeSettingsMenu}>
          <DropdownMenu name="settings-front">
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem
              onClick={() => setActiveSettingsMenu("settings-algorithm")}
            >
              kek2
            </DropdownItem>
            <DropdownItem
              onClick={() => setActiveSettingsMenu("settings-maze")}
            >
              kek3
            </DropdownItem>
            <DropdownItem
              onClick={() => setActiveSettingsMenu("settings-speed")}
            >
              kek4
            </DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-algorithm">
            <DropdownItem
              leftIcon={"<"}
              onClick={() => setActiveSettingsMenu("settings-front")}
            >
              Algorithm
            </DropdownItem>
            <DropdownItem>lmao2</DropdownItem>
            <DropdownItem>lmao3</DropdownItem>
            <DropdownItem>lmao4</DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-maze">
            <DropdownItem
              leftIcon={"<"}
              onClick={() => setActiveSettingsMenu("settings-front")}
            >
              Generate Maze
            </DropdownItem>
            <DropdownItem>pog2</DropdownItem>
            <DropdownItem>pog3</DropdownItem>
            <DropdownItem>pog4</DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-speed">
            <DropdownItem
              leftIcon={"<"}
              onClick={() => setActiveSettingsMenu("settings-front")}
            >
              Animation Speed
            </DropdownItem>
            <DropdownItem>speed2</DropdownItem>
            <DropdownItem>speed3</DropdownItem>
            <DropdownItem>speed4</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* <button
          onClick={() => {
            state.settings.paintWeight =
              state.settings.paintWeight == 3 ? 5 : 3;
          }}
        >
          Mode
        </button>
        <button
          onClick={() => {
            state.settings.showBorders = !state.settings.showBorders;
            reloadGrid();
          }}
        >
          Set
        </button> */}

        <div className="separator"></div>
        <button>Play</button>
      </div>
    </div>
  );
}

export default Controller;
