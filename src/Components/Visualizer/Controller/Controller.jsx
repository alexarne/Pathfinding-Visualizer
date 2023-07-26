import React, { useState } from "react";
import "./Controller.css";
import { Dropdown, DropdownMenu, DropdownItem } from "./Dropdown/Dropdown";

function Controller({ state, reloadGrid }) {
  return (
    <div className="controller">
      <div className="controls">
        <Dropdown icon="Mode">
          <DropdownMenu name="modes-front">
            <DropdownItem>Paint Mode</DropdownItem>
            <DropdownItem
              closeOnClick={true}
              onClick={() => {
                // set mode
              }}
            >
              kek2
            </DropdownItem>
            <DropdownItem
              closeOnClick={true}
              onClick={() => {
                // set mode
              }}
            >
              kek3
            </DropdownItem>
            <DropdownItem
              closeOnClick={true}
              onClick={() => {
                // set mode
              }}
            >
              kek4
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown icon="Set">
          <DropdownMenu name="settings-front">
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem goToMenu={"settings-algorithm"}>kek2</DropdownItem>
            <DropdownItem goToMenu={"settings-maze"}>kek3</DropdownItem>
            <DropdownItem goToMenu={"settings-speed"}>kek4</DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-algorithm">
            <DropdownItem leftIcon={"<"} goToMenu={"settings-front"}>
              Algorithm
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              lmao2
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              lmao3
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              lmao4
            </DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-maze">
            <DropdownItem leftIcon={"<"} goToMenu={"settings-front"}>
              Generate Maze
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              pog2
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              pog3
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              pog4
            </DropdownItem>
          </DropdownMenu>

          <DropdownMenu name="settings-speed">
            <DropdownItem leftIcon={"<"} goToMenu={"settings-front"}>
              Animation Speed
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              speed2
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              speed3
            </DropdownItem>
            <DropdownItem
              goToMenu={"settings-front"}
              onClick={() => {
                // click action
              }}
            >
              speed4
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div className="separator"></div>
        <button>Play</button>
      </div>
    </div>
  );
}

export default Controller;
