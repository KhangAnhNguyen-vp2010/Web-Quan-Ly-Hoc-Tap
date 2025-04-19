import Dashboard from "../components/Interfaces/Instructors/Dashboard";
import Profile from "../components/Interfaces/Instructors/Profile";
import Sidebar from "../components/Interfaces/Instructors/Sidebar";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "../assets/css/Instructor/Instructor.module.css";
import Courses from "../components/Interfaces/Instructors/Courses";

function Instructor(params) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Hàm này sẽ chạy mỗi 5 giây
    const intervalId = setInterval(() => {
      let temp = localStorage.getItem("Temp-session");
      let session = localStorage.getItem("Session-ne-ku-em");
      if (temp !== session) {
        localStorage.removeItem("Temp-session"); // Xóa session tạm thời
        localStorage.setItem("Temp-session", session); // Cập nhật session chính thức
        window.location.href = "/signup"; // Chuyển hướng về trang đăng nhập
      }
    }, 5000); // 5000ms = 5 giây

    // Cleanup khi component unmount hoặc effect bị thay đổi
    return () => clearInterval(intervalId);
  }, []); // Chạy một lần khi component được mount

  const handleNext = (index) => {
    setActiveIndex(index);
  };

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleOpenProfile = () => {
    setShowProfile(!showProfile);
  };

  const rightComponents = [
    <Dashboard key="0" isCollapsed={collapsed} />,
    <Courses key="1" />,
  ];

  return (
    <>
      <Sidebar
        activeIndex={activeIndex}
        onLinkClick={handleNext}
        onClickCollapsed={handleCollapsed}
        onClickOpenProfile={handleOpenProfile}
      />
      <div
        className={
          !collapsed
            ? clsx(styles.content)
            : clsx(styles.content, styles["sidebar-collapsed"])
        }
      >
        {rightComponents[activeIndex]}
      </div>
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
}

export default Instructor;
