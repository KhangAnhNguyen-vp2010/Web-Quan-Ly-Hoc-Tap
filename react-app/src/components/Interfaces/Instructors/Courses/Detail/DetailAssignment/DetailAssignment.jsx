import React, { useEffect, useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/DetailAssignment.module.css";
import CompletedAssignmentsList from "./CompletedAssignmentsList";
import UncompletedAssignmentsList from "./UncompletedAssignmentsList";
import CountDisplay from "./CountDisplay";
import EditAssignment from "./EditAssignment";
import AssignmentFilesList from "./AssignmentFilesList";
import { useDetailAssignment } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useDetailAssignment";
import SubmitForm from "../../../../Students/DetailCourse/SubmitForm";
import { useCompletedDate } from "../../../../../../Hooks/student/useCompletedDate";
import StudentView from "../../../Scoring/StudentView";

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

  const { completedDate } = useCompletedDate({
    showSubmitAssignment,
    assignment,
    user,
  });

  const [showStudentAssignment, setShowStudentAssignment] = useState(false);
  const [student, setStudent] = useState(null);

  const [loadCompletedList, setLoadCompletedList] = useState(false);

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
                key={loadCompletedList}
                assignmentId={currentAssignment.assignmentId}
                countCompleted={(count) =>
                  setCount((prev) => ({
                    ...prev,
                    completed: count,
                  }))
                }
                onOpenStudentAssignment={() =>
                  setShowStudentAssignment(!showStudentAssignment)
                }
                student={(s) => setStudent(s)}
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
        {showStudentAssignment && (
          <StudentView
            onClose={() => setShowStudentAssignment(!showStudentAssignment)}
            onUpdateScore={() => setLoadCompletedList(!loadCompletedList)}
            student={student}
            assignment={currentAssignment}
          />
        )}
      </div>
    </>
  );
}

export default DetailAssignment;
