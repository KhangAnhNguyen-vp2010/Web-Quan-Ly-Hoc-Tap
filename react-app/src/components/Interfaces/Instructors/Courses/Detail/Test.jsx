import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/Tests.module.css";
import { FaSadTear } from "react-icons/fa";
import DetailTest from "./DetailTest/DetailTest";
import AddTest from "./DetailTest/AddTest";

const Tests = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [showDetailTest, setShowDetailTest] = useState(false);
  const [showAddTest, setShowAddTest] = useState(false);

  const handleSetTotalPages = (data) => {
    SetTotalPages(data);
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Tests/Course/${courseId}?search=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );

      setTests(response.data.items);
      handleSetTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [courseId, searchTerm, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.title}>List of Tests</h4>
          <button
            className={styles["btn-addTest"]}
            onClick={() => setShowAddTest(!showAddTest)}
          >
            📙 Add Test 📙
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
                  <h5 className={styles.testName}>{test.testName}</h5>
                  <p className={styles.testDescription}>
                    {test.testContent || "Chưa có"}
                  </p>
                </div>
                <span className={styles.testDueDate}>
                  Due Date: {new Date(test.testDate).toLocaleDateString()}
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
