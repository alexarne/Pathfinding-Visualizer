import React from 'react'
import "./Controller.css"

function Controller() {
  return (
    <div className='controller'>
      <div className="controls">
        <button>Grass</button>
        <button>Water</button>
        <button>Wall</button>
        <div className="separator"></div>
        <button>Settings</button>
        <button>Play</button>
      </div>
    </div>
  )
}

export default Controller