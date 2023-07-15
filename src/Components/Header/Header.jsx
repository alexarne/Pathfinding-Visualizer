import React from 'react'
import GitHubLogo from "../../assets/github.svg"
import "./Header.css"

function Header() {
  return (
    <>
      <div className='header'>
        <h1>Pathfinding Visualizer</h1>
        <a href="https://github.com/alexarne/Pathfinding-Visualizer">
          <img src={GitHubLogo} className="logo github" alt="GitHub logo" />
        </a>
      </div>
    </>
  )
}

export default Header