import styles from "../../../assets/css/Instructor/ChangePassword.module.css";
import useChangePassword from "../../../Hooks/instructor/useChangePassword";

function ChangePassword({ setIsChangingPassword }) {
  const { formData, handleChange, handleSubmit } = useChangePassword(
    setIsChangingPassword
  );

  const handleCancel = () => {
    setIsChangingPassword(false);
  };

  return (
    <div className={styles.changePasswordContainer}>
      <form onSubmit={handleSubmit} className={styles.changePasswordForm}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveBtn}>
            Change Password
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
