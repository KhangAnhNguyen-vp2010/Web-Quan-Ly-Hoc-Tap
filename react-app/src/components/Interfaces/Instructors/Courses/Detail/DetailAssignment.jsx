import React, { useState, useEffect } from "react";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment.module.css";
import CompletedAssignmentsList from "./DetailAssignment/CompletedAssignmentsList";
import UncompletedAssignmentsList from "./DetailAssignment/UncompletedAssignmentsList";
import CountDisplay from "./DetailAssignment/CountDisplay";
import EditAssignment from "./DetailAssignment/EditAssignment";

function DetailAssignment({ assignment, onClose }) {
  const [showEditAssignment, setShowEditAssignment] = useState(false);
  const [Assignment, setAssignment] = useState(assignment);

  const [count, setCount] = useState({
    completed: 0,
    unCompleted: 0,
  });

  const handleOncloseEdit = (obj) => {
    setAssignment(obj);
    setShowEditAssignment(!showEditAssignment);
  };

  return (
    <>
      <div className={styles.assignmentDetails}>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <div className={styles["header-container"]}>
            <div>
              <h2 className={styles.assignmentTitle}>
                {Assignment.assignmentName}
              </h2>
              <div className={styles.assignmentDueDate}>
                <strong>Due Date:</strong>{" "}
                {new Date(Assignment.dueDate).toLocaleDateString()}
              </div>
              <div className={styles.assignmentContent}>
                <strong>Exercise Content:</strong> {Assignment.exerciseContent}
              </div>
              <button
                className={styles["btn-edit"]}
                onClick={() => setShowEditAssignment(!showEditAssignment)}
              >
                Edit Exercises
              </button>
            </div>
            <CountDisplay
              countCompleted={count.completed}
              countUncompleted={count.unCompleted}
            />
          </div>
          <hr />
          <div className={styles["assignments-container"]}>
            <CompletedAssignmentsList
              assignmentId={Assignment.assignmentId}
              countCompleted={(count) =>
                setCount((prev) => ({
                  ...prev,
                  completed: count,
                }))
              }
            />
            <UncompletedAssignmentsList
              assignmentId={Assignment.assignmentId}
              countUncompleted={(count) =>
                setCount((prev) => ({
                  ...prev,
                  unCompleted: count,
                }))
              }
            />
          </div>
        </div>
        {showEditAssignment === true && (
          <EditAssignment
            assignment={Assignment}
            onClose={(obj) => handleOncloseEdit(obj)}
          />
        )}
      </div>
    </>
  );
}

export default DetailAssignment;
