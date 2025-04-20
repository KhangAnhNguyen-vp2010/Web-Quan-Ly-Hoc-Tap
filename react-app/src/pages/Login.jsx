import clsx from "clsx";
import styles from "../assets/css/Login_Form/Login.module.css";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "../components/Login_Form/Signup";
import RegisterForm from "../components/Login_Form/Register";
import { useAuthForm } from "../Hooks/useAuth";

function Login() {
  const containerRef = useRef(null);

  const handleRegister = () =>
    containerRef.current.classList.add(styles.active);
  const handleLogin = () =>
    containerRef.current.classList.remove(styles.active);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Gọi khi login thành công
  const handleSuccessLogin = (data) => {
    setIsLoggedIn(true);
    let prev_username = null;
    prev_username = localStorage.getItem("current-username", data.username);
    if (prev_username === null) {
      localStorage.setItem("prev-username", data.username);
      localStorage.setItem("current-username", data.username);
    } else {
      localStorage.setItem("current-username", data.username);
    }

    setTimeout(() => {
      if (data.role === "Student") {
        navigate("/student");
      } else navigate("/instructor");
    }, 2000);
  };

  const {
    loginForm,
    registerForm,
    handleLoginChange,
    handleRegisterChange,
    handleLoginSubmit,
    handleRegisterSubmit,
  } = useAuthForm(handleSuccessLogin, handleLogin); // truyền hàm xử lý chuyển về login

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(styles.container, isLoggedIn && styles.zoomOut)}
        data-aos="zoom-in"
        data-aos-delay="1000"
      >
        <LoginForm
          formData={loginForm}
          onChange={handleLoginChange}
          onSubmit={handleLoginSubmit}
        />
        <RegisterForm
          formData={registerForm}
          onChange={handleRegisterChange}
          onSubmit={handleRegisterSubmit}
        />
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
    </>
  );
}

export default Login;
