import styles from "./DetailStudent.module.scss";
import ScoresList from "./ScoresList/ScoresList";
import { useAssignmentScores } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailStudent/useAssignmentScores";
import { useTestScores } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailStudent/useTestScores";
function DetailStudent({ student_CourseId, onClose }) {
  const { listAssignmentScores } = useAssignmentScores({
    studentId: student_CourseId.student.userId,
    courseId: student_CourseId.courseId,
  });

  const { listTestScores } = useTestScores({
    studentId: student_CourseId.student.userId,
    courseId: student_CourseId.courseId,
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
        <h2 className={styles["title"]}>
          📊{student_CourseId.student.fullName}'s academic results📊
        </h2>

        <hr />
        <h2 className={styles["title"]}>📖Assignment Scoreboard📖</h2>
        <ScoresList scores={listAssignmentScores} />
        <hr />
        <h2 className={styles["title"]}>📝Test Scoreboard📝</h2>
        <ScoresList scores={listTestScores} />
        <hr />
        <div className={styles.buttonPrediction}>
          <button type="button" className={styles.prediction}>
            <span className={styles.typingEffect}>
              🧙‍♂️Dự Đoán Điểm Thi Cuối Kỳ🧙‍♂️
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailStudent;
