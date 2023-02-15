import React, { ChangeEvent } from "react";
import styles from "./ProfileInfo.module.css";
import defaultPhoto from "../../../assets/images/defaultPhoto.jpg";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import { updateAuthedUserPhotoTC } from "../../../bll/profile-reducer";

export const ProfileInfo = () => {
  const dispatch = useAppDispatch();

  const currentUserProfile = useAppSelector((state) => state.profilePage.currentUserProfile);
  const authedUserProfile = useAppSelector((state) => state.profilePage.authedUserProfile);
  const currentUserId = useAppSelector((state) => state.profilePage.currentUserProfile?.userId);
  const authedUserId = useAppSelector((state) => state.auth.id);

  const handleUpdatePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      dispatch(updateAuthedUserPhotoTC(e.currentTarget.files[0]));
    }
  };

  return (
    <div>
      {currentUserProfile && (
        <div>
          <div className={styles.profileInfo}>
            <div className={styles.avaBlock}>
              {authedUserId === currentUserId ? (
                <img
                  className={styles.ava}
                  src={
                    authedUserProfile?.photos.large
                      ? authedUserProfile?.photos.large
                      : authedUserProfile?.photos.small
                      ? authedUserProfile?.photos.small
                      : defaultPhoto
                  }
                  alt="avatar"
                />
              ) : (
                <img
                  className={styles.ava}
                  src={
                    currentUserProfile.photos.large
                      ? currentUserProfile.photos.large
                      : currentUserProfile.photos.small
                      ? currentUserProfile.photos.small
                      : defaultPhoto
                  }
                  alt="avatar"
                />
              )}
              {authedUserId === currentUserId && (
                <div>
                  <input type="file" id="file" hidden onChange={handleUpdatePhoto} />
                  <label htmlFor="file">&#128247;</label>
                </div>
              )}
            </div>
            <div>
              <span>{currentUserProfile?.fullName}</span>
            </div>
          </div>
          <ProfileStatus userId={currentUserProfile.userId} />
        </div>
      )}
    </div>
  );
};
