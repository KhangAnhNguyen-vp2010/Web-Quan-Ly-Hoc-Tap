import clsx from "clsx";
import "boxicons/css/boxicons.min.css";
import styles from "../../assets/css/Login_Form/Login.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const containerRef = useRef(null);

  const handleRegister = () => {
    containerRef.current.classList.add(styles.active);
  };

  const handleLogin = () => {
    containerRef.current.classList.remove(styles.active);
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // Xử lý Đăng nhập
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loginForm.username.trim().length === 0) {
      toast.error("Username is required!");
      return;
    }

    if (loginForm.password.trim().length === 0) {
      toast.error("Password cannot be empty or only spaces!");
      return;
    }

    try {
      // Gửi yêu cầu đăng nhập đến API FastAPI
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username: loginForm.username,
        password: loginForm.password,
      });

      console.log("Đăng nhập thành công", response.data);
      // Xử lý khi đăng nhập thành công (ví dụ lưu token, chuyển hướng trang, v.v.)
      toast.success("Login successful!");
      setLoginForm({
        username: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail || "Đã có lỗi xảy ra");
      } else {
        toast.error("Không thể kết nối tới server!");
      }
    }
  };

  // Xử lý Đăng ký
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    console.log("Đăng ký với thông tin:", registerForm);

    if (registerForm.username.trim().length === 0) {
      toast.error("Username is required!");
      return;
    }

    if (registerForm.password.trim().length === 0) {
      toast.error("Password cannot be empty or only spaces!");
      return;
    }

    if (registerForm.email.trim().length === 0) {
      toast.error("Email is required!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/add_user", {
        username: registerForm.username,
        password_hash: registerForm.password,
        full_name: "Học Viên Mới",
        email: registerForm.email,
        role: "Student",
      });

      console.log("Đăng ký thành công", response.data);
      toast.success("Register successful! Please login.");
      // ✅ Clear fields sau khi đăng ký thành công
      setRegisterForm({
        username: "",
        password: "",
        email: "",
      });
      handleLogin(); // Chuyển về tab login
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail || "Đăng ký thất bại");
      } else {
        toast.error("Không thể kết nối tới server!");
      }
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(styles["container"])}
        data-aos="zoom-in"
        data-aos-delay="1000"
      >
        {/* Login Form */}
        <div className={clsx(styles["form-box"], styles.login)}>
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className={clsx(styles["input-box"])}>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={clsx(styles["input-box"])}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
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

        {/* Register Form */}
        <div className={clsx(styles["form-box"], styles.register)}>
          <form onSubmit={handleRegisterSubmit}>
            <h1>Register</h1>
            <div className={clsx(styles["input-box"])}>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className={clsx(styles["input-box"])}>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className={clsx(styles["input-box"])}>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
              />
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
      <ToastContainer />
    </>
  );
}

export default Login;
