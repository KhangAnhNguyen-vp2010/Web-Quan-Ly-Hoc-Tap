import React, { useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/DetailAssignment.module.css";
import CompletedAssignmentsList from "./CompletedAssignmentsList";
import UncompletedAssignmentsList from "./UncompletedAssignmentsList";
import CountDisplay from "./CountDisplay";
import EditAssignment from "./EditAssignment";
import AssignmentFilesList from "./AssignmentFilesList";
import { useDetailAssignment } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useDetailAssignment";

function DetailAssignment({ assignment, onClose }) {
  const {
    showEditAssignment,
    currentAssignment,
    loadListFile,
    count,
    handleOnCloseEdit,
    toggleEditAssignment,
    setCount,
  } = useDetailAssignment(assignment, onClose);

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
                {currentAssignment.assignmentName}
              </h2>
              <div className={styles.assignmentDueDate}>
                <strong>⏰Deadline:</strong>{" "}
                {new Date(currentAssignment.dueDate).toLocaleDateString()}
              </div>
              <div className={styles.assignmentContent}>
                <strong>📋Exercise Content:</strong>{" "}
                {currentAssignment.exerciseContent}
              </div>
              <button
                className={styles["btn-edit"]}
                onClick={toggleEditAssignment}
              >
                ✏️Edit Exercises
              </button>
            </div>
            <CountDisplay
              countCompleted={count.completed}
              countUncompleted={count.unCompleted}
            />
          </div>
          <hr />
          <AssignmentFilesList
            assignmentId={currentAssignment.assignmentId}
            loadingFile={loadListFile}
          />
          <hr />
          <div className={styles["assignments-container"]}>
            <CompletedAssignmentsList
              assignmentId={currentAssignment.assignmentId}
              countCompleted={(count) =>
                setCount((prev) => ({
                  ...prev,
                  completed: count,
                }))
              }
            />
            <UncompletedAssignmentsList
              assignmentId={currentAssignment.assignmentId}
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
            assignment={currentAssignment}
            onUpdate={(obj) => handleOnCloseEdit(obj)}
            onClose={toggleEditAssignment}
          />
        )}
      </div>
    </>
  );
}

export default DetailAssignment;
