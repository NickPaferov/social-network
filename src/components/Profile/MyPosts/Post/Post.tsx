import React, { FC } from "react";
import styles from "./Post.module.css";
import defaultPhoto from "../../../../assets/images/defaultPhoto.jpg";
import { useAppSelector } from "../../../../bll/store";

type PropsType = {
  postText: string;
  likesCount: number;
};

export const Post: FC<PropsType> = ({ postText, likesCount }) => {
  const authedUserPhoto = useAppSelector((state) => state.auth.authedUserProfile?.photos.large);

  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img
          className={styles.ava}
          src={authedUserPhoto ? authedUserPhoto : defaultPhoto}
          alt="avatar"
        />
        <span>{postText}</span>
      </div>
      <div>
        <span>&#128077;</span>
        <span>{likesCount}</span>
      </div>
    </div>
  );
};
