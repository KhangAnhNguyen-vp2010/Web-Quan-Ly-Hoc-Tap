import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/TestScoreList.module.css";
import { useTestScores } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailTest/useTestScores";

const TestScoreList = ({ courseId, testId }) => {
  const { scores, loading, error } = useTestScores(courseId, testId);

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (scores.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
        <p>Chưa có dữ liệu điểm</p>
        <span>Học viên chưa tham gia bài kiểm tra này</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mục theo dõi</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã học viên</th>
            <th>Tên học viên</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.userID}>
              <td>{s.userId}</td>
              <td>{s.full_Name}</td>
              <td>
                {!s.startDate ? (
                  <span className={`${styles.status} ${styles.notStarted}`}>
                    ⏳Chưa làm
                  </span>
                ) : s.completedDate ? (
                  <span className={`${styles.status} ${styles.completed}`}>
                    ✅Đã hoàn thành
                  </span>
                ) : (
                  <span className={`${styles.status} ${styles.inProgress}`}>
                    🔄Đang làm...
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestScoreList;
