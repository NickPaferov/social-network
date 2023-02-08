import React, { FC } from "react";
import styles from "./Post.module.css";
import avaImg from "../../../../assets/images/avatar.jpg";

type PropsType = {
  postText: string;
  likesCount: number;
};

export const Post: FC<PropsType> = ({ postText, likesCount }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img className={styles.ava} src={avaImg} alt="avatar" />
        <span>{postText}</span>
      </div>
      <div>
        <span>&#128077;</span>
        <span>{likesCount}</span>
      </div>
    </div>
  );
};
