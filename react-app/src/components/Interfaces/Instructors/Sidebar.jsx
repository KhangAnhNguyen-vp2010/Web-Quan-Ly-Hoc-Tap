import { useState } from "react";
import clsx from "clsx";
import styles from "../../../assets/css/Instructor/Sidebar.module.css";
import logo_img from "../../../assets/img/about.jpg";

const Sidebar = ({
  activeIndex,
  onLinkClick,
  onClickCollapsed,
  onClickOpenProfile,
}) => {
  const [isOpen, setOpen] = useState(true);

  const handleOpenClick = () => {
    setOpen(!isOpen);
  };

  const handleOnClick = (e, index) => {
    e.preventDefault();
    onLinkClick(index);
  };

  return (
    <div className={clsx(styles.body)} data-aos="zoom-in" data-aos-delay="1000">
      <aside
        className={clsx(styles.sidebar, {
          [styles.collapsed]: !isOpen, // toggle class
        })}
      >
        <div className={clsx(styles.logo)}>
          <img src={logo_img} alt="logo" onClick={onClickOpenProfile} />
          <h2>Manager</h2>
          <button
            className="material-symbols-outlined"
            onClick={() => {
              handleOpenClick();
              onClickCollapsed();
            }}
          >
            {isOpen ? "chevron_left" : "chevron_right"}
          </button>
        </div>
        <ul className={clsx(styles.links)}>
          <h4>Main Menu</h4>
          <li className={clsx(activeIndex === 0 && styles.active)}>
            <span
              className="material-symbols-outlined"
              onClick={(e) => handleOnClick(e, 0)}
            >
              dashboard
            </span>
            <a
              onClick={(e) => {
                handleOnClick(e, 0);
              }}
            >
              Dashboard
            </a>
          </li>

          <li className={clsx(activeIndex === 1 && styles.active)}>
            <span
              className="material-symbols-outlined"
              onClick={(e) => handleOnClick(e, 1)}
            >
              book
            </span>
            <a
              onClick={(e) => {
                handleOnClick(e, 1);
              }}
            >
              Courses
            </a>
          </li>
          <li className={clsx(activeIndex === 2 && styles.active)}>
            <span
              className="material-symbols-outlined"
              onClick={(e) => handleOnClick(e, 2)}
            >
              group
            </span>
            <a
              onClick={(e) => {
                handleOnClick(e, 2);
              }}
            >
              Users
            </a>
          </li>
          <hr />
          <h4>Setting</h4>
          <li>
            <span className="material-symbols-outlined">ambient_screen</span>
            <a href="#">Theme</a>
          </li>
          <li>
            <span className="material-symbols-outlined">logout</span>
            <a href="#">Log Out</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
