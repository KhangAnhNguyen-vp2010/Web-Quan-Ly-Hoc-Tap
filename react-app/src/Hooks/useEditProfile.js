// src/hooks/useEditProfile.js
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";

export const useEditProfile = ({ User, setUser, setIsEditing }) => {
  const [formData, setFormData] = useState(User);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = async () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        role: User.role,
      };

      await axiosClient.put("/Users/userEdit", updatedData, {
        withCredentials: true,
      });
      toast.success("Profile updated!");
      setUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return {
    formData,
    handleChange,
    handleSave,
    handleCancel,
  };
};
