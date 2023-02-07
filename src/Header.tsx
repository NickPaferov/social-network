import React from "react";
import styles from "./Header.module.css";
import logoImg from "../src/assets/images/logo.jpg";
import avaImg from "../src/assets/images/avatar.jpg";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={logoImg} alt="logo" />
      <div className={styles.user}>
        <img className={styles.ava} src={avaImg} alt="avatar" />
        <button>Sign Out</button>
      </div>
    </div>
  );
};
