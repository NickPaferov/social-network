import React, { FC } from "react";
import styles from "./Post.module.css";
import defaultPhoto from "../../../../assets/images/defaultPhoto.jpg";
import { useAppSelector } from "../../../../bll/store";

type PropsType = {
  postText: string;
  likesCount: number;
};

export const Post: FC<PropsType> = ({ postText, likesCount }) => {
  const authedUserProfilePhotos = useAppSelector(
    (state) => state.profilePage.authedUserProfile?.photos
  );

  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img
          className={styles.ava}
          src={
            authedUserProfilePhotos?.large
              ? authedUserProfilePhotos.large
              : authedUserProfilePhotos?.small
              ? authedUserProfilePhotos.small
              : defaultPhoto
          }
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
