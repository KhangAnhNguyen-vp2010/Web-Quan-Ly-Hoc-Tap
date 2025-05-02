// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";
import Index from "../components/index/Index";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Login from "../pages/Login";
import Instructor from "../pages/Instructor";
import Student from "../pages/Student";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<LoginLayout />}>
        <Route path="/signup" element={<Login />} />
        <Route
          path="/instructor"
          element={
            <ProtectedRoute>
              <Instructor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
