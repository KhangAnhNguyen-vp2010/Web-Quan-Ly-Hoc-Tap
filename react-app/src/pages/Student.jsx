import { useEffect } from "react";
import { useRefreshToken } from "../Hooks/Auth/useRefresh-Token";
import { useUsernameWatcher } from "../Hooks/Auth/useUsernameWatcher";

function Student() {
  useRefreshToken();
  useUsernameWatcher();
  return (
    <div>
      <h1>Student</h1>
      <p>This is the student page.</p>
    </div>
  );
}

export default Student;
