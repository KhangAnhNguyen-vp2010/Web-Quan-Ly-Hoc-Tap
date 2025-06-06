import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";

export const useAuthForm = (onSuccessLogin, onSwitchToLogin) => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await axiosClient.post("/Auth/login", loginForm, {
          withCredentials: true,
        });
        toast.success("Login successful!");
        setLoginForm({ username: "", password: "" });
        onSuccessLogin?.(res.data);
      } catch (error) {
        toast.error(error.response?.data || "Login failed!");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.username.trim() === "")
      return toast.error("Username is required!");
    if (registerForm.password.trim() === "")
      return toast.error("Password cannot be empty!");
    if (registerForm.email.trim() === "")
      return toast.error("Email is required!");

    setLoading(true);

    setTimeout(async () => {
      try {
        await axiosClient.post("/Auth/register", registerForm);
        toast.success("Register successful! Please login.");
        setRegisterForm({ username: "", password: "", email: "" });
        onSwitchToLogin?.();
      } catch (error) {
        toast.error(error.response?.data || "Register failed!");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return {
    loginForm,
    registerForm,
    loading,
    handleLoginChange,
    handleRegisterChange,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
};
