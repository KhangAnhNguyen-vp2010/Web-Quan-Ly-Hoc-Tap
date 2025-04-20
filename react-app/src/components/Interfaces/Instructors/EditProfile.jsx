import styles from "../../../assets/css/Instructor/EditProfile.module.css";
import { useEditProfile } from "../../../Hooks/useEditProfile";

function EditProfile({ User, setUser, setIsEditing }) {
  const { formData, handleChange, handleSave, handleCancel } = useEditProfile({
    User,
    setUser,
    setIsEditing,
  });

  return (
    <>
      <label>
        <strong>Name:</strong>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={styles.input}
        />
      </label>{" "}
      <label>
        <strong>Email:</strong>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
        />
      </label>
      <div className={styles.buttonGroup}>
        <button onClick={handleSave} className={styles.saveBtn}>
          Save
        </button>
        <button onClick={handleCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditProfile;
