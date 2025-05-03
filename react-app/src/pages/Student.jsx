import { useState } from "react";
import { useRefreshToken } from "../Hooks/Auth/useRefresh-Token";
import { useUsernameWatcher } from "../Hooks/Auth/useUsernameWatcher";
import NavStudent from "../components/Interfaces/Students/NavStudent";
import MyCourse from "../components/Interfaces/Students/MyCourse";
import ShopCourse from "../components/Interfaces/Students/ShopCourse";
import styles from "./Student.module.scss";
import { useGetUser } from "../Hooks/useGetUser";

function Student() {
  useRefreshToken();
  useUsernameWatcher();
  const [index, setIndex] = useState(0);
  const { user } = useGetUser();

  const contentComponents = [
    <ShopCourse key="0" user={user} />,
    <MyCourse key="1" user={user} />,
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <NavStudent setIndex={(idx) => setIndex(idx)} />

      <div className={styles.content}>{contentComponents[index]}</div>
    </>
  );
}

export default Student;
