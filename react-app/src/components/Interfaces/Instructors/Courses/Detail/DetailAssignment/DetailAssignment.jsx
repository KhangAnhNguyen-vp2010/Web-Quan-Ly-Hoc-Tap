import React, { useEffect, useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/DetailAssignment.module.css";
import CompletedAssignmentsList from "./CompletedAssignmentsList";
import UncompletedAssignmentsList from "./UncompletedAssignmentsList";
import CountDisplay from "./CountDisplay";
import EditAssignment from "./EditAssignment";
import AssignmentFilesList from "./AssignmentFilesList";
import { useDetailAssignment } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useDetailAssignment";
import SubmitForm from "../../../../Students/DetailCourse/SubmitForm";
import axiosClient from "../../../../../../api/axiosClient";

function DetailAssignment({ assignment, onClose, user }) {
  const {
    showEditAssignment,
    currentAssignment,
    loadListFile,
    count,
    handleOnCloseEdit,
    handleOnSubmit,
    toggleEditAssignment,
    setCount,
  } = useDetailAssignment(assignment, onClose);

  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false);
  const [completedDate, setCompletedDate] = useState(null);

  const getCompletedDate = async () => {
    try {
      const res = await axiosClient.get(
        `/Students/completion-date/${user.id}/${assignment.assignmentId}`,
        { withCredentials: true }
      );
      setCompletedDate(res.data.completionDate);
    } catch (error) {}
  };

  useEffect(() => {
    getCompletedDate();
  }, [showSubmitAssignment]);

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
              {user.role === "Instructor" ? (
                <button
                  className={styles["btn-edit"]}
                  onClick={toggleEditAssignment}
                >
                  ✏️Edit Exercises
                </button>
              ) : (
                <button
                  className={
                    completedDate ? styles["btn-submitted"] : styles["btn-edit"]
                  }
                  onClick={() => setShowSubmitAssignment(!showSubmitAssignment)}
                  disabled={completedDate !== null}
                >
                  {completedDate ? "Đã Nộp Bài" : "Nộp bài"}
                </button>
              )}
            </div>
            {user.role === "Instructor" && (
              <CountDisplay
                countCompleted={count.completed}
                countUncompleted={count.unCompleted}
              />
            )}
          </div>
          <hr />
          <AssignmentFilesList
            assignmentId={currentAssignment.assignmentId}
            loadingFile={loadListFile}
            user={user}
          />
          <hr />
          {user.role === "Instructor" ? (
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
          ) : (
            <AssignmentFilesList
              assignmentId={currentAssignment.assignmentId}
              loadingFile={loadListFile}
              user={user}
              completed={true}
            />
          )}
        </div>
        {showEditAssignment === true && (
          <EditAssignment
            assignment={currentAssignment}
            onUpdate={(obj) => handleOnCloseEdit(obj)}
            onClose={toggleEditAssignment}
          />
        )}
        {showSubmitAssignment && (
          <SubmitForm
            user={user}
            assignment={currentAssignment}
            onClose={() => setShowSubmitAssignment(!showSubmitAssignment)}
            onSubmit={handleOnSubmit}
          />
        )}
      </div>
    </>
  );
}

export default DetailAssignment;
