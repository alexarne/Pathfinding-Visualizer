import React from "react";
import "./Controller.css";

function Controller({ state, reloadGrid }) {
  return (
    <div className="controller">
      <div className="controls">
        <button>Mode</button>
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
