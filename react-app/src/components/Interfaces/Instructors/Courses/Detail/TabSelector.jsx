import React, { useState } from "react";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/TabSelector.module.css";

const TabSelector = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    onTabChange(index);
  };

  return (
    <div className={styles.container}>
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab, index)}
          className={`${styles.button} ${
            activeTab === tab ? styles.activeButton : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
