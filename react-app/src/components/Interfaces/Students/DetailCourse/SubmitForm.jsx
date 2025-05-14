import styles from "./SubmitForm.module.scss";
import { useSubmitForm } from "../../../../Hooks/student/useSubmitForm";
function SubmitForm({ user, assignment, onClose, onSubmit, test }) {
  const { loading, handleFileChange, handleSubmit } = useSubmitForm({
    user,
    assignment,
    onClose,
    onSubmit,
    test,
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} required />
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
