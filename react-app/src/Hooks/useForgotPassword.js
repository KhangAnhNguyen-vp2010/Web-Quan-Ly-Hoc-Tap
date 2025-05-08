// hooks/useForgotPassword.js
import axiosClient from "../api/axiosClient";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

export const useForgotPassword = (onBack) => {
  const otpRef = useRef(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState({
    sendMail: false,
    verifyOtp: false,
    resetPassword: false,
    resendOtp: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitSendMail = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, sendMail: true }));
    try {
      await axiosClient.post("/Auth/forgot-password/request", {
        username: formData.username,
        email: formData.email,
      });
      toast.success("OTP has been sent to your email!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data || "An error occurred, please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, sendMail: false }));
    }
  };

  const handleSubmitOTP = async (otpValues) => {
    setLoading((prev) => ({ ...prev, verifyOtp: true }));
    try {
      await axiosClient.post("/Auth/forgot-password/verify-otp", {
        username: formData.username,
        otp: otpValues,
      });
      toast.success("OTP verification successful!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data || "Invalid OTP. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, verifyOtp: false }));
    }
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      toast.error("Please make sure password fields are not empty.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading((prev) => ({ ...prev, resetPassword: true }));
    try {
      await axiosClient.post("/Auth/forgot-password/reset-password", {
        username: formData.username,
        newPassword: newPassword,
      });
      toast.success("Password reset successfully!");
      onBack?.();
    } catch (err) {
      toast.error(err.response?.data || "An error occurred, please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, resetPassword: false }));
    }
  };

  const handleResendOTP = async () => {
    setLoading((prev) => ({ ...prev, resendOtp: true }));
    try {
      await axiosClient.post("/Auth/forgot-password/request", {
        username: formData.username,
        email: formData.email,
      });
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error(err.response?.data || "Failed to resend OTP.");
    } finally {
      setLoading((prev) => ({ ...prev, resendOtp: false }));
    }
  };

  return {
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
  };
};
