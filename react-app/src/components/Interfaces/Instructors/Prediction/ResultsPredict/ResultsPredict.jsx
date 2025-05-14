import { useEffect, useState } from "react";
import styles from "./ResultsPredict.module.scss";
import confetti from "canvas-confetti";
import ModelDetails from "./ModelDetails";

function ResultsPredict({ result, onClose, model_type }) {
  if (!result) {
    return null;
  }
  const fireConfetti = (x, y) => {
    const myCanvas = document.getElementById("confetti-canvas");

    // Tạo instance riêng cho canvas
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 300,
      spread: 90,
      origin: { x: x, y: y },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fireConfetti(0.8, 1);
      fireConfetti(0.2, 1);
    }, 500);
  }, []);

  const [showModelDetails, setShowModelDetails] = useState(false);

  return (
    <>
      <div
        className={styles["popupOverlay"]}
        onClick={() => fireConfetti(0.5, 0.5)}
      >
        <div
          className={styles["popupContent"]}
          onClick={(e) => {
            e.stopPropagation();
            fireConfetti(0.5, 0.5);
          }}
        >
          <div className={styles.header}>
            <h3>🏆Chúc mừng🏆</h3>
            <h4>
              {result.predicted_score >= 8
                ? "🥇Điểm dự đoán của sinh viên🥇"
                : result.predicted_score >= 5
                ? "🥈Điểm dự đoán của sinh viên🥈"
                : "🥉Điểm dự đoán của sinh viên🥉"}
            </h4>
          </div>
          <div className={styles.result}>{result.predicted_score}</div>
          <button className={styles["btn-close"]} onClick={onClose}>
            Đóng
          </button>
          <button
            className={styles["btn-close"]}
            onClick={() => setShowModelDetails(!showModelDetails)}
          >
            Chi tiết
          </button>
        </div>
      </div>
      {showModelDetails && (
        <ModelDetails
          model={result}
          onClose={() => setShowModelDetails(!showModelDetails)}
          model_type={model_type}
        />
      )}
    </>
  );
}

export default ResultsPredict;
