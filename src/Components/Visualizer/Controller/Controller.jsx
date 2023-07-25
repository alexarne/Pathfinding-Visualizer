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
        <Dropdown icon="Mode">
          <DropdownMenu name="modes-front">
            <DropdownItem>kek</DropdownItem>
            <DropdownItem onClick={() => setActiveModesMenu(1)}>
              kek2
            </DropdownItem>
            <DropdownItem>kek3</DropdownItem>
            <DropdownItem>kek4</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown icon="Set">
          <DropdownMenu name="settings-front">
            <DropdownItem>kek</DropdownItem>
            <DropdownItem onClick={() => setActiveModesMenu(1)}>
              kek2
            </DropdownItem>
            <DropdownItem>kek3</DropdownItem>
            <DropdownItem>kek4</DropdownItem>
          </DropdownMenu>
          <DropdownMenu name="settings-algorithm">
            <DropdownItem>lmao</DropdownItem>
            <DropdownItem>lmao2</DropdownItem>
            <DropdownItem>lmao3</DropdownItem>
            <DropdownItem>lmao4</DropdownItem>
          </DropdownMenu>
          <DropdownMenu name="settings-maze">
            <DropdownItem>pog</DropdownItem>
            <DropdownItem>pog2</DropdownItem>
            <DropdownItem>pog3</DropdownItem>
            <DropdownItem>pog4</DropdownItem>
          </DropdownMenu>
          <DropdownMenu name="settings-speed">
            <DropdownItem>speed</DropdownItem>
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
