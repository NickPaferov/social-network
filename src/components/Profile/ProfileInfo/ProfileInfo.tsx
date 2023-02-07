import React from "react";
import styles from "./ProfileInfo.module.css";
import avaImg from "../../../assets/images/avatar.jpg";

export const ProfileInfo = () => {
  return (
    <div className={styles.profileInfo}>
      <img className={styles.ava} src={avaImg} alt="avatar" />
      <div>Description</div>
    </div>
  );
};
