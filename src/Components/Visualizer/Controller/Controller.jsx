import React from "react";
import "./Controller.css";
import { Dropdown, DropdownMenu, DropdownItem } from "./Dropdown/Dropdown";

function Controller({ state, reloadGrid }) {
  return (
    <div className="controller">
      <div className="controls">
        <Dropdown>
          <DropdownMenu>
            <DropdownItem>kek</DropdownItem>
            <DropdownItem>kek2</DropdownItem>
            <DropdownItem>kek3</DropdownItem>
            <DropdownItem>kek4</DropdownItem>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownItem>lmao</DropdownItem>
            <DropdownItem>lmao2</DropdownItem>
            <DropdownItem>lmao3</DropdownItem>
            <DropdownItem>lmao4</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <Dropdown>
          <h1>loler</h1>
        </Dropdown>
        <Dropdown>
          <h1>loler</h1>
        </Dropdown> */}
        <button
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
        </button>
        <div className="separator"></div>
        <button>Play</button>
      </div>
    </div>
  );
}

export default Controller;
