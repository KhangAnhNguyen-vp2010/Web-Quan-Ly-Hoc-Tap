import styles from "../../assets/css/Login_Form/Login.module.css";
import clsx from "clsx";
import "boxicons/css/boxicons.min.css";

function Signup({ formData, onChange, onSubmit }) {
  return (
    <div className={clsx(styles["form-box"], styles.login)}>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
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
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formData.password}
            onChange={onChange}
          />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className={clsx(styles["forgot-link"])}>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" className={clsx(styles.btn)}>
          Login
        </button>
        <p>or login with social platforms</p>
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

export default Signup;
