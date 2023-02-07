import React from "react";
import styles from "./Profile.module.css";
import avaImg from "../../assets/images/avatar.jpg";
import { MyPosts } from "./MyPosts/MyPosts";

export const Profile = () => {
  return (
    <div className={styles.content}>
      <div className={styles.user}>
        <img className={styles.ava} src={avaImg} alt="avatar" />
        <div>Description</div>
      </div>
      <MyPosts />
    </div>
  );
};
