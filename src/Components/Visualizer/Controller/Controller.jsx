import React, { useEffect, useState } from "react";
import "./Controller.css";

function Controller({ state, reloadGrid }) {
  return (
    <div className="controller">
      <div className="controls">
        <button>Mode</button>
        <button>Set</button>
        <div className="separator"></div>
        <button>Play</button>
      </div>
    </div>
  );
}

export default Controller;
