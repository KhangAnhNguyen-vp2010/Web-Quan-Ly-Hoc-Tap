import styles from "./DetailStudent.module.scss";
import ScoresList from "./ScoresList/ScoresList";
import Prediction from "../../../Prediction/Prediction";
import { useAssignmentScores } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailStudent/useAssignmentScores";
import { useTestScores } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailStudent/useTestScores";
import { useState } from "react";
function DetailStudent({ student_CourseId, onClose }) {
  const { listAssignmentScores, SCA_AssignmentScores } = useAssignmentScores({
    studentId: student_CourseId.student.userId,
    courseId: student_CourseId.courseId,
  });

  const { listTestScores, SCA_TestScores } = useTestScores({
    studentId: student_CourseId.student.userId,
    courseId: student_CourseId.courseId,
  });

  const [showPrediction, setShowPrediction] = useState(false);

  return (
    <>
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
            <button
              type="button"
              className={styles.prediction}
              onClick={() => setShowPrediction(!showPrediction)}
            >
              <span className={styles.typingEffect}>
                🧙‍♂️Dự Đoán Điểm Thi Cuối Kỳ🧙‍♂️
              </span>
            </button>
          </div>
        </div>
      </div>
      {showPrediction && (
        <Prediction
          assignmentScores={SCA_AssignmentScores}
          testScores={SCA_TestScores}
          onClose={() => setShowPrediction(!showPrediction)}
        />
      )}
    </>
  );
}

export default DetailStudent;
