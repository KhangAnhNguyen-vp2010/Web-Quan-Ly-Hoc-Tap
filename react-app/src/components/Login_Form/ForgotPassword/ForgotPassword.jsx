import styles from "../../../assets/css/Login_Form/ForgotPassword/ForgotPassword.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OtpInput from "./OtpInput";
function ForgotPasswordForm({ onBack }) {
  const otpRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Cập nhật giá trị trong formData
    });
  };

  const handleSubmitSendMail = async (e) => {
    e.preventDefault();

    try {
      // Gửi request tới API
      const response = await axios.post(
        "https://localhost:7233/api/Auth/forgot-password/request",
        {
          username: formData.username,
          email: formData.email,
        }
      );

      toast.success("OTP has been sent to your email!");
      setStep(2); // Chuyển sang bước tiếp theo nếu cần thiết
    } catch (err) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      toast.error(err.response?.data || "An error occurred, please try again.");
    }
  };

  const handleSubmitOTP = async (otpValues) => {
    try {
      // Gửi request tới API để xác thực OTP
      const response = await axios.post(
        "https://localhost:7233/api/Auth/forgot-password/verify-otp",
        {
          username: formData.username,
          otp: otpValues,
        }
      );

      toast.success("OTP verification successful!");
      setStep(3); // Chuyển sang bước tiếp theo nếu cần thiết
    } catch (err) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      toast.error(err.response?.data || "An error occurred, please try again.");
    }
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      toast.error(
        "Please make sure the password and confirm password fields are not empty."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Gửi request tới API để đặt lại mật khẩu
      const response = await axios.post(
        "https://localhost:7233/api/Auth/forgot-password/reset-password",
        {
          username: formData.username,
          newPassword: newPassword,
        }
      );

      toast.success("Password reset successfully!");
      onBack();
      // Chuyển hướng đến trang đăng nhập hoặc thực hiện hành động khác
    } catch (err) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      toast.error(err.response?.data || "An error occurred, please try again.");
    }
  };

  return (
    <>
      <div className={styles["forgot-overlay"]}>
        <div className={styles["forgot-form"]}>
          <button
            type="button"
            onClick={onBack}
            className={styles["btn-close"]}
          >
            ×
          </button>
          <h2>Forgot Password</h2>
          {step === 1 && (
            <>
              <p>Enter your username and email to receive OTP</p>
              <form onSubmit={handleSubmitSendMail}>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <button type="submit">Get OTP</button>
                </div>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <OtpInput length={6} onSubmit={handleSubmitOTP} ref={otpRef} />
              <div>
                <button
                  type="submit"
                  onClick={() => otpRef.current.handleSubmitOTP()}
                >
                  Confirm OTP
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <form onSubmit={handleSubmitResetPassword}>
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <div>
                  <button type="submit">Reset Password</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordForm;
