import React, { useState } from "react";
import "./Dropdown.css";

export function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);

  const menus = Array.isArray(props.children)
    ? props.children
    : [props.children];
  // Pass on setState
  menus.map((menu) => {
    // console.log(menu);
  });

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>{props.icon}</button>
      {open && menus}
    </>
  );
}

export function DropdownMenu(props) {
  return <div className="dropdown-menu">{props.children}</div>;
}

export function DropdownItem(props) {
  return (
    <div className={"dropdown-item" + (props.clickable ? " clickable" : "")}>
      <span className="dropdown-item-icon-left">{props.leftIcon}</span>
      {props.children}
      <span className="dropdown-item-icon-right">{props.rightIcon}</span>
    </div>
  );
}
