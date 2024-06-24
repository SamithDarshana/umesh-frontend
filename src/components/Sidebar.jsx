import React, { useState } from "react";
import "./styles/Sidebar.css"; // We'll add styles in a separate CSS file

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <></>
  );
};

export default Sidebar;
