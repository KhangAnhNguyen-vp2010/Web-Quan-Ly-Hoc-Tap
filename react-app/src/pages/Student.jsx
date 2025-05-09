import { useState } from "react";
import { useRefreshToken } from "../Hooks/Auth/useRefresh-Token";
import { useUsernameWatcher } from "../Hooks/Auth/useUsernameWatcher";
import MyCourse from "../components/Interfaces/Students/MyCourse";
import ShopCourse from "../components/Interfaces/Students/ShopCourse";
import styles from "./Student.module.scss";
import { useGetUser } from "../Hooks/useGetUser";
import DetailCourse from "../components/Interfaces/Instructors/Courses/DetailCourse";
import { useOutletContext } from "react-router-dom";

function Student() {
  const index = useOutletContext();
  useRefreshToken();
  useUsernameWatcher();
  const { user } = useGetUser();
  const [showDetailCourse, setShowDetailCourse] = useState(false);
  const [courseDetail, setCoursesDetail] = useState(null);

  const contentComponents = [
    <ShopCourse key="0" user={user} />,
    <MyCourse
      key="1"
      user={user}
      onOpen={(c) => {
        setCoursesDetail(c);
        setShowDetailCourse(!showDetailCourse);
      }}
    />,
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.content}>{contentComponents[index]}</div>
      {showDetailCourse && (
        <DetailCourse
          course={courseDetail}
          onClose={() => setShowDetailCourse(!showDetailCourse)}
        />
      )}
    </>
  );
}

export default Student;
