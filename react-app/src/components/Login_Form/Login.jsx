import clsx from "clsx";
import "boxicons/css/boxicons.min.css";
import styles from "../../assets/css/Login_Form/Login.module.css";
import React, { useRef } from "react";

function Login(params) {
  const containerRef = useRef(null);

  const handleRegister = () => {
    containerRef.current.classList.add(styles.active);
  };

  const handleLogin = () => {
    containerRef.current.classList.remove(styles.active);
  };
  return (
    <div
      ref={containerRef}
      className={clsx(styles["container"])}
      data-aos="zoom-in"
      data-aos-delay="1000"
    >
      <div className={clsx(styles["form-box"], styles.login)}>
        <form action="">
          <h1>Login</h1>
          <div className={clsx(styles["input-box"])}>
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>
          <div className={clsx(styles["input-box"])}>
            <input type="password" placeholder="Password" required />
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

      <div className={clsx(styles["form-box"], styles.register)}>
        <form action="">
          <h1>Register</h1>
          <div className={clsx(styles["input-box"])}>
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>
          <div className={clsx(styles["input-box"])}>
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className={clsx(styles["input-box"])}>
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className={clsx(styles.btn)}>
            Register
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
      <div className={clsx(styles["toggle-box"])}>
        <div className={clsx(styles["toggle-panel"], styles["toggle-left"])}>
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button
            className={clsx(styles.btn, styles["register-btn"])}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className={clsx(styles["toggle-panel"], styles["toggle-right"])}>
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button
            className={clsx(styles.btn, styles["login-btn"])}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
