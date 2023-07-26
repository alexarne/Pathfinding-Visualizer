import React, { useState } from "react";
import "./Dropdown.css";

export function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const menus = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const [activeMenu, setActiveMenu] = useState(menus[0].props.name);

  const close = () => {
    setOpen(false);
    setActiveMenu(menus[0].props.name);
  };

  return (
    <>
      {open && <div className="dropdown-backdrop" onPointerDown={close}></div>}
      <span className="dropdown-button">
        <button onClick={() => setOpen((prev) => !prev)}>{props.icon}</button>
        {open && (
          <div className="dropdown-container">
            {menus.map((menu) => {
              if (activeMenu != menu.props.name) return;
              return React.cloneElement(menu, {
                key: menu.props.name,
                close: close,
                setActiveMenu: setActiveMenu,
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
          setActiveMenu: props.setActiveMenu,
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
        (props.onClick !== undefined || props.closeOnClick || props.goToMenu
          ? " clickable"
          : "")
      }
      onClick={() => {
        if (props.goToMenu !== undefined) props.setActiveMenu(props.goToMenu);
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
