import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "./Navbar";

function MainLayout(params) {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
