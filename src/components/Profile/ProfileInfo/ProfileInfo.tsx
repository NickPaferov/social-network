import React from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/userPhoto.jpg";
import { useAppSelector } from "../../../bll/store";

export const ProfileInfo = () => {
  const userProfile = useAppSelector((state) => state.profilePage.userProfile);

  return (
    <div className={styles.profileInfo}>
      <img
        className={styles.ava}
        src={
          userProfile?.photos.large
            ? userProfile.photos.large
            : userProfile?.photos.small
            ? userProfile.photos.small
            : userPhoto
        }
        alt="avatar"
      />
      <div>
        <span>{userProfile?.fullName}</span>
      </div>
    </div>
  );
};
