import React from "react";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={styles.navBlock}>
      <div>Profile</div>
      <div>Messages</div>
      <div>News</div>
      <div>Music</div>
      <div>Settings</div>
    </div>
  );
};
