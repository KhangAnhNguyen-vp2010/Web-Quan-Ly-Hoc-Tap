import styles from "./ScoresList.module.scss";
function ScoresList({ scores }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>🔢STT</th>
            <th>📗Name</th>
            <th>📅Completed At</th>
            <th>💯Score</th>
          </tr>
        </thead>
        <tbody>
          {scores && scores.length > 0 ? (
            scores.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>📙{item.assignmentName || item.testName}</td>
                <td>
                  🕒
                  {item.completionDate ||
                    new Date(item.completedDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false, // Nếu bạn muốn sử dụng giờ 24h
                    })}
                </td>
                <td>{item.grade || item.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>
                <p>📦Chưa có dữ liệu📦</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ScoresList;
