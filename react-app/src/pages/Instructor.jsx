import Dashboard from "../components/Interfaces/Instructors/Dashboard";
import Profile from "../components/Interfaces/Instructors/Profile";
import Sidebar from "../components/Interfaces/Instructors/Sidebar";
import React, { useState } from "react";
import clsx from "clsx";
import styles from "../assets/css/Instructor/Instructor.module.css";

function Instructor(params) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleNext = (index) => {
    setActiveIndex(index);
  };

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const rightComponents = [
    <Dashboard key="0" isCollapsed={collapsed} />,
    <Profile key="1" />,
  ];

  return (
    <>
      <Sidebar
        activeIndex={activeIndex}
        onLinkClick={handleNext}
        onClickCollapsed={handleCollapsed}
      />
      <div
        className={
          !collapsed
            ? clsx(styles.content)
            : clsx(styles.content, styles["sidebar-collapsed"])
        }
      >
        {rightComponents[activeIndex]}
      </div>
    </>
  );
}

export default Instructor;

// const handle = () => {
//   localStorage.removeItem("user");
//   const hihi = JSON.parse(localStorage.getItem("user"));
//   console.log("haha " + JSON.stringify(hihi));
// };

{
  /* <button onClick={handle}>đasa</button> */
}
