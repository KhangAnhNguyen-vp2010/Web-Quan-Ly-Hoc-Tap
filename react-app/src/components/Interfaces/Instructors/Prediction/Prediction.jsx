import styles from "./Prediction.module.scss";

function Prediction({ assignmentScores, testScores, onClose }) {
  console.log(assignmentScores);
  console.log(testScores);
  return (
    <div className={styles["popupOverlay"]}>
      <div
        className={styles["popupContent"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["btn-close"]} onClick={onClose}>
          X
        </button>
        <div className={styles["study-table-container"]}>
          <table className={styles["study-table"]}>
            <thead>
              <tr>
                <th>Study time</th>
                <th>Assignments on time</th>
                <th>Assignments late</th>
                <th>Test on time</th>
                <th>Test late</th>
                <th>Average score of exercises</th>
                <th>Average test scores</th>
                <th>Process Point</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{assignmentScores.studyTime + testScores.studyTime} Giờ</td>
                <td>📗{assignmentScores.totalAssignmentsOntime}📗</td>
                <td>📗{assignmentScores.totalAssignmentsLate}📗</td>
                <td>📙{testScores.totalTestsOntime}📙</td>
                <td>📙{testScores.totalTestsLate}📙</td>
                <td>⭐{assignmentScores.AVG}⭐</td>
                <td>✨{testScores.AVG}✨</td>
                <td>
                  🌟
                  {Number(
                    ((assignmentScores.AVG + testScores.AVG) / 2).toFixed(1)
                  )}
                  🌟
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles["btn-container"]}>
          <button className={styles["click-btn"]}>
            Dự đoán bằng mô hình Linear Regresstion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
