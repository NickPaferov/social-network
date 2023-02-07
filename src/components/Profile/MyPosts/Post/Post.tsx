import React, { FC } from "react";
import styles from "./Post.module.css";
import avaImg from "../../../../assets/images/avatar.jpg";

type PropsType = {
  name: string;
};

export const Post: FC<PropsType> = ({ name }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img className={styles.ava} src={avaImg} alt="avatar" />
        <span>{name}</span>
      </div>
      <span>&#128077;</span>
    </div>
  );
};
