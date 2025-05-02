// src/hooks/useProfile.js
import { useState } from "react";
import { useGetUser } from "../useGetUser";

export const useProfile = () => {
  const { user, setUser, loading } = useGetUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleCloseChangePassword = () => {
    setIsChangingPassword(false);
  };

  return {
    user,
    setUser,
    loading,
    isEditing,
    setIsEditing,
    isChangingPassword,
    setIsChangingPassword,
    handleEdit,
    handleChangePassword,
    handleCloseEdit,
    handleCloseChangePassword,
  };
};
