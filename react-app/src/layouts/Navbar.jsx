import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/Layout/Navbar.css";
import avatar from "../assets/img/student/avatar.png";
import help from "../assets/img/student/help.png";
import logout from "../assets/img/student/logout.png";
import profile from "../assets/img/student/profile.png";
import setting from "../assets/img/student/setting.png";

const Navbar = ({ student }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {student ? (
        <nav className="navbar">
          <a href="" className="logo">
            EDUCATION 4.0
          </a>

          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                My Course
              </NavLink>
            </li>
            <li>
              <img
                src={avatar}
                alt="avatar"
                className="user-pic"
                onClick={() => setIsOpenProfile(!isOpenProfile)}
              />
            </li>
          </ul>
          <div
            className={
              isOpenProfile ? "sub-menu-wrap open-menu" : "sub-menu-wrap"
            }
          >
            <div className="sub-menu">
              <div className="user-info">
                <img src={avatar} alt="avatar" />
                <h5>{student.fullName || "Không Thấy Tên"}</h5>
              </div>
              <hr />

              <a href="#" className="sub-menu-link">
                <img src={profile} alt="avatar" />
                <p>Edit Profile</p>
                <span>{">"}</span>
              </a>

              <a href="#" className="sub-menu-link">
                <img src={setting} alt="setting" />
                <p>Setting</p>
                <span>{">"}</span>
              </a>

              <a href="#" className="sub-menu-link">
                <img src={help} alt="help" />
                <p>Help</p>
                <span>{">"}</span>
              </a>

              <a href="#" className="sub-menu-link">
                <img src={logout} alt="logout" />
                <p>Logout</p>
                <span>{">"}</span>
              </a>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <a href="/" className="logo">
            EDUCATION 4.0
          </a>

          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact
              </NavLink>
            </li>

            <li className="signup-not-active">
              <NavLink
                to="/signup"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "signup-btn active" : "signup-btn"
                }
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
