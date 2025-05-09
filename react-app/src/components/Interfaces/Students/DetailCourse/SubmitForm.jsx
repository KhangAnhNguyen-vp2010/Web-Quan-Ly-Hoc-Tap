import { useState } from "react";
import styles from "./SubmitForm.module.scss";
import axiosClient from "../../../../api/axiosClient";
function SubmitForm({ user, assignment, onClose, onSubmit, test }) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  console.log(test);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true);

    try {
      await axiosClient.post(
        `/Students/submitAssignment/${user.id}/${assignment.assignmentId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSubmit();
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default SubmitForm;
