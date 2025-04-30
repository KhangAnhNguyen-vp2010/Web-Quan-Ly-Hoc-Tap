import React, { useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/DetailTest.module.css";
import EditTest from "./EditTest";
import TestFilesList from "./TestFilesList";

const DetailTest = ({ test, courseId, onClose }) => {
  const [showEditTest, setShowEditTest] = useState(false);
  const [Test, setTest] = useState(test);
  const [loadListFile, setLoadListFile] = useState(false);

  const handleOncloseEdit = (obj) => {
    setTest(obj);
    setShowEditTest(!showEditTest);
    setLoadListFile(!loadListFile);
  };

  return (
    <div className={styles.testDetails}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles["header-container"]}>
          <div>
            <h2 className={styles.assignmentTitle}>{Test.testName}</h2>
            <div className={styles.testDate}>
              <strong>Test Date:</strong>{" "}
              {new Date(Test.testDate).toLocaleDateString()}
            </div>
            <div className={styles.testContent}>
              <strong>Content:</strong> {Test.testContent}
            </div>
            <button
              className={styles["btn-edit"]}
              onClick={() => setShowEditTest(!showEditTest)}
            >
              Edit test or adding file
            </button>
          </div>
        </div>
        <hr />
        <TestFilesList testId={Test.testId} loadingFile={loadListFile} />
        <hr />
      </div>
      {showEditTest && (
        <EditTest
          courseId={courseId}
          initialTest={Test}
          onUpdate={(obj) => handleOncloseEdit(obj)}
          onClose={() => setShowEditTest(!showEditTest)}
        />
      )}
    </div>
  );
};

export default DetailTest;
