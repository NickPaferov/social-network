import React from "react";
import preloaderImg from "../../../assets/images/preloader.png";
import styles from "./Preloader.module.css";

export const Preloader = () => {
  return (
    <div>
      <img src={preloaderImg} alt="preloader" className={styles.preloader} />
    </div>
  );
};
