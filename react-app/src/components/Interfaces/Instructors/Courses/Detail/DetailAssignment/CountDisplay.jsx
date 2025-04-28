import React from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/CountDisplay.module.css";

function CountDisplay({ countCompleted, countUncompleted }) {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span className={styles.number}>{countCompleted || 0}</span>
        <span className={styles.label}>Completed</span>
      </div>
      <div className={styles.item}>
        <span className={styles.number}>{countUncompleted || 0}</span>
        <span className={styles.label}>Uncompleted</span>
      </div>
    </div>
  );
}

export default CountDisplay;
