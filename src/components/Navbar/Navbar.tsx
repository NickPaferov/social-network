import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

type IsActiveType = {
  isActive: boolean;
};

export const Navbar = () => {
  const setActive = ({ isActive }: IsActiveType) =>
    isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

  return (
    <div className={styles.navBlock}>
      <NavLink to="/profile" className={setActive}>
        Profile
      </NavLink>
      <NavLink to="/users" className={setActive}>
        Users
      </NavLink>
      <NavLink to="/dialogs" className={setActive}>
        Messages
      </NavLink>
    </div>
  );
};
