import styles from "../../../../../assets/css/Instructor/Courses/Detail/Tests.module.css";
import { FaSadTear } from "react-icons/fa";
import DetailTest from "./DetailTest/DetailTest";
import AddTest from "./DetailTest/AddTest";
import { useTests } from "../../../../../Hooks/instructor/Course/DetailCourse/useTests";

const Tests = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const {
    tests,
    test,
    setTest,
    loading,
    showDetailTest,
    setShowDetailTest,
    showAddTest,
    setShowAddTest,
    fetchTests,
  } = useTests(courseId, searchTerm, page, SetTotalPages);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.title}>📝List of Tests</h4>
          <button
            className={styles["btn-addTest"]}
            onClick={() => setShowAddTest(!showAddTest)}
          >
            📝Add Test
          </button>
        </div>

        <div className={styles.testsList}>
          {tests.length === 0 ? (
            <div className={styles.noTests}>
              <FaSadTear size={40} style={{ marginBottom: "10px" }} />
              No tests yet!!!
            </div>
          ) : (
            tests.map((test, index) => (
              <div
                key={index}
                className={styles.testCard}
                onClick={() => {
                  setTest(test);
                  setShowDetailTest(!showDetailTest);
                }}
              >
                <div className={styles.testInfo}>
                  <h5 className={styles.testName}>📃{test.testName}</h5>
                  <p className={styles.testDescription}>
                    📋{test.testContent || "Chưa có"}
                  </p>
                </div>
                <span className={styles.testDueDate}>
                  Created At: {new Date(test.testDate).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {showDetailTest && (
        <DetailTest
          test={test}
          courseId={courseId}
          onClose={() => {
            fetchTests();
            setShowDetailTest(!showDetailTest);
          }}
        />
      )}

      {showAddTest && (
        <AddTest
          courseId={courseId}
          onClose={() => {
            fetchTests();
            setShowAddTest(!showAddTest);
          }}
        />
      )}
    </>
  );
};

export default Tests;
