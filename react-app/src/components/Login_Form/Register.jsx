import styles from "../../assets/css/Login_Form/Login.module.css";
import clsx from "clsx";
import "boxicons/css/boxicons.min.css";

function Register({ formData, onChange, onSubmit, loading }) {
  return (
    <div className={clsx(styles["form-box"], styles.register)}>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <div className={clsx(styles["input-box"])}>
          <input
            type="text"
            placeholder="Username"
            required
            name="username"
            value={formData.username}
            onChange={onChange}
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className={clsx(styles["input-box"])}>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <i className="bx bxs-envelope"></i>
        </div>
        <div className={clsx(styles["input-box"])}>
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formData.password}
            onChange={onChange}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <button
          type="submit"
          className={
            loading
              ? clsx(styles.btn, styles["btn-onSubmit"])
              : clsx(styles.btn)
          }
        >
          {loading ? "Register..." : "Register"}
        </button>
        <p>or register with social platforms</p>
        <div className={clsx(styles["social-icons"])}>
          <a href="#">
            <i className="bx bxl-google"></i>
          </a>
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-github"></i>
          </a>
          <a href="#">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
