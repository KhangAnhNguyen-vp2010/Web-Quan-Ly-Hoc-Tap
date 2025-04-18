import styles from "../../../assets/css/Instructor/Profile.module.css";

function Profile({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>Profile</h2>
        {/* Nội dung Profile ở đây */}
        <p>This is your profile info...</p>
      </div>
    </div>
  );
}

export default Profile;
