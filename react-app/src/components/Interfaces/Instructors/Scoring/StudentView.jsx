import styles from "./StudentView.module.scss";
import AssignmentFilesList from "../Courses/Detail/DetailAssignment/AssignmentFilesList";
import TestFilesList from "../Courses/Detail/DetailTest/TestFilesList";
import { useScoring } from "../../../../Hooks/instructor/useScoring";

function StudentView({ assignment, student, onClose, onUpdateScore, test }) {
  const { handleChange, handleClickSubmit } = useScoring({
    assignment,
    student,
    onClose,
    onUpdateScore,
    test,
  });

  return (
    <div className={styles["popupOverlay"]}>
      <div
        className={styles["popupContent"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["btn-close"]} onClick={onClose}>
          X
        </button>
        <div className={styles["header-row"]}>
          <div>
            <h2>{student.full_Name}'s exercises</h2>
            <p>
              Completed At:{" "}
              {student.completion_Date ||
                new Date(student.completedDate).toLocaleDateString()}
            </p>
          </div>
          <div class={styles["grade-input"]}>
            <label htmlFor="score">Score:</label>
            <input
              type="number"
              id="score"
              name="score"
              min="0"
              max="10"
              step="0.1"
              placeholder="Enter score"
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles["btn-click"]}
              onClick={handleClickSubmit}
            >
              Click
            </button>
          </div>
        </div>

        <hr />
        {assignment ? (
          <AssignmentFilesList
            assignmentId={assignment.assignmentId}
            completed={true}
            user={student}
          />
        ) : (
          <TestFilesList testId={test.testId} completed={true} user={student} />
        )}
      </div>
    </div>
  );
}

export default StudentView;
