import styles from "./Prediction.module.scss";
import { usePredict } from "../../../../Hooks/instructor/Predict/usePredict";
import ResultsPredict from "./ResultsPredict/ResultsPredict";
import clsx from "clsx";

function Prediction({ assignmentScores, testScores, onClose }) {
  const {
    showResult,
    model_type,
    setShowResult,
    setModel_type,
    predictedScore,
  } = usePredict({
    assignmentScores,
    testScores,
  });

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
                  <td>
                    {assignmentScores.studyTime + testScores.studyTime || 0} Giờ
                  </td>
                  <td>📗{assignmentScores.totalAssignmentsOntime || 0}📗</td>
                  <td>📗{assignmentScores.totalAssignmentsLate || 0}📗</td>
                  <td>📙{testScores.totalTestsOntime || 0}📙</td>
                  <td>📙{testScores.totalTestsLate || 0}📙</td>
                  <td>⭐{assignmentScores.AVG || 0}⭐</td>
                  <td>✨{testScores.AVG || 0}✨</td>
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
            <button
              className={clsx(styles["click-btn"], styles.linear)}
              onClick={() => {
                setShowResult(!showResult);
                setModel_type("linear");
              }}
            >
              📈Dự đoán bằng mô hình Linear Regresstion📈
            </button>
          </div>
          <div className={styles["btn-container"]}>
            <button
              className={clsx(styles["click-btn"], styles["random-forest"])}
              onClick={() => {
                setShowResult(!showResult);
                setModel_type("random-forest");
              }}
            >
              🌳Dự đoán bằng mô hình Random Forest🌳
            </button>
            <button
              className={clsx(styles["click-btn"], styles["xg-boost"])}
              onClick={() => {
                setShowResult(!showResult);
                setModel_type("xg-boost");
              }}
            >
              🚀Dự đoán bằng mô hình XGBoost🚀
            </button>
          </div>
        </div>
      </div>
      {showResult && predictedScore && (
        <ResultsPredict
          result={predictedScore}
          onClose={() => setShowResult(!showResult)}
          model_type={model_type}
        />
      )}
    </>
  );
}

export default Prediction;
