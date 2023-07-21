import React from "react";
import "./Controller.css";

function Controller({ state, reloadGrid }) {
  return (
    <div className="controller">
      <div className="controls">
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
