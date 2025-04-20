import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useAuthForm = (onSuccessLogin, onSwitchToLogin) => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loginForm.username.trim() === "")
      return toast.error("Username is required!");
    if (loginForm.password.trim() === "")
      return toast.error("Password cannot be empty!");

    try {
      const res = await axios.post(
        "https://localhost:7233/api/Auth/login",
        loginForm,
        { withCredentials: true }
      );
      toast.success("Login successful!");
      setLoginForm({ username: "", password: "" });
      onSuccessLogin?.(res.data);
    } catch (error) {
      toast.error(error.response?.data || "Login failed!");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.username.trim() === "")
      return toast.error("Username is required!");
    if (registerForm.password.trim() === "")
      return toast.error("Password cannot be empty!");
    if (registerForm.email.trim() === "")
      return toast.error("Email is required!");

    try {
      await axios.post(
        "https://localhost:7233/api/Auth/register",
        registerForm
      );
      toast.success("Register successful! Please login.");
      setRegisterForm({ username: "", password: "", email: "" });
      onSwitchToLogin?.();
    } catch (error) {
      toast.error(error.response?.data || "Register failed!");
    }
  };

  return {
    loginForm,
    registerForm,
    handleLoginChange,
    handleRegisterChange,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
};
