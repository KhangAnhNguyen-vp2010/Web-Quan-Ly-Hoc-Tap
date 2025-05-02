import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/DetailTest.module.css";
import { useDetailTest } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailTest/useDetailTest";
import EditTest from "./EditTest";
import TestFilesList from "./TestFilesList";
import TestScoreList from "./TestScoreList";

const DetailTest = ({ test, courseId, onClose }) => {
  const {
    test: currentTest,
    showEditTest,
    loadListFile,
    toggleEditTest,
    handleOnCloseEdit,
  } = useDetailTest(test);

  return (
    <div className={styles.testDetails}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles["header-container"]}>
          <div>
            <h2 className={styles.assignmentTitle}>{currentTest.testName}</h2>
            <div className={styles.testDate}>
              <strong>🗓️Created at:</strong>{" "}
              {new Date(currentTest.testDate).toLocaleDateString()}
            </div>
            <div className={styles.testContent}>
              <strong>📋Content:</strong> {currentTest.testContent}
            </div>
            <button className={styles["btn-edit"]} onClick={toggleEditTest}>
              ✏️Edit Test or Adding File
            </button>
          </div>
        </div>
        <hr />
        <TestFilesList testId={currentTest.testId} loadingFile={loadListFile} />
        <hr />
        <TestScoreList testId={currentTest.testId} courseId={courseId} />
      </div>
      {showEditTest && (
        <EditTest
          courseId={courseId}
          initialTest={currentTest}
          onUpdate={handleOnCloseEdit}
          onClose={toggleEditTest}
        />
      )}
    </div>
  );
};

export default DetailTest;
