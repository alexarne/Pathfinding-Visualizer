import React, { useState } from "react";
import "./Dropdown.css";

export function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };

  const menus = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return (
    <>
      <span className="dropdown-button">
        <button onClick={() => setOpen((prev) => !prev)}>{props.icon}</button>
        {open && (
          <div className="dropdown-container">
            {menus.map((menu) => {
              if (props.activeMenu != menu.props.name) return;
              return React.cloneElement(menu, {
                key: menu.props.name,
                close: close,
              });
            })}
          </div>
        )}
      </span>
    </>
  );
}

export function DropdownMenu(props) {
  const items = Array.isArray(props.children)
    ? props.children
    : [props.children];

  return (
    <div className="dropdown-menu" key={props.name}>
      {items.map((item, idx) => {
        return React.cloneElement(item, {
          key: "item" + idx,
          close: props.close,
        });
      })}
    </div>
  );
}

export function DropdownItem(props) {
  return (
    <div
      className={
        "dropdown-item" +
        (props.onClick !== undefined || props.closeOnClick ? " clickable" : "")
      }
      onClick={() => {
        if (props.onClick !== undefined) props.onClick();
        if (props.closeOnClick) props.close();
      }}
    >
      <span className="dropdown-item-icon-left">{props.leftIcon}</span>
      {props.children}
      <span className="dropdown-item-icon-right">{props.rightIcon}</span>
    </div>
  );
}
