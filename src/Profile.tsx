import React from "react";
import styles from "./Profile.module.css";
import avaImg from "../src/assets/images/avatar.jpg";

export const Profile = () => {
  return (
    <div className={styles.content}>
      <div className={styles.user}>
        <img className={styles.ava} src={avaImg} alt="avatar" />
        <div>Description</div>
      </div>
      <div>My posts</div>
      <div>New post</div>
      <div>
        <div>Post1</div>
        <div>Post2</div>
        <div>Post3</div>
      </div>
    </div>
  );
};
