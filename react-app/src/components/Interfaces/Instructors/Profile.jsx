import styles from "../../../assets/css/Instructor/Profile.module.css";
import avatar from "../../../assets/img/about.jpg";
import student_avatar from "../../../assets/img/student/avatar.png";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import { useProfile } from "../../../Hooks/instructor/useProfile";

function Profile({ onClose }) {
  const {
    user,
    setUser,
    loading,
    isEditing,
    isChangingPassword,
    handleEdit,
    handleChangePassword,
    setIsEditing,
    setIsChangingPassword,
  } = useProfile();

  if (loading || !user) return null;

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
                <img
                  src={user.role === "Student" ? student_avatar : avatar}
                  alt="Avatar"
                  className={styles.avatar}
                />

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
