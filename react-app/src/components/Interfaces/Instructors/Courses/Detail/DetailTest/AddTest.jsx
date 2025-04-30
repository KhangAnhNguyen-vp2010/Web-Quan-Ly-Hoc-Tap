import React, { useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { toast } from "react-toastify";
import axios from "axios";

const AddTest = ({ courseId, onClose }) => {
  const [test, setTest] = useState({
    testName: "",
    testContent: "",
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

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("testName", test.testName);
    formData.append("testContent", test.testContent);
    formData.append("courseID", courseId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.post(
        `https://localhost:7233/api/Tests/with-files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
        <form onSubmit={handleAdd} className={styles["form-container"]}>
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

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
