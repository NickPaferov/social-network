import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultPhoto from "../../../assets/images/defaultPhoto.jpg";
import { useAppSelector } from "../../../bll/store";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";

export const ProfileInfo = () => {
  const userProfile = useAppSelector((state) => state.profilePage.userProfile);

  return (
    <div>
      {userProfile && (
        <div>
          <div className={styles.profileInfo}>
            <img
              className={styles.ava}
              src={
                userProfile.photos.large
                  ? userProfile.photos.large
                  : userProfile.photos.small
                  ? userProfile.photos.small
                  : defaultPhoto
              }
              alt="avatar"
            />
            <div>
              <span>{userProfile?.fullName}</span>
            </div>
          </div>
          <ProfileStatus userId={userProfile.userId} />
        </div>
      )}
    </div>
  );
};
