import React, { createContext, useState } from "react";
import "./Dropdown.css";

const DropdownContext = createContext();

export function Dropdown(props) {
  const [open, setOpen] = useState(false);

  const menus = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>{props.icon}</button>
      {open && <div className="dropdown-container">{menus}</div>}
    </>
  );
}

export function DropdownMenu(props) {
  return <div className="dropdown-menu">{props.children}</div>;
}

export function DropdownItem(props) {
  return (
    <div
      className={
        "dropdown-item" + (props.onClick !== undefined ? " clickable" : "")
      }
      onClick={props.onClick}
    >
      <span className="dropdown-item-icon-left">{props.leftIcon}</span>
      {props.children}
      <span className="dropdown-item-icon-right">{props.rightIcon}</span>
    </div>
  );
}
