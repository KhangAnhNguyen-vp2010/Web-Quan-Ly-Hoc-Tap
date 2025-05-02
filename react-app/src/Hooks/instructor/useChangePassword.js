// src/hooks/useChangePassword.js
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useChangePassword(setIsChangingPassword) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      await axios.put(
        "https://localhost:7233/api/Auth/changepassword",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (err) {
      toast.error(
        err.response?.data || "An error occurred while changing password."
      );
    }
  };

  return { formData, handleChange, handleSubmit };
}
