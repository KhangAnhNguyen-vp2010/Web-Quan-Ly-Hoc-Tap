import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../../assets/img/student/avatar.png";
import help from "../../../assets/img/student/help.png";
import logout from "../../..//assets/img/student/logout.png";
import profile from "../../../assets/img/student/profile.png";
import setting from "../../../assets/img/student/setting.png";
import Profile from "../Instructors/Profile";
import "../../../assets/css/Layout/Navbar.css";
import { useGetUser } from "../../../Hooks/useGetUser";
import { useLogout } from "../../../Hooks/useLogout";

function NavStudent({ setIndex }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const navigate = useNavigate();
  const { user, fetchUser } = useGetUser();

  const handleSuccessLogout = () => {
    navigate("/signup");
  };
  const { handleLogout } = useLogout(handleSuccessLogout);

  const handleChangeIndex = (e, index) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
    setSelectIndex(index);
    setIndex(index);
  };

  return (
    <>
      <nav className="navbar">
        <a href="" className="logo">
          EDUCATION 4.0
        </a>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              onClick={(e) => handleChangeIndex(e, 0)}
              className={selectIndex === 0 ? "active" : ""}
            >
              Shopping
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={(e) => handleChangeIndex(e, 1)}
              className={selectIndex === 1 ? "active" : ""}
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
              <h5>{user ? user.fullName : "Không Thấy Tên"}</h5>
            </div>
            <hr />

            <a
              href="#"
              className="sub-menu-link"
              onClick={() => setIsOpenEdit(!isOpenEdit)}
            >
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

            <a href="#" className="sub-menu-link" onClick={handleLogout}>
              <img src={logout} alt="logout" />
              <p>Logout</p>
              <span>{">"}</span>
            </a>
          </div>
        </div>
      </nav>
      {isOpenEdit && (
        <Profile
          onClose={() => {
            setIsOpenEdit(!isOpenEdit);
            fetchUser();
          }}
        />
      )}
    </>
  );
}

export default NavStudent;
