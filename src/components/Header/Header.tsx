import React from "react";
import styles from "./Header.module.css";
import logoImg from "../../assets/images/logo.jpg";
import avaImg from "../../assets/images/avatar.jpg";
import { Preloader } from "../common/Preloader/Preloader";
import { useAppSelector } from "../../bll/store";

export const Header = () => {
  const isRequestProcessing = useAppSelector((state) => state.app.isRequestProcessing);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <span className={styles.text}>In t</span>
        <img className={styles.logoImg} src={logoImg} alt="logo" />
        <span className={styles.text}>uch</span>
      </div>
      {isRequestProcessing && <Preloader />}
      <div className={styles.user}>
        <img className={styles.ava} src={avaImg} alt="avatar" />
        <button>Sign Out</button>
      </div>
    </div>
  );
};
