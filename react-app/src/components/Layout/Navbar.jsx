import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../assets/css/Layout/Navbar.css"; // Import your CSS file for styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
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
  );
};

export default Navbar;
