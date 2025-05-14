import styles from "./ModelDetails.module.scss";

function ModelDetails({ model, onClose, model_type }) {
  return (
    <div className={styles["popupOverlay"]}>
      <div className={styles["popupContent"]}>
        <div className={styles.container}>
          <h2 className={styles.title}>
            {model_type === "linear"
              ? "Linear Regression Model Evaluation Data"
              : model_type === "random-forest"
              ? "Random Forest model evaluation data"
              : "XGBoost model evaluation data"}
          </h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MAE (Mean Absolute Error)</th>
                <th>MSE (Mean Squared Error)</th>
                <th>RMSE (Root Mean Squared Error)</th>
                <th>R² Score</th>
                <th>Max Error</th>
                <th>Explained Variance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{model.mae}</td>
                <td>{model.mse}</td>
                <td>{model.rmse}</td>
                <td>{model.r2_score}</td>
                <td>{model.max_error}</td>
                <td>{model.explained_variance_score}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className={styles["btn-close"]} onClick={onClose}>
          ❌Đóng Xem Chỉ Số Đánh Giá❌
        </button>
      </div>
    </div>
  );
}
export default ModelDetails;
