import { useState } from "react";
import axios from "axios";
import styles from "../../../assets/css/Instructor/ChangePassword.module.css";
import { toast } from "react-toastify";

function ChangePassword({ setIsChangingPassword }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleCancel = () => {
    setIsChangingPassword(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.put(
        "https://localhost:7233/api/Auth/changepassword",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (err) {
      toast.error(
        err.response?.data || "An error occurred while changing password."
      );
    }
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
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
