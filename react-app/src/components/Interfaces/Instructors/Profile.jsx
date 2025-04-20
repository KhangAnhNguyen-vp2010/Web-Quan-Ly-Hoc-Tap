import { useState } from "react";
import styles from "../../../assets/css/Instructor/Profile.module.css";
import { useGetUser } from "../../../hooks/useGetUser";
import avatar from "../../../assets/img/about.jpg";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

function Profile({ onClose }) {
  const { user, setUser, loading } = useGetUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  // Gán dữ liệu người dùng vào formData khi bấm Edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>
          {isEditing
            ? "Edit Profile"
            : isChangingPassword
            ? "Change Password"
            : "Profile"}
        </h2>

        <div className={styles.profileInfo}>
          {isEditing ? (
            <EditProfile
              User={user}
              setUser={setUser}
              setIsEditing={setIsEditing}
            />
          ) : isChangingPassword ? (
            <ChangePassword setIsChangingPassword={setIsChangingPassword} />
          ) : (
            <>
              <div className={styles.profileContainer}>
                <img src={avatar} alt="Avatar" className={styles.avatar} />

                <div className={styles.profileDetails}>
                  <p>
                    <strong>Name:</strong> {user.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <div className={styles.buttonGroup}>
                    <button onClick={handleEdit} className={styles.editBtn}>
                      Edit Profile
                    </button>
                    <button
                      onClick={handleChangePassword}
                      className={styles.editBtn}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
