import { useEffect } from "react";
import { useRefreshToken } from "../Hooks/Auth/useRefresh-Token";
import { useUsernameWatcher } from "../Hooks/Auth/useUsernameWatcher";
import Navbar from "../layouts/Navbar";
import { useGetUser } from "../Hooks/useGetUser";

function Student() {
  const { user } = useGetUser();
  useRefreshToken();
  useUsernameWatcher();
  console.log(user);
  return (
    <>
      <Navbar student={user} />
    </>
  );
}

export default Student;
