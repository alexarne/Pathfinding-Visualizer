import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>D</button>
      {open && props.children}
    </>
  );
}

export default Dropdown;
