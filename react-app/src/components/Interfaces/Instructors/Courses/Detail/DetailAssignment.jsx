import React, { useState } from "react";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment.module.css";
import CompletedAssignmentsList from "./DetailAssignment/CompletedAssignmentsList";
import UncompletedAssignmentsList from "./DetailAssignment/UncompletedAssignmentsList";
import CountDisplay from "./DetailAssignment/CountDisplay";

function DetailAssignment({ assignment, onClose }) {
  const [count, setCount] = useState({
    completed: 0,
    unCompleted: 0,
  });
  return (
    <div className={styles.assignmentDetails}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles["header-container"]}>
          <div>
            <h2 className={styles.assignmentTitle}>
              {assignment.assignmentName}
            </h2>
            <div className={styles.assignmentDueDate}>
              <strong>Due Date:</strong>{" "}
              {new Date(assignment.dueDate).toLocaleDateString()}
            </div>
            <div className={styles.assignmentContent}>
              <strong>Exercise Content:</strong> {assignment.exerciseContent}
            </div>
          </div>
          <CountDisplay countCompleted={count.completed} />
        </div>
        <hr />
        <div className={styles["assignments-container"]}>
          <CompletedAssignmentsList
            assignmentId={assignment.assignmentId}
            countCompleted={(count) =>
              setCount((prev) => ({
                ...prev,
                completed: count,
              }))
            }
          />
          <UncompletedAssignmentsList
            assignmentId={assignment.assignmentId}
            countUncompleted={(count) =>
              setCount((prev) => ({
                ...prev,
                unCompleted: count,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DetailAssignment;
