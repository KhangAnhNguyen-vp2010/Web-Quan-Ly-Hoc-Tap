import { Outlet } from "react-router-dom";
import styles from "../assets/css/Layout/LoginLayout.module.css"; // Import your CSS file for styling
import clsx from "clsx";
function LoginLayout(params) {
  return (
    <div className={clsx(styles["Login-Layout"])}>
      <Outlet />
    </div>
  );
}

export default LoginLayout;
