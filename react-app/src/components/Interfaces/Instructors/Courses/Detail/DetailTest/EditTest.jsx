import React, { useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { toast } from "react-toastify";
import axios from "axios";

const EditTest = ({ courseId, initialTest, onUpdate, onClose }) => {
  const [test, setTest] = useState({
    testId: initialTest.testId,
    testName: initialTest.testName,
    testDate: initialTest.testDate,
    testContent: initialTest.testContent,
  });

  const [files, setFiles] = useState([]);
  const handleChange = (e) => {
    setTest({
      ...test,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const isPastDate = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const testDate = new Date(test.testDate);
      testDate.setHours(0, 0, 0, 0);

      return testDate < today;
    };

    if (test.testDate === "") {
      toast.error("Invalid submission deadline");
      return;
    }

    if (test.testDate && isPastDate()) {
      toast.error("The due date cannot be in the past.");
      return;
    }

    const formData = new FormData();
    formData.append("testName", test.testName);
    formData.append("testContent", test.testContent);
    formData.append("testDate", test.testDate);
    formData.append("courseID", courseId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.put(
        `https://localhost:7233/api/Tests/${test.testId}/with-files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      onUpdate(test);
      onClose();
      toast.success("Updated!!!");
    } catch (error) {
      console.error(error);
      toast.error("Chỉ được phép up các file word, pdf, excel");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        <form onSubmit={handleUpdate} className={styles["form-container"]}>
          <div>
            <label>Exercise name:</label>
            <input
              type="text"
              name="testName"
              value={test.testName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Deadline:</label>
            <input
              type="date"
              name="testDate"
              value={test.testDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Exercise Content:</label>
            <input
              type="text"
              name="testContent"
              value={test.testContent}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditTest;
