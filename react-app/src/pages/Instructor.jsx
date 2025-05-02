import Dashboard from "../components/Interfaces/Instructors/Dashboard";
import Profile from "../components/Interfaces/Instructors/Profile";
import Sidebar from "../components/Interfaces/Instructors/Sidebar";
import React, { use, useState } from "react";
import clsx from "clsx";
import styles from "../assets/css/Instructor/Instructor.module.css";
import Courses from "../components/Interfaces/Instructors/Courses";
import { useRefreshToken } from "../Hooks/Auth/useRefresh-Token";
import { useUsernameWatcher } from "../Hooks/Auth/useUsernameWatcher";
import EditCourse from "../components/Interfaces/Instructors/Courses/EditCourse";
import { CourseProvider } from "../contexts/CourseContext";
import AddCourseForm from "../components/Interfaces/Instructors/Courses/AddCourse";
import DetailCourse from "../components/Interfaces/Instructors/Courses/DetailCourse";

function Instructor() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [course, setCourse] = useState({});

  useRefreshToken();

  useUsernameWatcher();

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
    <Courses
      key="1"
      onCloseEditForm={() => setShowEditForm(!showEditForm)}
      course={(obj) => setCourse(obj)}
      onCloseAddForm={() => setShowAddForm(!showAddForm)}
      onCloseDetailForm={() => setShowDetailForm(!showDetailForm)}
    />,
  ];

  return (
    <>
      <CourseProvider>
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
        {showEditForm && (
          <EditCourse
            courseObject={course}
            onClose={() => setShowEditForm(!showEditForm)}
          />
        )}
        {showAddForm && (
          <AddCourseForm onClose={() => setShowAddForm(!showAddForm)} />
        )}
        {showDetailForm && (
          <DetailCourse
            course={course}
            onClose={() => setShowDetailForm(!showDetailForm)}
          />
        )}
      </CourseProvider>
    </>
  );
}

export default Instructor;
