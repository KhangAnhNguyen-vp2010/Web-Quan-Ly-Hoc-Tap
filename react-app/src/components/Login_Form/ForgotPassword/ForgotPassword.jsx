import styles from "../../../assets/css/Login_Form/ForgotPassword/ForgotPassword.module.css";
import OtpInput from "./OtpInput";
import { useForgotPassword } from "../../../Hooks/useForgotPassword";
import ClipLoader from "react-spinners/ClipLoader";

function ForgotPasswordForm({ onBack }) {
  const {
    otpRef,
    step,
    formData,
    newPassword,
    confirmNewPassword,
    setNewPassword,
    setConfirmNewPassword,
    handleInputChange,
    handleSubmitSendMail,
    handleSubmitOTP,
    handleSubmitResetPassword,
    handleResendOTP,
    loading,
  } = useForgotPassword(onBack);

  return (
    <div className={styles["forgot-overlay"]}>
      <div className={styles["forgot-form"]}>
        <button type="button" onClick={onBack} className={styles["btn-close"]}>
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
                <button type="submit" disabled={loading.sendMail}>
                  {loading.sendMail ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    "Get OTP"
                  )}
                </button>
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
                disabled={loading.verifyOtp}
                onClick={() => otpRef.current.handleSubmitOTP()}
              >
                {loading.verifyOtp ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Confirm OTP"
                )}
              </button>

              <button
                type="submit"
                disabled={loading.resendOtp}
                onClick={handleResendOTP}
              >
                {loading.resendOtp ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
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
              <button type="submit" disabled={loading.resetPassword}>
                {loading.resetPassword ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
