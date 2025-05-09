import { Outlet } from "react-router-dom";
import NavStudent from "../components/Interfaces/Students/NavStudent";
import Footer from "./Footer";
import { useState } from "react";

function StudentLayout() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <NavStudent setIndex={(idx) => setIndex(idx)} />
      <Outlet context={index} />
      <Footer />
    </>
  );
}

export default StudentLayout;
