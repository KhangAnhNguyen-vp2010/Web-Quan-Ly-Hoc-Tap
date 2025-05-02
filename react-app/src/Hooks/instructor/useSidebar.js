// src/hooks/useSidebar.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../useLogout";

export const useSidebar = ({ onLinkClick, onClickCollapsed }) => {
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleOpenClick = () => {
    setOpen((prev) => !prev);
    onClickCollapsed?.(); // gọi nếu có
  };

  const handleOnClick = (e, index) => {
    e.preventDefault();
    onLinkClick(index);
  };

  const handleSuccessLogout = () => {
    navigate("/signup");
  };

  const { handleLogout } = useLogout(handleSuccessLogout);

  return {
    isOpen,
    handleOpenClick,
    handleOnClick,
    handleLogout,
  };
};
